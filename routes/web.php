<?php

use App\Http\Controllers\BlogCategoryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductCategorieController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TagController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// 1 : Client (acheter, commenter blog, suivre commandes)
// 2 : Community Manager (CRUD blog, créer tags)
// 3 : Agent (gérer commandes, changer statut, envoyer mails dashboard)
// 4 : Webmaster (CRUD produit, pin sur home, gérer stock, modifier contact)
// 5 : Admin (tous droits)

// Routes public
Route::get('/', [HomeController::class, 'home'])->name('home');

// Routes pour les  clients
Route::middleware(['auth', 'role:admin,client'])->group(function () {
    // Route::get('/shop', [ClientController::class, 'shop'])->name('client.shop');
    // Route::post('/blog/{id}/comment', [ClientController::class, 'comment'])->name('client.comment');
    // Route::get('/orders', [ClientController::class, 'orders'])->name('client.orders');
});

// Routes pour les community manager
Route::middleware(['auth', 'role:admin,community_manager'])->group(function () {
    // Tags
    Route::get('/admin/tags', [TagController::class, 'index'])
        ->name('admin.tags');
    Route::post('/admin/tags/store', [TagController::class, 'store'])
        ->name('admin.tags.store');
    Route::put('/admin/tags/{id}/update', [TagController::class, 'update'])
        ->name('admin.tags.update');
});

// Routes pour les agents
Route::middleware(['auth', 'role:admin,agent'])->group(function () {
    // Route::get('/dashboard/orders', [AgentController::class, 'index'])->name('agent.orders');
    // Route::put('/orders/{id}/status', [AgentController::class, 'updateStatus'])->name('agent.orders.status');
    // Route::post('/orders/{id}/mail', [AgentController::class, 'sendMail'])->name('agent.orders.mail');
});

// Routes pour les webmasters
Route::middleware(['auth', 'role:admin,webmaster'])->group(function () {
    // Route::resource('/products', WebmasterController::class);
    // Route::post('/products/{id}/pin', [WebmasterController::class, 'pin'])->name('products.pin');
    // Route::put('/products/{id}/stock', [WebmasterController::class, 'updateStock'])->name('products.stock');
    // Route::put('/contact', [WebmasterController::class, 'updateContact'])->name('contact.update');
});

// Route pour les admins
Route::middleware(['auth', 'role:admin'])->group(function () {
    // Blog Categories
    Route::get('/admin/blogs/categories', [BlogCategoryController::class, 'index'])
        ->name('admin.blogs-categories');
    Route::post('/admin/blogs/categories/store', [BlogCategoryController::class, 'store'])
        ->name('admin.blogs-categories.store');
    Route::put('/admin/blogs/categories/{id}', [BlogCategoryController::class, 'update'])
        ->name('admin.blogs-categories.update');
    Route::delete('/admin/blogs/categories/{id}', [BlogCategoryController::class, 'destroy'])
        ->name('admin.blogs-categories.destroy');

    // Product Categories
    Route::get('/admin/products/categories', [ProductCategorieController::class, 'index'])
        ->name('admin.products-categories');
    Route::post('/admin/products/categories/store', [ProductCategorieController::class, 'store'])
        ->name('admin.products-categories.store');
    Route::put('/admin/products/categories/{id}/update', [ProductCategorieController::class, 'update'])
        ->name('admin.products-categories.update');
    Route::delete('/admin/products/categories/{id}/destroy', [ProductCategorieController::class, 'destroy'])
        ->name('admin.products-categories.destroy');

    // Tags
    Route::delete('/admin/tags/{id}/destroy', [TagController::class, 'destroy'])
        ->name('admin.tags.destroy');
});

// Routes pour la home du backend 
Route::middleware(['auth', 'role:admin,webmaster,agent,community_manager'])->group(function () {
    Route::get('/admin', [HomeController::class, 'admin_home'])->name('admin.home');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
