<?php

namespace App\Http\Controllers;

use App\Models\Color;
use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\ProductCategorie;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Construire la requête avec les filtres
        $query = Product::with(['category', 'color', 'promo']);

        // Filtre par catégorie
        $category_id = $request->input('category_id');
        if ($category_id) {
            $category = ProductCategorie::find($category_id);
            if ($category) {
                $query->where('category_id', $category_id);
            } else {
                return redirect()->route('products')->with('error', 'Category not found');
            }
        }

        // Filtre par couleur
        $color_id = $request->input('color_id');
        if ($color_id) {
            $color = Color::find($color_id);
            if ($color) {
                $query->where('color_id', $color_id);
            } else {
                return redirect()->route('products')->with('error', 'Color not found');
            }
        }

        // Recherche par nom
        $search = $request->input('search');
        if ($search) {
            $query->where('name', 'like', "%$search%");
        }

        // Exécuter la requête
        $products = $query->get();

        // Récupérer toutes les catégories
        $categories = ProductCategorie::all();
        $colors = Color::all();

        return Inertia::render('Products/Index', compact(
            'products',
            'categories',
            'colors',
            'category_id',
            'color_id',
            'search'
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
    public function store(StoreProductRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($product_id)
    {
        $product = Product::find($product_id)?->load(['category', 'color', 'specification', 'comments.user']);

        if (!$product) {
            return redirect()->route('products')->with('error', 'Product not found');
        }

        // Récupérer les produits précédent et suivant
        $previousProduct = Product::where('id', '<', $product->id)
            ->orderBy('id', 'desc')
            ->first() ?? null;
        $nextProduct = Product::where('id', '>', $product->id)
            ->orderBy('id', 'asc')
            ->first() ?? null;

        return Inertia::render('Products/Show', compact(
            'product',
            'previousProduct',
            'nextProduct'
        ));
    }

    public function show_back(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
