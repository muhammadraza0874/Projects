<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
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
            'description' => $this->description ?? "",
            'team_ids' => $this->teams->pluck('id') ?? [], // Returns an array of team IDs
            'teams' => TeamResource::collection($this->teams) ?? [],
        ];
    }
}
