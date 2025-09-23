<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Promotions sur la commande
        Schema::create('promotions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedTinyInteger('percentage');
            $table->timestamps();
        });

        // contrainte pour forcer un entier entre 0 et 100 compris
        DB::statement('ALTER TABLE promotions ADD CONSTRAINT check_percentage CHECK (percentage >= 0 AND percentage <= 100)');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('promotions');
    }
};
