<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'role:admin,agent']);
    }
    /**
     * Display a listing of the resource.
     */
    public function index($status = null)
    {
        $query = Order::with('user');

        if ($status === 'pending') {
            $query->where('status', 'pending')->where('isArchived', false);
        } elseif ($status === 'confirmed') {
            $query->where('status', 'confirmed')->where('isArchived', false);
        } elseif ($status === 'archived') {
            $query->where('isArchived', true);
        }

        $orders = $query->get();

        return Inertia::render('Admin/Orders/Index', compact('orders', 'status'));
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
    public function store(StoreOrderRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $order = Order::findOrFail($id)->load(['user', 'orderItems']);
        return Inertia::render('Admin/Orders/Show', compact('order'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderRequest $request, Order $order)
    {
        //
    }

    public function confirm($id)
    {
        $order = Order::findOrFail($id);
        $order->status = 'confirmed';
        $order->save();

        return back()->with('success', 'Order confirmed.');
    }

    public function archive($id)
    {
        $order = Order::findOrFail($id);
        $order->isArchived = true;
        $order->save();

        return back()->with('success', 'Order archived.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
