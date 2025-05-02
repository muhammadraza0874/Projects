<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\ReviewResource;
use App\Models\Project;
use App\Models\Review;
use App\Models\Team;
use App\Models\TeamProject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use function Webmozart\Assert\Tests\StaticAnalysis\integer;

class ReviewController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $query = Review::query();

        // Executives can see all reviews along with reviewer names
        if ($user->role === 'executive') {
            $reviews =  $query->get();

            $data = ReviewResource::collection($reviews);

            return $this->sendResponse('Review fetch Successfully!', ReviewResource::collection($data));
        }

        // Managers can see:
        // 1. Reviews of themselves
        // 2. Reviews of their team members
        // 3. Reviews of projects their team is involved in
        elseif ($user->role === 'manager') {
            // Get team IDs where the user is a manager
            $teamIds = Team::where('manager_id', $user->id)->pluck('id')->toArray();

            // Get associate IDs from the teams managed by the user
            $associateIds = Team::whereIn('id', $teamIds)->pluck('associate_ids')->map(function ($ids) {
                return json_decode($ids);
            })->flatten()->unique()->toArray();

            $projectIds = TeamProject::whereIn('team_id', $teamIds)->pluck('project_id')->toArray();

            $reviews = Review::where(function ($q) use ($user, $projectIds, $associateIds) {
                $q->where('created_by', $user->id)
                ->orWhereIn('reviewable_id', $projectIds)
                ->orWhereIn('created_by', $associateIds);
            })->get();

            $data = ReviewResource::collection($reviews);
            return $this->sendResponse('Review fetch Successfully!', $data);
        }


        // Associates can see:
        // 1. Reviews they made
        // 2. Reviews of projects their team is involved in
        elseif ($user->role === 'associate') {

            $teamIds = Team::whereRaw('JSON_CONTAINS(associate_ids, ?)', [json_encode((int) $user->id)])->pluck('id')->toArray();

            $projectIds = TeamProject::whereIn('team_id', $teamIds)->pluck('project_id')->toArray();

            $reviews = Review::where(function ($q) use ($user, $projectIds) {
                $q->where('created_by', $user->id)
                ->orWhereIn('reviewable_id', $projectIds);
            })->get();

            $data = ReviewResource::collection($reviews);

            return $this->sendResponse('Review fetch Successfully!', ReviewResource::collection($data));
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }


    public function store(Request $request)
    {
        $user = auth()->user();

        $validator = Validator::make($request->all(), [
            'reviewable_type' => 'required|string',
            'reviewable_id' => 'required|integer',
            'review' => 'required|string'
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors()->first());
        }

        $result = $this->isUserAllowedToReview($user, $request->reviewable_type, $request->reviewable_id);

        if (!$result['status']) {
            return $this->sendError($result['message']);
        }

        $review = Review::create([
            'reviewable_type' => $request->reviewable_type,
            'reviewable_id' => $request->reviewable_id,
            'review' => $request->review,
            'created_by' => $user->id,
        ]);

        return $this->sendResponse('Review created Successfully!', new ReviewResource($review));

    }

    public function update(Request $request, Review $review)
    {
        $user = auth()->user();

        // Validate request inputs
        $validator = Validator::make($request->all(), [
            'reviewable_type' => 'required|string',
            'reviewable_id' => 'required|integer',
            'review' => 'required|string'
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors()->first());
        }

        // Ensure the user can only update their own review
        if ($user->id !== $review->created_by) {
            return $this->sendError('You can only edit your own reviews.');
        }

        // Update the review
        $review->update([
            'reviewable_type' => $request->reviewable_type,
            'reviewable_id' => $request->reviewable_id,
            'review' => $request->review,
            'created_by' => $user->id,
        ]);

        return $this->sendResponse('Review updated successfully!', new ReviewResource($review));
    }


    public function destroy($id)
    {
        $user = auth()->user();
        $review = Review::findOrFail($id);
        if ($user->id === $review->created_by) {
            $review->delete();
            return $this->sendResponse('Review deleted successfully!');
        }

        return $this->sendError('You can only delete your own reviews.');
    }

    private function isUserAllowedToReview($user, $reviewableType, $reviewableId)
    {
        // Executives cannot add/edit reviews
        if ($user->role === 'Executive') {
            return ['status' => false, 'message' => 'Executives cannot add or edit reviews.'];
        }

        // Common function to check if user is part of a team
        $isUserInTeam = function ($team) use ($user) {
            if (!$team) {
                return ['status' => false, 'message' => 'No valid team found.'];
            }

            if ($team->manager_id === null) {
                return ['status' => false, 'message' => 'Manager does not exist for this team.'];
            }

            if (empty($team->associate_ids)) {
                return ['status' => false, 'message' => 'Associates do not exist for this team.'];
            }

            // Decode associate IDs from JSON
            $associateIds = json_decode($team->associate_ids, true);

            // Check if user is the manager or an associate
            if ($user->id === $team->manager_id || in_array($user->id, $associateIds)) {
                return ['status' => true, 'message' => ''];
            }

            return ['status' => false, 'message' => 'You are not a member of this team.'];
        };

        // Handle Manager or Associate type
        if (in_array($reviewableType, ['manager', 'associate'])) {
            $team = Team::where(function ($query) use ($reviewableId) {
                $query->where('manager_id', (int) $reviewableId)
                    ->orWhereRaw('JSON_CONTAINS(associate_ids, ?)', [json_encode((int) $reviewableId)]);
            })->first();

            return $isUserInTeam($team);
        }

        // Handle Project type
        if ($reviewableType === 'project') {
            $teamIds = TeamProject::where('project_id', $reviewableId)->pluck('team_id')->toArray();

            if (empty($teamIds)) {
                return ['status' => false, 'message' => 'No teams are linked to this project.'];
            }

            $teams = Team::whereIn('id', $teamIds)->get();
            if ($teams->isEmpty()) {
                return ['status' => false, 'message' => 'No valid teams found for this project.'];
            }

            foreach ($teams as $team) {
                $result = $isUserInTeam($team);
                if ($result['status']) {
                    return $result;
                }
            }

            return ['status' => false, 'message' => 'You cannot review this project because you are not a member of any associated team.'];
        }

        // Handle Team type
        if ($reviewableType === 'team') {
            $team = Team::where('id', $reviewableId)->first();
            return $isUserInTeam($team);
        }

        return ['status' => false, 'message' => 'You are not allowed to leave a review for this item.'];
    }
}
