<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = ['name', 'description', 'advisor_id', 'created_by'];

    public function teams()
    {
        return $this->belongsToMany(Team::class, 'team_projects', 'project_id', 'team_id');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}
