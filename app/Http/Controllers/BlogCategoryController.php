<?php

namespace App\Http\Controllers;

use App\Models\BlogCategory;
use App\Http\Requests\StoreBlogCategoryRequest;
use App\Http\Requests\UpdateBlogCategoryRequest;
use Inertia\Inertia;

class BlogCategoryController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'role:admin']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = BlogCategory::all();
        $lastId = BlogCategory::query()->max('id') ?? 0;
        return Inertia::render('Admin/BlogCategories/Index', compact('categories', 'lastId'));
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
    public function store(StoreBlogCategoryRequest $request)
    {
        $request->validate(['name' => 'required|string|max:255']);
        $category = BlogCategory::create(['name' => $request->name]);

        return redirect()->back()->with('success', 'Category created')->with('category', $category);
    }

    /**
     * Display the specified resource.
     */
    public function show(BlogCategory $blogCategory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BlogCategory $blogCategory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBlogCategoryRequest $request, $id)
    {
        $blogCategory = BlogCategory::findOrFail($id);
        $request->validate(['name' => 'required|string|max:255']);
        $blogCategory->update(['name' => $request->name]);

        return redirect()->back()->with('success', 'Category updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $blogCategory = BlogCategory::findOrFail($id);
        $blogCategory->delete();

        return redirect()->back()->with('success', 'Category deleted');
    }
}
