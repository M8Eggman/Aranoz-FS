<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    // Récupère des nom de role en params et le transforme en array
    public function handle(Request $request, Closure $next, ...$roles)
    {
        $user = $request->user();

        // Vérifie si le user et contenu dans l'array ou si il est connécté
        if (!$user || !in_array($user->role->name, $roles)) {
            // Redirige vers la page 403 (pas les droits)
            abort(403);
        }

        return $next($request);
    }
}
