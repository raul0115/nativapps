<?php

namespace App\Repositories;

use Carbon\Carbon;
use App\Models\Flight;
use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;


class FlightRepository implements FlightRepositoryInterface
{
    protected $model;

    public function __construct(Flight $model)
    {
        $this->model = $model;
    }

    public function find($id): ?Flight
    {
        return $this->model->find($id);
    }

    public function allWithAvailableSeats(array $filters = [], int $perPage= 5): LengthAwarePaginator
    {

        return $this->model->leftJoin('reservations', 'flights.id', '=', 'reservations.flight_id')
        ->select('flights.*')
        ->selectRaw('flights.total_seats - COALESCE(SUM(reservations.seats), 0) as available_seats')
        ->groupBy('flights.id', 'flights.total_seats')
        ->havingRaw('available_seats > 0')
        ->whereDate('departure_datetime', '>', Carbon::now())
        ->when(isset($filters['origin_city']), function ($query) use ($filters){
            $query->whereHas('originCity', function ($query2) use ($filters) {
                $query2->where('name', 'like', "%{$filters['origin_city']}%");
            });
        })
        ->orderBy('departure_datetime', 'asc')
        ->with(['reservations','originCity', 'destinationCity'])
        ->paginate($perPage);
    }

}
