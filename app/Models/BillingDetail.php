<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BillingDetail extends Model
{
    /** @use HasFactory<\Database\Factories\BillingDetailFactory> */
    use HasFactory;

    protected $fillable = [
        'first_name',
        "last_name",
        'phone_number',
        'address',
        'number',
        'city',
        'zip',
        'company',
        'user_id',
        'country_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function country()
    {
        return $this->belongsTo(Country::class);
    }

}
