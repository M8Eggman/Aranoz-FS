<?php

namespace Database\Seeders;


use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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

        // Chaque user auront une commande
        foreach ($users as $user) {
            // 20% des commandes ont une promotion
            $promo = fake()->boolean(30) && $promotions->count() > 0 ? $promotions->random() : null;

            // Crée la commande sans order_number pour récupérer l'id plus tard
            $order = Order::create([
                'order_number' => '',
                'sub_total_price' => 0,
                'total_price' => 0,
                'status' => 'pending',
                'isArchived' => false,
                'user_id' => $user->id,
            ]);

            // Génère entre 1 et 4 order items pour cette commande
            $orderItem = $products->random(fake()->numberBetween(1, 4));
            $subTotal = 0;
            foreach ($orderItem as $o) {
                $quantity = fake()->numberBetween(1, 3);
                $subTotal += $o->price * $quantity;
                OrderItem::create([
                    'product_name' => $o->name,
                    'product_price' => $o->price,
                    'quantity' => $quantity,
                    'order_id' => $order->id,
                    'product_id' => $o->id,
                ]);
            }

            // Applique la promotion si besoin
            $final = $subTotal;
            if ($promo) {
                $final = round($subTotal * (1 - $promo->percentage / 100), 2);
            }

            // Met à jour le numéro de commande et les prix
            $order->order_number = 'ORD-' . str_pad($order->id, 5, '0', STR_PAD_LEFT);
            $order->sub_total_price = $subTotal;
            $order->total_price = $final;
            $order->save();
        }
    }
}
