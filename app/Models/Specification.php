<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Specification extends Model
{
    /** @use HasFactory<\Database\Factories\SpecificationFactory> */
    use HasFactory;

    protected $fillable = [
        'width',
        'height',
        'depth',
        'weight',
        'quality_checking',
        'freshness_duration',
        'packaging',
        'content',
        'product_id',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
