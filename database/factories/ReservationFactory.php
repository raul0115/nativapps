<?php

namespace Database\Factories;

use App\Models\Flight;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reservation>
 */
class ReservationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $flight = Flight::inRandomOrder()->first() ?? Flight::factory()->create();
        return [
            'flight_id' => $flight->id,
            'email' => fake()->unique()->safeEmail(),
            'seats' => fake()->numberBetween(1, 3),
            'is_cancelled' => fake()->boolean()
        ];
    }
}
