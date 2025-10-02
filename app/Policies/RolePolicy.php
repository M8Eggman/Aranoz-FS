<?php

namespace App\Policies;

use App\Models\Role;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class RolePolicy
{
    // Vérifie si l'utilisateur a un des rôles autorisés
    public function access(User $user, string ...$roles): bool
    {
        return in_array($user->role->name, $roles);
    }
}
