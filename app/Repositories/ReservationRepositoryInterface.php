<?php

namespace App\Repositories;

use App\Models\Reservation;
use Illuminate\Pagination\LengthAwarePaginator;

interface ReservationRepositoryInterface
{
    public function allPaginate(int $perPage = 10) : LengthAwarePaginator;

    public function create(array $data): Reservation;

    public function update(Reservation $reservation, array $data): Reservation;

}
