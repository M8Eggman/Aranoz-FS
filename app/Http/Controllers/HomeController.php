<?php

namespace App\Http\Controllers;

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
        $canLogin = Route::has('login');
        $canRegister = Route::has('register');

        return Inertia::render('Admin/Home', compact('canLogin', 'canRegister'));
    }
}
