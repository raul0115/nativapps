<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        \App\Models\City::factory(20)->create();
        \App\Models\Flight::factory(20)->create();
        \App\Models\Reservation::factory(10)->create();
    }
}
