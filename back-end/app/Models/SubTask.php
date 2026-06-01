<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;


#[fillable(['name', 'description', 'completed', 'deadline'])]
class SubTask extends Model
{
    public function user(): HasOne
    {
        return $this->hasOne(User::class);
    }
}
