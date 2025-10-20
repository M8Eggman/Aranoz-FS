<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WeeklySale extends Model
{
    /** @use HasFactory<\Database\Factories\WeeklySaleFactory> */
    use HasFactory;

    protected $fillable = [
        'email',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
