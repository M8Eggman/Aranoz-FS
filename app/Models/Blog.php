<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    /** @use HasFactory<\Database\Factories\BlogFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'image',
        'category_id',
        'user_id',
    ];

    public function user()
    {
        $this->belongsTo(User::class);
    }

    public function category()
    {
        $this->belongsTo(BlogCategory::class);
    }

    public function tags()
    {
        $this->belongsToMany(Tag::class);
    }

    public function comments()
    {
        $this->hasMany(Comment::class);
    }
}
