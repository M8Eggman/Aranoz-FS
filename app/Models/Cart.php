<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    /** @use HasFactory<\Database\Factories\CartFactory> */
    use HasFactory;

    protected $fillable = [
        'quantity',
        'user_id',
        'product_id',
    ];

    public function user()
    {
        $this->belongsTo(User::class);
    }

    public function product()
    {
        $this->belongsTo(Product::class);
    }
}
