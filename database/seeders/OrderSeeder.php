<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Product;
use App\Models\Order;
use App\Models\Promotion;
use App\Models\OrderItem;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $products = Product::all();
        $promotions = Promotion::all();


        $paymentMethods = ['check_payments', 'paypal'];

        foreach ($users as $user) {
            $billingDetails = $user->billingDetail->load(['country', 'user'])->toArray();

            // 30% des commandes ont une promotion
            $promo = fake()->boolean(30) ? $promotions->random() : null;

            // Crée la commande sans order_number (pour avoir l'id)
            $order = Order::create([
                'order_number' => '',
                'sub_total_price' => 0,
                'total_price' => 0,
                'status' => 'pending',
                'isArchived' => false,
                'user_id' => $user->id,
                'billing_detail' => json_encode($billingDetails),
                'payment_method' => $paymentMethods[fake()->numberBetween(0, 1)],
                'promotion_percentage' => $promo ? $promo->percentage : null,
                'promotion_name' => $promo ? $promo->name : null,
                'promotion_id' => $promo ? $promo->id : null,
            ]);

            // Génère entre 1 et 4 order items
            $orderItems = $products->random(fake()->numberBetween(1, 4));
            $subTotal = 0;

            foreach ($orderItems as $product) {
                $quantity = fake()->numberBetween(1, 3);
                $itemTotal = $product->final_price * $quantity;
                $subTotal += $itemTotal;

                OrderItem::create([
                    'product_name' => $product->name,
                    'product_price' => $product->price,
                    'product_final_price' => $product->final_price,
                    'product_promotion' => $product?->promotion ?? null,
                    'quantity' => $quantity,
                    'total_price' => $itemTotal,
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                ]);
            }

            // Calcul final avec promo
            $final = $promo
                ? round($subTotal * (1 - $promo->percentage / 100), 2)
                : $subTotal;

            // Génère la partie date et unique sécurisée
            $datePart = now()->format('ymd'); // YYMMDD
            $uniquePart = strtoupper(bin2hex(random_bytes(5))); // 10 chars uniques
            $orderNumber = "ORD-{$datePart}-{$uniquePart}";

            // Mise à jour de la commande
            $order->update([
                'order_number' => $orderNumber,
                'sub_total_price' => $subTotal,
                'total_price' => $final,
            ]);
        }
    }
}
