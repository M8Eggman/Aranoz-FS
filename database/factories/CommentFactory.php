<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'message' => $this->faker->sentence(),
            'website' => $this->faker->boolean(50) ? $this->faker->url() : null,
            'user_id' => User::all()->random()->first()?->id ?? 1,
            'blog_id' => null,
            'product_id' => null,
        ];
    }

    public function forBlog($blogId)
    {
        return $this->state(fn() => [
            'product_id' => null,
            'blog_id' => $blogId,
        ]);
    }

    public function forProduct($productId)
    {
        return $this->state(fn() => [
            'product_id' => $productId,
            'blog_id' => null,
        ]);
    }
}
