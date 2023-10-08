<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('flights', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('origin_city_id')->comment('ciudad de origen del vuelo, Relacion id con la tabla ciudades');
            $table->unsignedBigInteger('destination_city_id')->comment('ciudad destino del vuelo, Relacion id con la tabla ciudades');
            $table->dateTime('departure_datetime')->comment('fecha y hora de salida del vuelo');
            $table->dateTime('arrival_datetime')->comment('fecha y hora de llegada(aterrizaje) del vuelo');
            $table->unsignedInteger('total_seats')->comment('sillas disponibles del vuelo, la carga maxima permita de cupos');
            $table->timestamps();

            $table->foreign('origin_city_id')->references('id')->on('cities');
            $table->foreign('destination_city_id')->references('id')->on('cities');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('flights');
    }
};
