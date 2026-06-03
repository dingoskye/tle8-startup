<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;


#[fillable(['title', 'description', 'completed', 'deadline', 'user_id', 'main_task_id'])]
class SubTask extends Model
{
    use SoftDeletes;

    public function user(): HasOne
    {
        return $this->hasOne(User::class);
    }

    public function mainTasks(): BelongsTo
    {
        return $this->belongsTo(MainTask::class, 'main_task_id');
    }
}
