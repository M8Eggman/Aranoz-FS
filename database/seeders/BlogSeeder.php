<?php

namespace Database\Seeders;

use App\Models\Blog;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $blogs = [
            [
                'title' => 'Voyage au Japon',
                'description' => 'Découvrez la culture japonaise à travers un voyage inoubliable.',
                'image' => 'blog_japan.jpg',
                'category_id' => 1,
                'user_id' => 1,
            ],
            [
                'title' => 'Bien-être et santé',
                'description' => 'Conseils pour une vie saine et équilibrée.',
                'image' => 'blog_health.jpg',
                'category_id' => 2,
                'user_id' => 1,
            ],
            [
                'title' => 'Découvertes insolites',
                'description' => 'Explorez des lieux et des faits méconnus.',
                'image' => 'blog_discover.jpg',
                'category_id' => 3,
                'user_id' => 2,
            ],
            [
                'title' => 'Tendances mode 2025',
                'description' => 'Les dernières tendances fashion à ne pas manquer.',
                'image' => 'blog_fashion.jpg',
                'category_id' => 4,
                'user_id' => 2,
            ],
            [
                'title' => 'Entreprendre en 2025',
                'description' => 'Astuces et conseils pour lancer son business.',
                'image' => 'blog_business.jpg',
                'category_id' => 5,
                'user_id' => 1,
            ],
        ];

        foreach ($blogs as $b) {
            Blog::create($b);
        }
    }
}
