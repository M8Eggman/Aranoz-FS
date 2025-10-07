<?php

namespace App\Http\Controllers;

use App\Models\ContactInfo;
use App\Http\Requests\StoreContactInfoRequest;
use App\Http\Requests\UpdateContactInfoRequest;
use Inertia\Inertia;

class ContactInfoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $contactInfo = ContactInfo::first();
        return Inertia::render('Admin/ContactInfo/Index', compact("contactInfo"));
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
    public function store(StoreContactInfoRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ContactInfo $contactInfo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ContactInfo $contactInfo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateContactInfoRequest $request)
    {
        $validated = $request->validate([
            'street' => 'required|string|max:255',
            'state' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'country_code' => 'required|string|max:5',
            'zip_code' => 'required|string|max:10',
            'number' => 'required|string|max:20',
            'email' => 'required|email|max:255',
            'phone_number' => 'required|string|max:20',
        ]);

        $contactInfo = ContactInfo::first();

        $contactInfo->update($validated);

        return redirect()->back()->with('success', 'Contact info updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ContactInfo $contactInfo)
    {
        //
    }
}
