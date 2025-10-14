<?php

namespace App\Http\Controllers;

use App\Models\Newsletter;
use App\Http\Requests\StoreNewsletterRequest;
use App\Http\Requests\UpdateNewsletterRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class NewsletterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StoreNewsletterRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Newsletter $newsletter)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Newsletter $newsletter)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateNewsletterRequest $request, Newsletter $newsletter)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Newsletter $newsletter)
    {
        //
    }

    public function subscribe(Request $request)
    {
        $email = $request->user()?->email ?? $request->email;

        // Si pas connecté → validation standard
        if (!$request->user()) {
            $request->validate([
                'email' => 'required|email|max:255|unique:newsletters,email',
            ], [
                'email.unique' => 'This email is already subscribed.',
            ]);
        } else {
            // Si connecté, vérifier doublon manuellement
            if (Newsletter::where('email', $email)->exists()) {
                throw ValidationException::withMessages([
                    'email' => 'You are already subscribed to the newsletter.',
                ]);
            }
        }

        // Récupère l'utilisateur connecté (s'il existe)
        $user = Auth::user();

        // Crée l'abonnement avec ou sans user_id
        Newsletter::create([
            'email' => $email,
            'user_id' => $user?->id,
        ]);

        // Redirige avec un message de succès
        return back()->with('success', 'Successfully subscribed to the newsletter!');
    }

    public function unsubscribe(Request $request)
    {
        $request->validate([
            'email' => 'required|email|max:255',
        ]);

        $newsletter = Newsletter::where('email', $request->email)->first();

        if (!$newsletter) {
            return back()->with('error', 'No subscription found for this email.');
        }

        $newsletter->delete();

        return back()->with('success', 'Successfully unsubscribed from the newsletter.');
    }
}
