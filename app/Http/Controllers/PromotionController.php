<?php

namespace App\Http\Controllers;

use App\Models\Promotion;
use App\Http\Requests\StorePromotionRequest;
use App\Http\Requests\UpdatePromotionRequest;
use Inertia\Inertia;

class PromotionController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'role:admin,webmaster']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $coupons = Promotion::all();
        $lastId = Promotion::query()->max('id') ?? 0;
        return Inertia::render('Admin/Coupons/Index', compact('coupons', 'lastId'));
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
    public function store(StorePromotionRequest $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'percentage' => 'required|integer|min:0|max:100',
        ]);

        Promotion::create([
            'name' => $request->name,
            'percentage' => $request->percentage,
        ]);

        return redirect()->back()->with('success', 'Coupon created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Promotion $promotion)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Promotion $promotion)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePromotionRequest $request, $id)
    {
        $coupon = Promotion::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'percentage' => 'required|integer|min:0|max:100',
        ]);

        $coupon->update([
            'name' => $request->name,
            'percentage' => $request->percentage,
        ]);

        return redirect()->back()->with('success', 'Coupon updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $coupon = Promotion::findOrFail($id);
        $coupon->delete();

        return redirect()->back()->with('success', 'Coupon deleted');
    }
}
