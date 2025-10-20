<?php

namespace App\Http\Controllers;

use App\Models\ProductCategorie;
use App\Http\Requests\StoreProductCategorieRequest;
use App\Http\Requests\UpdateProductCategorieRequest;
use Inertia\Inertia;

class ProductCategorieController extends Controller
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
        $categories = ProductCategorie::all();
        $lastId = ProductCategorie::query()->max('id') ?? 0;
        return Inertia::render('Admin/ProductCategories/Index', compact('categories', 'lastId'));
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
    public function store(StoreProductCategorieRequest $request)
    {
        $request->validate(['name' => 'required|string|max:255']);
        ProductCategorie::create(['name' => $request->name]);

        return redirect()->back()->with('success', 'Category created');
    }

    /**
     * Display the specified resource.
     */
    public function show(ProductCategorie $productCategorie)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProductCategorie $productCategorie)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductCategorieRequest $request, $id)
    {
        $category = ProductCategorie::findOrFail($id);

        $request->validate(['name' => 'required|string|max:255']);
        $category->update(['name' => $request->name]);

        return redirect()->back()->with('success', 'Category updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $category = ProductCategorie::findOrFail($id);
        $category->delete();

        return redirect()->back()->with('success', 'Category deleted');
    }
}
