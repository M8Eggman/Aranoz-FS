<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use App\Http\Requests\StoreTagRequest;
use App\Http\Requests\UpdateTagRequest;
use Inertia\Inertia;

class TagController extends Controller
{
    public function __construct()
    {
        // Les rôles qui ont accès a toute les fonction du controller
        $this->middleware(['auth', 'role:admin,community_manager']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tags = Tag::all();
        $lastId = Tag::query()->max('id') ?? 0;
        return Inertia::render('Admin/Tags/Index', compact('tags', 'lastId'));
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
    public function store(StoreTagRequest $request)
    {

        $request->validate(['name' => 'required|string|max:255']);
        Tag::create(['name' => $request->name]);

        return redirect()->back()->with('success', 'Tag created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Tag $tag)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tag $tag)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTagRequest $request, $id)
    {
        $tag = Tag::findOrFail($id);

        $request->validate(['name' => 'required|string|max:255']);
        $tag->update(['name' => $request->name]);

        return redirect()->back()->with('success', 'Tag updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Seul l"admin peut supprimer un tag
        $this->authorize('access', ['role', 'admin']);

        $tag = Tag::findOrFail($id);
        $tag->delete();

        return redirect()->back()->with('success', 'Tag deleted');
    }
}
