<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->words(3, true),
            'description' => $this->faker->paragraph(),
            'price' => $this->faker->randomFloat(2, 10, 2000),
            'stock' => $this->faker->numberBetween(0, 100),
            'isPinned' => $this->faker->boolean(10),
            'image_main' => $this->faker->imageUrl(640, 480, 'furniture', true),
            'image_rear' => $this->faker->imageUrl(640, 480, 'furniture', true),
            'image_left_side' => $this->faker->imageUrl(640, 480, 'furniture', true),
            'image_right_side' => $this->faker->imageUrl(640, 480, 'furniture', true),
            // Les fk seront assignées dans le seeder
            'color_id' => null,
            'category_id' => null,
            'promotion' => $this->faker->optional(0.2)->numberBetween(5, 50),
        ];
    }
}
