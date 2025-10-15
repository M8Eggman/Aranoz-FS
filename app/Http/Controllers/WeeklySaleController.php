<?php

namespace App\Http\Controllers;

use App\Models\WeeklySale;
use App\Http\Requests\StoreWeeklySaleRequest;
use App\Http\Requests\UpdateWeeklySaleRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class WeeklySaleController extends Controller
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
    public function store(StoreWeeklySaleRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(WeeklySale $weeklySale)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(WeeklySale $weeklySale)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateWeeklySaleRequest $request, WeeklySale $weeklySale)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(WeeklySale $weeklySale)
    {
        //
    }

    public function subscribe(Request $request)
    {
        $email = $request->user()?->email ?? $request->email;

        if (!$request->user()) {
            $request->validate([
                'email' => 'required|email|max:255|unique:weekly_sales,email',
            ], [
                'email.unique' => 'This email is already registered for weekly sales.',
            ]);
        } else {
            if (WeeklySale::where('email', $email)->exists()) {
                throw ValidationException::withMessages([
                    'email' => 'You are already registered for weekly sales.',
                ]);
            }
        }

        $user = Auth::user();

        WeeklySale::create([
            'email' => $email,
            'user_id' => $user?->id,
        ]);

        return back()->with('success', 'You are registered for weekly sales!');
    }

    public function unsubscribe(Request $request)
    {
        $request->validate([
            'email' => 'required|email|max:255',
        ]);

        $entry = WeeklySale::where('email', $request->email)->first();
        if (!$entry) {
            return back()->with('error', 'No weekly sales subscription found for this email.');
        }
        $entry->delete();
        return back()->with('success', 'You are unsubscribed from weekly sales.');
    }
}
