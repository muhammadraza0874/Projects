<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrganizationResource;
use App\Models\Organization;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OrganizationController extends Controller
{
    public function index()
    {
        $projects = Organization::all();

        $data = OrganizationResource::collection($projects);

        return $this->sendResponse('Organizations fetch Successfully!', $data);
    }

    public function store(Request $request)
    {
        $user_id = auth()->id();

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|unique:projects',
            'description' => 'string'
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors()->first());
        }

        $project = Organization::create([
            'name' => $request->name,
            'description' => $request->description,
            'created_by' => $user_id,
        ]);

        $data = new OrganizationResource($project);

        return $this->sendResponse('Organization created Successfully!', $data);
    }

    public function update(Request $request, $id)
    {
        $user_id = auth()->id();
        $organization = Organization::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|unique:organizations,name,' . $organization->id,
            'description' => 'string',
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors()->first());
        }

        $organization->update([
            'name' => $request->name,
            'description' => $request->description,
            'created_by' => $user_id,
        ]);

        return $this->sendResponse('Organization updated successfully!', new OrganizationResource($organization));
    }

    public function destroy($id)
    {
        $organization = Organization::findOrFail($id);
        $organization->delete();

        return $this->sendResponse('Organization deleted successfully!', null);
    }
}
