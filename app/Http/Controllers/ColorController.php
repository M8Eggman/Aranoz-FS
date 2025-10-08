<?php

namespace App\Http\Controllers;

use App\Models\Color;
use App\Http\Requests\StoreColorRequest;
use App\Http\Requests\UpdateColorRequest;
use Inertia\Inertia;

class ColorController extends Controller
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
        $colors = Color::all();
        $lastId = Color::query()->max('id') ?? 0;
        return Inertia::render('Admin/Colors/Index', compact('colors', 'lastId'));
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
    public function store(StoreColorRequest $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'hex' => 'required|string|max:7',
        ]);

        Color::create([
            'name' => $request->name,
            'hex' => $request->hex,
        ]);

        return redirect()->back()->with('success', 'Color created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Color $color)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Color $color)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateColorRequest $request, $id)
    {
        $color = color::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'hex' => 'required|string|max:7',
        ]);

        $color->update([
            'name' => $request->name,
            'hex' => $request->hex,
        ]);

        return redirect()->back()->with('success', 'Color updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $color = Color::findOrFail($id);
        $color->delete();

        return redirect()->back()->with('success', 'Color deleted');
    }
}
