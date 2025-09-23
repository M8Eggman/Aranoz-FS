<?php

namespace Database\Seeders;

use App\Models\ContactInfo;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ContactInfoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ContactInfo::create([
            'street' => '12 rue de la Paix',
            'state' => 'Île-de-France',
            'city' => 'Paris',
            'country_code' => 'FRA',
            'zip_code' => '75002',
            'number' => '01 23 45 67 89',
            'email' => 'contact@aranoz.fr',
            'phone_number' => '+33 1 23 45 67 89',
        ]);
    }
}
