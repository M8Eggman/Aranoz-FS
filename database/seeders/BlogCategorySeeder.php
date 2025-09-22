<?php

namespace Database\Seeders;

use App\Models\BlogCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BlogCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Travel'],
            ['name' => 'Health Care'],
            ['name' => 'Discover'],
            ['name' => 'Fashion'],
            ['name' => 'Business'],
        ];

        foreach ($categories as $c) {
            BlogCategory::create($c);
        }
    }
}
