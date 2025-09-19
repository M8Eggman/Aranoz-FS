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
        'image_main',
        'image_rear',
        'image_left_side',
        'image_right_side',
        'color_id',
        'category_id',
        'promo_id',
    ];

    public function color()
    {
        $this->belongsTo(Color::class);
    }

    public function promo()
    {
        $this->belongsTo(Promotion::class);
    }

    public function category()
    {
        $this->belongsTo(ProductCategorie::class);
    }

    public function specification()
    {
        $this->hasOne(Specification::class);
    }

    public function carts()
    {
        $this->hasMany(Cart::class);
    }

    public function orderItems()
    {
        $this->hasMany(OrderItem::class);
    }

}
