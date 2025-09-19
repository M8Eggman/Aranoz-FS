<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    /** @use HasFactory<\Database\Factories\CommentFactory> */
    use HasFactory;

    protected $fillable = [
        'message',
        'website',
        'user_id',
        'blog_id',
        'product_id',
    ];

    public function user()
    {
        $this->belongsTo(User::class);
    }

    public function blog()
    {
        $this->belongsTo(Blog::class);
    }

    public function category()
    {
        $this->belongsTo(BlogCategory::class);
    }
}
