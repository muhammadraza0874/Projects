<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TeamResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id ?? "",
            'name' => $this->name ?? "",
            'manager_id' => $this->manager_id ?? "",
            'manager' => new UserResource(User::where('id', $this->manager_id)->first()),
            'associate_ids' => !empty($this->associate_ids) ? json_decode($this->associate_ids, true) : [],
            'associates' => UserResource::collection(User::whereIn('id', json_decode($this->associate_ids ?? '[]', true))->get()),
        ];
    }
}
