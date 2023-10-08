<?php

namespace App\Repositories;

use App\Models\Reservation;
use Illuminate\Pagination\LengthAwarePaginator;

class ReservationRepository implements ReservationRepositoryInterface
{
    protected $model;

    public function __construct(Reservation $model)
    {
        $this->model = $model;
    }

    public function allPaginate(int $perPage = 10):LengthAwarePaginator
    {
        return  $this->model->with(['flight.originCity', 'flight.destinationCity'])->paginate($perPage);

    }

    public function create(array $data): Reservation
    {
        return $this->model->create($data);
    }

    public function update(Reservation $reservation, array $data): Reservation
    {
       $reservation->update($data);
       return $reservation;

    }

}
