<?php

namespace App\Http\Controllers;

use App\Models\Country;
use App\Http\Requests\StoreCountryRequest;
use App\Http\Requests\UpdateCountryRequest;
use Inertia\Inertia;

class CountryController extends Controller
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
        $countries = Country::all();
        $lastId = Country::query()->max('id') ?? 0;
        return Inertia::render('Admin/Countries/Index', compact('countries', 'lastId'));
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
    public function store(StoreCountryRequest $request)
    {
        $request->validate(['name' => 'required|string|max:255']);
        Country::create(['name' => $request->name]);

        return redirect()->back()->with('success', 'Country created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Country $country)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Country $country)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCountryRequest $request, $id)
    {
        $country = Country::findOrFail($id);

        $request->validate(['name' => 'required|string|max:255']);
        $country->update(['name' => $request->name]);

        return redirect()->back()->with('success', 'Country updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $country = Country::findOrFail($id);
        $country->delete();

        return redirect()->back()->with('success', 'Country deleted');
    }
}
