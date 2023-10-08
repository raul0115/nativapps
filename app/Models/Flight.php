<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Flight extends Model
{
    use HasFactory;

    protected $fillable = [
        'origin_city_id',
        'destination_city_id',
        'departure_datetime',
        'arrival_datetime',
        'total_seats',
    ];
    protected $appends = ['reserved_seats'];

    protected $casts = [
        'departure_datetime' => 'datetime:Y/m/d H:i',
        'arrival_datetime' => 'datetime:Y/m/d H:i',
    ];



    public function originCity(): BelongsTo
    {
        return $this->belongsTo(City::class, 'origin_city_id');
    }

    public function destinationCity(): BelongsTo
    {
        return $this->belongsTo(City::class, 'destination_city_id');
    }

    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }


    protected function reservedSeats(): Attribute
    {

        return Attribute::make(
            get: function () {
                return $this->reservations->where('is_cancelled', false)->sum('seats');
            }
        );
    }

}
