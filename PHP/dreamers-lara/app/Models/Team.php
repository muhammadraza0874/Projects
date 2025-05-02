<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $fillable = ['name', 'manager_id', 'associate_ids', 'organization_id','created_by'];

    public function manager()
    {
        return $this->belongsTo(User::class, 'manager_id');
    }

    public function associates()
    {
        return $this->belongsToMany(User::class, 'team_associate', 'team_id', 'user_id')
            ->whereIn('id', json_decode($this->associate_ids)); // Assuming associate_ids is stored as JSON
    }

    public function projects()
    {
        return $this->belongsToMany(Project::class);
    }
}
