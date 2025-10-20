<?php

namespace Database\Seeders;

use App\Models\Blog;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use \Illuminate\Support\Facades\Storage;

class BlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Récupérer toutes les images du dossier public/blogs
        $images = Storage::disk('public')->allFiles('blogs');

        $blogs = [
            [
                'title' => 'Aranoz Grand Opening Party',
                'description' => "Join us for the grand opening of Aranoz! Celebrate with exclusive offers and entertainment. The event will feature live music, delicious food, and a chance to meet our team. Discover our new collections and enjoy special discounts available only during the party. Don't miss this unique opportunity to experience the vibrant atmosphere and connect with fellow enthusiasts. Whether you're a long-time supporter or new to Aranoz, we look forward to welcoming you and sharing this milestone together.",
                'image' => '/storage/blogs/' . basename($images[0]),
                'category_id' => 5,
                'user_id' => 1,
                'created_at' => now()->subDays(10),
            ],
            [
                'title' => 'Smartphones Working on the Moon',
                'description' => "Discover how smartphones are being tested for lunar missions and space exploration. Engineers and scientists are pushing the boundaries of technology, adapting devices to withstand extreme conditions such as low gravity, radiation, and temperature fluctuations. This article explores the challenges faced in developing lunar-compatible smartphones, the innovative solutions being implemented, and the potential impact on future space missions. Learn how these advancements could revolutionize communication and data collection beyond Earth.",
                'image' => '/storage/blogs/' . basename($images[1]),
                'category_id' => 3,
                'user_id' => 2,
                'created_at' => now()->subDays(7),
            ],
            [
                'title' => 'Todays Fashion First Tour',
                'description' => "Explore the latest fashion trends with our exclusive first tour of the season. From bold colors to sustainable fabrics, this year's collection showcases creativity and innovation. Join us as we visit top designers, attend runway shows, and interview industry experts about what's hot and what's next. Whether you're passionate about style or simply curious, this comprehensive guide will inspire you to refresh your wardrobe and embrace new looks. Get ready to make a statement with today's fashion!",
                'image' => '/storage/blogs/' . basename($images[2]),
                'category_id' => 4,
                'user_id' => 1,
                'created_at' => now()->subDays(4),
            ],
            [
                'title' => 'This Daily Cup of Coffee Could Save Your Life!',
                'description' => "Learn about the health benefits of drinking coffee every day. Recent studies suggest that moderate coffee consumption can reduce the risk of certain diseases, improve mental alertness, and boost overall well-being. In this article, we delve into the science behind coffee's positive effects, share tips for brewing the perfect cup, and discuss how to enjoy your favorite beverage responsibly. Whether you prefer espresso, latte, or black coffee, discover how this daily ritual could contribute to a healthier lifestyle.",
                'image' => '/storage/blogs/' . basename($images[3]),
                'category_id' => 2,
                'user_id' => 2,
                'created_at' => now()->subDays(2),
            ],
            [
                'title' => 'A Sweet Celebration: Colorful Cakes & Coffee Moments',
                'description' => "Step into a world of color and joy with our latest party inspiration! This article explores how vibrant cakes, a fresh cup of coffee, and festive decorations can turn any gathering into a memorable celebration. From creative baking ideas to tips for setting a cheerful table, discover how to make your next event sparkle. Whether it's a birthday, a grand opening, or just a reason to share happiness, let these sweet treats and lively moments inspire you to celebrate life with flavor and fun. Don't forget the confetti and party hats—every detail counts for a perfect festive atmosphere!",
                'image' => '/storage/blogs/' . basename($images[4]),
                'category_id' => 1,
                'user_id' => 1,
                'created_at' => now(),
            ],
        ];

        foreach ($blogs as $b) {
            Blog::create($b);
        }
    }
}
