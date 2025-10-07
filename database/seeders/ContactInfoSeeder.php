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
            'street' => 'Place de la Minoterie',
            'state' => 'Bruxelles-Capitale',
            'city' => 'Molenbeek-Saint-Jean',
            'country_code' => 'BEL',
            'zip_code' => '1080',
            'number' => '10',
            'email' => 'info@aranoz.be',
            'phone_number' => '+32 2 880 96 00',
        ]);
    }
}
