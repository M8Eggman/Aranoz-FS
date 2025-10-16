<?php

namespace App\Http\Controllers;

use App\Models\ContactInfo;
use App\Models\Order;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use Inertia\Inertia;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    // Route pour suivre votre commande (public)
    public function trackYourOrder(Request $request)
    {
        $contactInfo = ContactInfo::first();
        $orderId = $request->input('order_number');

        if ($orderId) {
            $order = Order::where('order_number', $orderId)->first();

            if ($order) {
                // Commande trouvée → redirige vers Show
                return redirect()->route('track-your-order.show', $order->order_number);
            } else {
                // Commande non trouvée → retourne message d’erreur
                return redirect()->route('track-your-order')
                    ->with('error', 'Sorry, we couldn\'t find your order. Please check your order number and try again.');
            }
        }

        return Inertia::render('Order/Index', compact('contactInfo'));
    }

    /**
     * Display a listing of the resource.
     */
    public function index($status = null)
    {
        $this->authorize('access', ['role', 'admin', 'agent']);

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
        $this->authorize('access', ['role', 'admin', 'agent']);

        $order = Order::findOrFail($id)->load(['user', 'orderItems.product', 'promotion']);
        return Inertia::render('Admin/Orders/Show', compact('order'));
    }

    public function showTrackYourOrder($orderNumber)
    {
        $order = Order::where('order_number', $orderNumber)
            ->with(['orderItems.product', 'promotion'])
            ->firstOrFail();

        return Inertia::render('Order/Show', compact('order'));
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
        $this->authorize('access', ['role', 'admin', 'agent']);

        $order = Order::findOrFail($id);

        // Vérifie que la commande est pas déjà confirmée
        if ($order->status === 'confirmed') {
            return back()->with('error', 'Order is already confirmed.');
        }

        $order->status = 'confirmed';
        $order->save();

        return back()->with('success', 'Order confirmed.');
    }

    public function archive($id)
    {
        $this->authorize('access', ['role', 'admin', 'agent']);

        $order = Order::findOrFail($id);

        // Vérifie que la commande est confirmée
        if ($order->status !== 'confirmed') {
            return back()->with('error', 'Only confirmed orders can be archived.');
        }

        // Vérifie qu’elle n’est pas déjà archivée
        if ($order->isArchived) {
            return back()->with('error', 'Order is already archived.');
        }

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

    /**
     * Display all orders for the authenticated user
     */
    public function viewOrders(Request $request)
    {
        $user = $request->user();

        $orders = Order::where('user_id', $user->id)
            ->with(['orderItems.product', 'user.billingDetail', 'promotion'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Orders/ViewOrders', [
            'orders' => $orders
        ]);
    }
}
