<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;
use Str;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        // Validation
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'image_file' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'image_url' => 'nullable|url|max:255',
            'newsletter' => 'boolean',
        ]);

        $imagePaths = [];

        // Gestion du fichier 
        if ($request->hasFile('image_file')) {
            // Récupère l'image
            $file = $request->file('image_file');
            // Récupère le nom de l'image et le rend url friendly
            $original_name = Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME));
            // Crée un id unique
            $unique_id = uniqid();

            // Crée le manager avec imagick
            $manager = new ImageManager(new Driver());

            $sizes = [
                'small' => 150,
                'medium' => 400,
                'large' => 800,
            ];

            foreach ($sizes as $sizeName => $width) {
                // Crée le nom du fichier avec l'id et le nom orginal et la taille
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
        // Gestion de l'url
        elseif ($request->filled('image_url')) {
            // Si url externe même lien pour toutes tailles
            $imagePaths = [
                'small' => $request->image_url,
                'medium' => $request->image_url,
                'large' => $request->image_url,
            ];
        } else {
            // Image par défaut
            $imagePaths = [
                'small' => '/storage/users/templateU.png',
                'medium' => '/storage/users/templateU.png',
                'large' => '/storage/users/templateU.png',
            ];
        }

        // Création utilisateur
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'images' => $imagePaths,
            'role_id' => Role::where('name', 'user')->value('id'),
        ]);

        // Création newsletter lié à user
        if ($request->newsletter) {
            $user->newsletter()->create([
                'email' => $user->email,
            ]);
        }

        event(new Registered($user));
        Auth::login($user);

        return redirect()->route('home');
    }
}
