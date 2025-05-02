<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectResource;
use App\Models\TeamProject;
use Illuminate\Http\Request;
use App\Models\Project;
use Illuminate\Support\Facades\Validator;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::all();

        $data = ProjectResource::collection($projects);

        return $this->sendResponse('Projects fetch Successfully!', $data);
    }

    public function store(Request $request)
    {
        $user_id = auth()->id();

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|unique:projects',
            'description' => 'string',
            'advisor_id' => 'nullable|exists:users,id',
            'team_ids' => 'array',
            'team_ids.*' => 'exists:teams,id',
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors()->first());
        }

        $project = Project::create([
            'name' => $request->name,
            'description' => $request->description,
            'advisor_id' => $request->advisor_id,
            'created_by' => $user_id,
        ]);

        if (!empty($request->team_ids)) {
            $project->teams()->sync($request->team_ids);
        }

        return $this->sendResponse('Project created Successfully!', new ProjectResource($project));
    }

    public function update(Request $request, $id)
    {
        $user_id = auth()->id();
        $project = Project::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|unique:projects,name,' . $project->id,
            'description' => 'string',
            'advisor_id' => 'nullable|exists:users,id',
            'team_ids' => 'array',
            'team_ids.*' => 'exists:teams,id',
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors()->first());
        }

        $project->update([
            'name' => $request->name,
            'description' => $request->description,
            'advisor_id' => $request->advisor_id,
            'created_by' => $user_id,
        ]);

        if (isset($request->team_ids) && empty($request->team_ids)) {
            $project->teams()->detach();
        } else if (!empty($request->team_ids)) {
            $project->teams()->sync($request->team_ids);
        }

        return $this->sendResponse('Project updated successfully!', new ProjectResource($project));
    }

    public function destroy($id)
    {
        $project = Project::findOrFail($id);
        $project->delete();
        $project->teams()->detach();

        return $this->sendResponse('Project deleted successfully!');
    }
}
