<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;


#[fillable(['name'])]
class Theme extends Model
{
    public function userSetting(): HasMany
    {
        return $this->hasMany(UserSetting::class);
    }
}

