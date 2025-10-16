<?php

namespace App\Http\Controllers;

use App\Models\ContactInfo;
use App\Models\Mailing;
use App\Http\Requests\StoreMailingRequest;
use App\Http\Requests\UpdateMailingRequest;
use Inertia\Inertia;

class MailingController extends Controller
{
    public function contact()
    {
        $contactInfo = ContactInfo::first();
        return Inertia::render('Contact/Index', compact('contactInfo'));
    }

    /**
     * Display a listing of the resource.
     */
    public function index($status = null)
    {
        $mailings = Mailing::query()
            ->when($status === 'archived', fn($q) => $q->where('isArchived', true))
            ->when($status !== 'archived', fn($q) => $q->where('isArchived', false))
            ->latest()
            ->get();

        return Inertia::render('Admin/Mailings/Index', [
            'mailings' => $mailings,
            'status' => $status,
        ]);
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
    public function store(StoreMailingRequest $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:2000',
        ]);

        Mailing::create([
            'name' => $request->name,
            'email' => $request->email,
            'subject' => $request->subject,
            'message' => $request->message,
        ]);

        return redirect()->route('contact')->with('success', 'Mail sent successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // 
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Mailing $mailing)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMailingRequest $request, Mailing $mailing)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $mail = Mailing::findOrFail($id);
        $mail->delete();

        return back()->with('success', 'Mail deleted successfully.');
    }

    public function read($id)
    {
        $mail = Mailing::findOrFail($id);
        $mail->update(['status' => true]);

        return back();
    }

    public function archive($id)
    {
        $mail = Mailing::findOrFail($id);

        if (!$mail->status) {
            return back()->with('error', 'You must read the mail before archiving.');
        }

        $mail->update(['isArchived' => true]);

        return back()->with('success', 'Mail archived successfully.');
    }
}
