<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('', [App\Http\Controllers\FlightController::class, 'index'])->name('flight.index');

Route::group(['prefix' => 'reservations', 'as' => 'reservation.'], function () {
    Route::get('', [App\Http\Controllers\ReservationController::class, 'index'])->name('index');
    Route::post('', [App\Http\Controllers\ReservationController::class, 'store'])->name('store');
    Route::put('{reservation}', [App\Http\Controllers\ReservationController::class, 'update'])->name('update');
    Route::put('{reservation}/cancel', [App\Http\Controllers\ReservationController::class, 'cancel'])->name('cancel');
});





