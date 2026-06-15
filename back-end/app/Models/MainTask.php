<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;


#[fillable(['title', 'description', 'deadline', 'ai_file', 'group_id'])]
class MainTask extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title',
        'deadline',
        'description',
        'ai_file',
        'group_id',
    ];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_main_tasks')
            ->withPivot('progress', 'level', 'score', 'completed');

    }

    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class, 'group_id');
    }

    public function subTasks(): HasMany
    {
        return $this->hasMany(SubTask::class);
    }
}
