<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;
use Str;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'subscribedNewsletter' => !!$request->user()->newsletter,
            'subscribedWeeklySale' => !!$request->user()->weeklySale,
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();
        $validated = $request->validated();

        // Supprimer les champs d'image de la validation pour les traiter séparément
        unset($validated['image_file'], $validated['image_url']);

        $user->fill($validated);

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        // Gestion des images
        $imagePaths = $this->handleImageUpdate($request, $user);
        if ($imagePaths) {
            $user->images = $imagePaths;
        }

        $user->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Handle image update logic
     */
    private function handleImageUpdate(ProfileUpdateRequest $request, $user)
    {
        $imagePaths = null;

        // Gestion du fichier uploadé
        if ($request->hasFile('image_file')) {
            // Supprimer les anciennes images (sauf image par défaut et URLs)
            $this->deleteOldImages($user);

            // Récupère l'image
            $file = $request->file('image_file');
            // Récupère le nom de l'image et le rend url friendly
            $original_name = Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME));
            // Crée un id unique
            $unique_id = uniqid();

            // Crée le manager avec GD
            $manager = new ImageManager(new Driver());

            $sizes = [
                'small' => 150,
                'medium' => 400,
                'large' => 800,
            ];

            foreach ($sizes as $sizeName => $width) {
                // Crée le nom du fichier avec l'id et le nom original et la taille
                $file_name = date('Y_m_d_His') . '_' . $unique_id . '_' . $original_name . '_' . $sizeName . '.webp';
                // Crée le path de l'image
                $file_path = "users/{$sizeName}/$file_name";

                $image = $manager
                    ->read($file->getRealPath())
                    ->scale(width: $width)
                    ->toWebp(quality: 90);

                Storage::disk('public')->put($file_path, (string) $image);

                $imagePaths[$sizeName] = "/storage/$file_path";
            }
        }
        // Gestion de l'URL
        elseif ($request->filled('image_url')) {
            // Supprimer les anciennes images (sauf image par défaut et URLs)
            $this->deleteOldImages($user);
            
            // Si URL externe, même lien pour toutes tailles
            $imagePaths = [
                'small' => $request->image_url,
                'medium' => $request->image_url,
                'large' => $request->image_url,
            ];
        }

        return $imagePaths;
    }

    /**
     * Delete old images (except default image and URLs)
     */
    private function deleteOldImages($user)
    {
        if (!$user->images || !is_array($user->images)) {
            return;
        }

        foreach ($user->images as $size => $imagePath) {
            // Ne pas supprimer l'image par défaut
            if (str_contains($imagePath, '/storage/users/templateU.png')) {
                continue;
            }

            // Ne pas supprimer les URLs externes
            if (str_starts_with($imagePath, 'http://') || str_starts_with($imagePath, 'https://')) {
                continue;
            }

            // Supprimer les fichiers locaux
            if (str_starts_with($imagePath, '/storage/')) {
                $relativePath = str_replace('/storage/', '', $imagePath);
                if (Storage::disk('public')->exists($relativePath)) {
                    Storage::disk('public')->delete($relativePath);
                }
            }
        }
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        // Vérifie si c'est le dernier admin
        if ($user->role && $user->role->name === 'admin') {
            $adminCount = $user->whereHas('role', function ($q) {
                $q->where('name', 'admin');
            })->count();
            if ($adminCount <= 1) {
                return Redirect::back()->withErrors(['password' => "You can't delete your account because you are the last admin."]);
            }
        }

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
