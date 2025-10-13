<?php

namespace App\Http\Controllers;

use App\Models\Mailing;
use App\Models\Order;
use App\Models\Product;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function home()
    {
        $canLogin = Route::has('login');
        $canRegister = Route::has('register');

        return Inertia::render('Home', compact('canLogin', 'canRegister'));
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
