<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;


#[Fillable(['name', 'email', 'password', 'image', 'admin'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    use SoftDeletes;

    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {

        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function userSetting(): HasOne
    {
        return $this->hasOne(UserSetting::class);
    }

    public function mainTasks(): BelongsToMany
    {
        return $this->belongsToMany(MainTask::class, 'user_main_task')
            ->withPivot('progress', 'level', 'score', 'completed');
    }

    public function groups(): BelongsToMany
    {
        return $this->belongsToMany(Group::class, 'user_group')
            ->withPivot('role');
    }

    public function subTasks(): HasMany
    {
        return $this->hasMany(SubTask::class);
    }
}
