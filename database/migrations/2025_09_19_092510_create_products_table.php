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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->decimal('price', 8, 2);
            $table->unsignedInteger('stock');
            $table->boolean('isPinned')->default(false);
            $table->string('image_main');
            $table->string('image_rear')->nullable();
            $table->string('image_left_side')->nullable();
            $table->string('image_right_side')->nullable();
            $table->foreignId('color_id')->constrained('colors');
            $table->foreignId('category_id')->constrained('product_categories');
            // Promotions sur le produits
            $table->unsignedTinyInteger('promotion')->nullable();
            $table->timestamps();
        });

        DB::statement('ALTER TABLE products ADD CONSTRAINT check_promotion CHECK (promotion >= 0 AND promotion <= 100)');
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
