<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'role:admin']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::with('role')->get();
        $roles = Role::all();
        return Inertia::render('Admin/Users/Index', compact('users', 'roles'));
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update a user's role.
     */
    public function role_update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'role_id' => 'required|exists:roles,id',
        ]);

        // Ne pas modifier le rôle des admins
        if ($user->role?->name === 'admin') {
            return back()->with('error', 'Cannot change role of an admin.');
        }

        $user->role_id = $request->role_id;
        $user->save();

        return back()->with('success', 'Role updated successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);

        // Ne pas supprimer les admins
        if ($user->role?->name === 'admin') {
            return back()->with('error', 'Cannot delete an admin.');
        }

        // Supprime les fichiers d’images si ce n’est pas celle par défaut
        if (!empty($user->images) && is_array($user->images)) {
            foreach ($user->images as $size => $path) {
                // Supprime que si ce n'est pas l'image de base
                if ($path && !str_contains($path, 'templateU.png')) {
                    // Convertit "/storage/users/..." en "users/..." puis supprime l'image
                    Storage::disk('public')->delete(str_replace('/storage/', '', $path));
                }
            }
        }

        $user->delete();

        return back()->with('success', 'User deleted successfully.');
    }
}
