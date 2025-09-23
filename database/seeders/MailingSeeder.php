<?php

namespace Database\Seeders;

use App\Models\Mailing;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MailingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $mailings = [
            [
                'email' => 'client1@example.com',
                'subject' => 'Demande de renseignement',
                'message' => "Bonjour, je souhaite avoir plus d’informations sur un produit.",
                'status' => false,
                'isArchived' => false,
            ],
            [
                'email' => 'client2@example.com',
                'subject' => 'Problème de livraison',
                'message' => "Ma commande n’est pas arrivée, pouvez-vous m’aider ?",
                'status' => true,
                'isArchived' => false,
            ],
            [
                'email' => 'client3@example.com',
                'subject' => 'Suggestion',
                'message' => "Je propose d’ajouter plus de couleurs au catalogue.",
                'status' => false,
                'isArchived' => true,
            ],
        ];

        foreach ($mailings as $m) {
            Mailing::create($m);
        }
    }
}
