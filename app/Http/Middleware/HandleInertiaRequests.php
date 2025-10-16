<?php

namespace App\Http\Middleware;

use DB;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            // Envoi des messages flash pour tout les composants et pages
            'flash' => [
                'success' => fn() => $request->session()->get('success'),
                'error' => fn() => $request->session()->get('error'),
            ],
            'auth' => [
                'user' => $request->user()?->load(['role', 'newsletter', 'likedProducts', 'carts.product']),
            ],
            // Envoi les gates dans le front
            'can' => [
                'isAdmin' => $request->user()?->can('is-admin') ?? false,
                'isWebmaster' => $request->user()?->can('is-webmaster') ?? false,
                'isAgent' => $request->user()?->can('is-agent') ?? false,
                'isCommunityManager' => $request->user()?->can('is-community-manager') ?? false,
                'isUser' => $request->user()?->can('is-user') ?? false,
            ]
        ];
    }
}
