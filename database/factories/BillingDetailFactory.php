<?php

namespace Database\Factories;

use App\Models\Country;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BillingDetail>
 */
class BillingDetailFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'phone_number' => fake()->phoneNumber(),
            'address' => fake()->streetAddress(),
            'number' => fake()->buildingNumber(),
            'city' => fake()->city(),
            'zip' => fake()->postcode(),
            'company' => fake()->optional()->company(),
            'user_id' => null,
            'country_id' => Country::all()->random()->first()->id,
        ];
    }
}
