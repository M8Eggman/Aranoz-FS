<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Specification>
 */
class SpecificationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'width' => $this->faker->numberBetween(30, 300) . ' cm',
            'height' => $this->faker->numberBetween(30, 200) . ' cm',
            'depth' => $this->faker->numberBetween(20, 100) . ' cm',
            'weight' => $this->faker->randomFloat(2, 1, 100) . ' kg',
            'quality_checking' => $this->faker->boolean(90),
            'freshness_duration' => null,
            'packaging' => $this->faker->randomElement(['Carton', 'Plastique', 'Bois', 'Métal']),
            'content' => $this->faker->numberBetween(1, 10),
            'product_id' => null,
        ];
    }
}
