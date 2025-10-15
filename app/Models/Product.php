<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'stock',
        'isPinned',
        'images_main',
        'images_rear',
        'images_left_side',
        'images_right_side',
        'color_id',
        'category_id',
        'promo_id',
    ];

    protected $casts = [
        'images_main' => 'array',
        'images_rear' => 'array',
        'images_left_side' => 'array',
        'images_right_side' => 'array',
    ];


    public function color()
    {
        return $this->belongsTo(Color::class);
    }

    public function promo()
    {
        return $this->belongsTo(Promotion::class);
    }

    public function category()
    {
        return $this->belongsTo(ProductCategorie::class, 'category_id');
    }

    public function specification()
    {
        return $this->hasOne(Specification::class);
    }

    public function carts()
    {
        return $this->hasMany(Cart::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

}
