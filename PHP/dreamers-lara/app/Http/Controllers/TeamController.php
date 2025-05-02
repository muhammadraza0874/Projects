<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\TeamResource;
use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TeamController extends Controller
{
    public function index()
    {
        $teams = Team::all();

        $data = TeamResource::collection($teams);

        return $this->sendResponse('Teams fetch Successfully!', $data);
    }

    public function store(Request $request)
    {
        $user_id = auth()->id();

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|unique:teams',
            'description' => 'string'
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors()->first());
        }

        $team = Team::create([
            'name' => $request->name,
            'description' => $request->description,
            'manager_id' => $request->manager_id,
            'associate_ids' => $request->associate_ids, // [1,2,3]
            'organization_id' => $request->organization_id,
            'created_by' => $user_id,
        ]);

        return $this->sendResponse('Team created Successfully!', new TeamResource($team));
    }

    public function update(Request $request, $id)
    {
        $user_id = auth()->id();
        $team = Team::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|unique:teams,name,' . $team->id,
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors()->first());
        }

        $team->update([
            'name' => $request->name,
            'description' => $request->description,
            'manager_id' => $request->manager_id,
            'associate_ids' => json_encode($request->associate_ids),
            'organization_id' => $request->organization_id,
            'created_by' => $user_id,
        ]);

        return $this->sendResponse('Team updated successfully!', new TeamResource($team));
    }

    public function destroy($id)
    {
        $team = Team::findOrFail($id);
        $team->delete();

        return $this->sendResponse('Team deleted successfully!', null);
    }
}
