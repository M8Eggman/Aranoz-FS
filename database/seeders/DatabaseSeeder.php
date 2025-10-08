<?php

namespace Database\Seeders;

use App\Models\ContactInfo;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
            ProductCategorieSeeder::class,
            BlogCategorySeeder::class,
            TagSeeder::class,
            ColorSeeder::class,
            BlogSeeder::class,
            ProductSeeder::class,
            CommentSeeder::class,
            ContactInfoSeeder::class,
            CountrySeeder::class,
            PromotionSeeder::class,
            OrderSeeder::class,
            MailingSeeder::class,
            BillingDetailSeeder::class,
        ]);
    }
}
