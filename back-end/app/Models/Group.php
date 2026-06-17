<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

#[fillable(['name', 'description', 'profile_image'])]
class Group extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'image',
    ];

//ToDo: Invite link groep, leader board boolean, meerdere personen.
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_group')
            ->withPivot('role');
    }

    public function mainTasks(): HasMany
    {
        return $this->hasMany(MainTask::class, 'main_task_id');
    }
}

