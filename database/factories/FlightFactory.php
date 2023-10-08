<?php

namespace Database\Factories;

use App\Models\City;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Flight>
 */
class FlightFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $originCity = City::inRandomOrder()->first() ?? City::factory()->create();
        $destinationCity = City::where('id','<>', $originCity->id )->inRandomOrder()->first() ?? City::factory()->create();
        $departureDateTime = fake()->dateTimeBetween('+1 day', '+1 year');

        $arrivalInterval = fake()->numberBetween(1, 12);
        $arrivalDateTime = clone $departureDateTime;
        $arrivalDateTime->modify("+{$arrivalInterval} hours");

        return [
            'origin_city_id' => $originCity->id,
            'destination_city_id' => $destinationCity->id,
            'departure_datetime' => $departureDateTime,
            'arrival_datetime' => $arrivalDateTime,
            'total_seats' => fake()->numberBetween(30, 90),
        ];
    }
}
