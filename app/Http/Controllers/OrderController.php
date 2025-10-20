<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\ContactInfo;
use App\Models\Country;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Promotion;
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

    /**
     * Display the checkout page
     */
    public function checkout(Request $request)
    {
        $user = $request->user();

        // Récupérer les articles du panier
        $cartItems = Cart::where('user_id', $user->id)
            ->with(['product'])
            ->get();

        if ($cartItems->isEmpty()) {
            return redirect()->route('cart.index')->with('error', 'Your cart is empty.');
        }

        // Calculer le total
        $subtotal = $cartItems->sum(function ($item) {
            return $item->product->final_price * $item->quantity;
        });

        // Récupérer les billing details existants
        $billingDetail = $user->billingDetail;

        // Récupérer le coupon appliqué en session
        $finalTotal = $subtotal;

        $countries = Country::all();

        return Inertia::render('Checkout/Index', [
            'cartItems' => $cartItems,
            'subtotal' => $subtotal,
            'finalTotal' => $finalTotal,
            'billingDetail' => $billingDetail,
            'countries' => $countries,
        ]);
    }

    /**
     * Process the checkout
     */
    public function processCheckout(Request $request)
    {
        $user = $request->user();

        // Validation
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'company' => 'nullable|string|max:255',
            'phone_number' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'country_id' => 'required|integer|exists:countries,id',
            'address' => 'required|string|max:255',
            'number' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'zip' => 'required|string|max:255',
            'payment_method' => 'required|in:check_payments,paypal',
        ]);


        // Récupérer les articles du panier
        $cartItems = Cart::where('user_id', $user->id)
            ->with(['product'])
            ->get();

        if ($cartItems->isEmpty()) {
            return redirect()->route('cart.index')->with('error', 'Your cart is empty.');
        }

        // Calculer le total
        $subtotal = $cartItems->sum(function ($item) {
            return $item->product->final_price * $item->quantity;
        });

        // Appliquer le coupon si présent
        $appliedCoupon = session('applied_coupon');
        $discount = 0;
        $finalTotal = $subtotal;
        $promotion = null;

        if ($appliedCoupon) {
            $promotion = Promotion::where('name', $appliedCoupon)->first();
            if ($promotion) {
                $discount = ($subtotal * $promotion->percentage) / 100;
                $finalTotal = $subtotal - $discount;
            }
        }

        // Créer ou mettre à jour les billing details
        $billingDetail = $user->billingDetail()->updateOrCreate(
            ['user_id' => $user->id],
            [
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'company' => $request->company,
                'phone_number' => $request->phone_number,
                'email' => $request->email,
                'country_id' => $request->country_id,
                'address' => $request->address,
                'number' => $request->number,
                'city' => $request->city,
                'zip' => $request->zip,
            ]
        );

        // Génère la partie date et unique sécurisée
        $datePart = now()->format('ymd'); // YYMMDD
        $uniquePart = strtoupper(bin2hex(random_bytes(5))); // 10 chars uniques
        $orderNumber = "ORD-{$datePart}-{$uniquePart}";

        // Préparer les données de billing pour la commande
        $billingData = [
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'company' => $request->company,
            'phone_number' => $request->phone_number,
            'email' => $request->email,
            'country_id' => $request->country_id,
            'address' => $request->address,
            'number' => $request->number,
            'city' => $request->city,
            'zip' => $request->zip,
        ];

        // Créer la commande
        $order = Order::create([
            'user_id' => $user->id,
            'order_number' => $orderNumber,
            'status' => 'pending',
            'total_price' => $finalTotal,
            'sub_total_price' => $subtotal,
            'payment_method' => $request->payment_method,
            'billing_detail' => $billingData,
            'promotion_percentage' => $promotion ? $promotion->percentage : null,
            'promotion_name' => $promotion ? $promotion->name : null,
            'promotion_id' => $promotion ? $promotion->id : null,
        ]);

        // Créer les order items
        foreach ($cartItems as $cartItem) {
            $product = $cartItem->product;
            $finalPrice = $product->final_price ?? $product->price;

            OrderItem::create([
                'product_id' => $cartItem->product_id,
                'quantity' => $cartItem->quantity,
                'product_name' => $product->name,
                'product_price' => $product->price,
                'product_final_price' => $finalPrice,
                'product_promotion' => $product->promotion,
                'total_price' => $finalPrice * $cartItem->quantity,
                'order_id' => $order->id,
            ]);
        }

        // Vider le panier 
        Cart::where('user_id', $user->id)->delete();

        return redirect()->route('view-orders')
            ->with('success', 'Order placed successfully! Your order number is ' . $orderNumber);
    }
}
