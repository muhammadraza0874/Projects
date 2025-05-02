<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReviewResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $user = auth()->user();

        $data = [
            'id' => $this->id ?? "",
            'reviewable_type' => $this->reviewable_type ?? "",
            'reviewable_id' => $this->reviewable_id ?? "",
            'review' => $this->review ?? "",
        ];

        // Add 'reviewer' key only if the user is an executive
        if ($user->role === 'executive') {
            $data['reviewer'] = $this->reviewer->name ?? "";
        }

        return $data;

    }
}
