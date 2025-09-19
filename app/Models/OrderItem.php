<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    /** @use HasFactory<\Database\Factories\OrderItemFactory> */
    use HasFactory;

    protected $fillable = [
        'product_name',
        'product_price',
        'quantity',
        'order_id',
        'product_id',
    ];

    public function order()
    {
        $this->belongsTo(Order::class);
    }

    public function product()
    {
        $this->belongsTo(Product::class);
    }
}
