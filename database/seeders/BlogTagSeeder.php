<?php

namespace Database\Seeders;

use App\Models\Blog;
use App\Models\Tag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BlogTagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Récupérer tous les blogs et tags
        $blogs = Blog::all();
        $tags = Tag::all();

        // Associer des tags cohérents à chaque blog
        $blogTagAssociations = [
            // Blog 1: Aranoz Grand Opening Party
            1 => ['Lifestyle', 'News', 'Hobbies'], // Lifestyle, News, Hobbies

            // Blog 2: Smartphones Working on the Moon
            2 => ['Technologie', 'Science', 'World'], // Technologie, Science, World

            // Blog 3: Todays Fashion First Tour
            3 => ['Lifestyle', 'Hobbies'], // Lifestyle, Hobbies

            // Blog 4: This Daily Cup of Coffee Could Save Your Life!
            4 => ['Food', 'Recipes', 'Lifestyle'], // Food, Recipes, Lifestyle

            // Blog 5: A Sweet Celebration: Colorful Cakes & Coffee Moments
            5 => ['Food', 'Recipes', 'Lifestyle', 'Hobbies'], // Food, Recipes, Lifestyle, Hobbies
        ];

        // Attacher les tags aux blogs
        foreach ($blogTagAssociations as $blogId => $tagNames) {
            $blog = $blogs->find($blogId);
            if ($blog) {
                $tagIds = $tags->whereIn('name', $tagNames)->pluck('id')->toArray();
                $blog->tags()->sync($tagIds);
            }
        }
    }
}