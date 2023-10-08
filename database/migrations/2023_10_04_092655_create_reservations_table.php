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
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('flight_id')->comment('id del vuelo, Relacion id con la tabla vuelos');
            $table->string('email')->comment('Correo electronico de la persona que realiza la reserva');
            $table->unsignedInteger('seats')->comment('Cantidad de sillas a ocupar en el vuelo');
            $table->boolean('is_cancelled')->default(false)->comment('Indica si una reserva esta cancelada o no');
            $table->timestamps();
            $table->foreign('flight_id')->references('id')->on('flights');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
