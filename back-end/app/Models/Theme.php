<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;


#[fillable(['name'])]
class Theme extends Model
{
    use SoftDeletes;

    public function userSettings(): HasMany
    {
        return $this->hasMany(UserSetting::class);
    }
}

