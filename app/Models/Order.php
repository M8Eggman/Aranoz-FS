<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    /** @use HasFactory<\Database\Factories\OrderFactory> */
    use HasFactory;

    protected $fillable = [
        'order_number',
        'total_price',
        'status',
        'isArchived',
        'user_id',
        'promotion_id',
        'promotion_percentage',
        'promotion_name',
        'billing_detail',
        'payment_method',
        'sub_total_price',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function promotion()
    {
        return $this->belongsTo(Promotion::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
