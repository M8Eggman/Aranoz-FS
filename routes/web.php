<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// 1 : Client (acheter, commenter blog, suivre commandes)
// 2 : Community Manager (CRUD blog, créer tags)
// 3 : Agent (gérer commandes, changer statut, envoyer mails dashboard)
// 4 : Webmaster (CRUD produit, pin sur home, gérer stock, modifier contact)
// 5 : Admin (tous droits)

Route::get('/', [HomeController::class, 'home'])->name('home');

Route::middleware(['auth', 'role:admin,webmaster,agent, community_manager'])->group(function () {
    Route::get('/admin', [HomeController::class, 'admin_home'])->name('admin.home');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
