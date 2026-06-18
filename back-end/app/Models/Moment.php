<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Moment extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'date',
        'location',
        'description',
        'group_id',

    ];

    public function Groups(): HasOne
    {
        return $this->hasOne(Group::class, 'group_id');
    }
}
