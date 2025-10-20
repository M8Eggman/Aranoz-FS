<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\BlogCategory;
use App\Models\Tag;
use App\Http\Requests\StoreBlogRequest;
use App\Http\Requests\UpdateBlogRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Blog::with(['user', 'category', 'tags', 'comments.user']);

        // Filtre par catégorie
        $category_id = $request->input('category_id');
        if ($category_id) {
            $category = BlogCategory::find($category_id);
            if ($category) {
                $query->where('category_id', $category_id);
            }
        }

        $tag_id = $request->input('tag_id');
        if ($tag_id) {
            $tag = Tag::find($tag_id);
            if ($tag) {
                $query->whereHas('tags', function ($query) use ($tag_id) {
                    $query->where('tag_id', $tag_id);
                });
            }
        }

        // Recherche par titre
        $search = $request->input('search');
        if ($search) {
            $query->where('title', 'like', "%$search%");
        }

        $blogs = $query->orderBy('created_at', 'desc')->get();
        $categories = BlogCategory::with('blogs')->get();
        $tags = Tag::all();

        $allBlogs = Blog::all();


        return Inertia::render('Blog/Index', compact(
            'blogs',
            'categories',
            'tags',
            'category_id',
            'search',
            'allBlogs'
        ));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBlogRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $blog = Blog::with(['user', 'category', 'tags', 'comments.user'])->find($id);
        $allBlogs = Blog::all();
        $tags = Tag::all();
        $categories = BlogCategory::with('blogs')->get();
        $blogs = Blog::all();

        return Inertia::render('Blog/Show', compact('blog', 'tags', 'categories', 'blogs', 'allBlogs'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Blog $blog)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBlogRequest $request, Blog $blog)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blog $blog)
    {
        //
    }
}
