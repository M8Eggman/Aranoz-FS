<?php

namespace App\Http\Controllers;

use App\Models\Mailing;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductCategorie;
use App\Models\Tag;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function home()
    {
        $randomProducts = Product::inRandomOrder()->take(4)->get();
        $pinnedProducts = Product::where('isPinned', true)->get();
        $products = Product::all();

        // Récupère les 4 premières catégories qui ont un produit
        $categories = ProductCategorie::has('products')->take(4)->get();

        // Ajoute la première image du premier produit de la catégorie
        $categories->map(function ($category) {
            $product = $category->products->first();
            $category->image = $product && !empty($product->images_main['product'])
                ? $product->images_main['product']
                : '/storage/products/product/templateP.png';
            return $category;
        });

        // Calcul de la date de fin de la semaine en cours
        $weeklySaleEndsAt = Carbon::now()->copy()->next(Carbon::SUNDAY)->endOfDay()->toIso8601String();

        // Récupère les 8 premiers produits les plus vendus
        $bestSellers = Product::orderBy('sales_count', 'desc')->take(8)->get();

        return Inertia::render('Home/Home', compact('randomProducts', 'pinnedProducts', 'categories', 'products', 'weeklySaleEndsAt', 'bestSellers'));
    }

    public function admin_home()
    {
        $this->authorize('access', ['role', 'admin', 'community_manager', 'webmaster', 'agent']);
        $usersCount = User::count();
        $ordersCount = Order::count();
        $productsCount = Product::count();
        $unreadMailsCount = Mailing::where('status', 'unread')->count();
        $mailsCount = Mailing::count();

        return Inertia::render('Admin/Home', compact('usersCount', 'ordersCount', 'productsCount', 'unreadMailsCount', 'mailsCount'));
    }
}
