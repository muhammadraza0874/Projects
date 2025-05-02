<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
    protected $fillable = ['name', 'description', 'created_by'];

    public function teams()
    {
        return $this->hasMany(Team::class);
    }

}
