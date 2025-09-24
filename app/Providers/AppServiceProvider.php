<?php

namespace App\Providers;

use App\Models\Role;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        Gate::define('is-admin', function ($user) {
            return $user->role_id === Role::where("name", "admin")->first()?->id;
        });

        Gate::define('is-webmaster', function ($user) {
            return $user->role_id === Role::where("name", "webmaster")->first()?->id;
        });

        Gate::define('is-agent', function ($user) {
            return $user->role_id === Role::where("name", "agent")->first()?->id;
        });

        Gate::define('is-community-manager', function ($user) {
            return $user->role_id === Role::where("name", "community_manager")->first()?->id;
        });

        Gate::define('is-user', function ($user) {
            return $user->role_id === Role::where("name", "user")->first()?->id;
        });
    }
}
