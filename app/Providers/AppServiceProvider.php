<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {

        $this->app->bind(
            \App\Repositories\CityRepositoryInterface::class,
            \App\Repositories\CityRepository::class
        );

        $this->app->bind(
            \App\Repositories\ReservationRepositoryInterface::class,
            \App\Repositories\ReservationRepository::class
        );

        $this->app->bind(
            \App\Repositories\FlightRepositoryInterface::class,
            \App\Repositories\FlightRepository::class
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
