<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


#[fillable(['name'])]
class Theme extends Model
{
    public function userSetting(): BelongsTo
    {
        return $this->belongsTo(UserSetting::class);
    }
}

