<?php

namespace App\Repositories;

use App\Models\Flight;
use Illuminate\Pagination\LengthAwarePaginator;

interface FlightRepositoryInterface
{
    public function find($id) : ?Flight;


    public function allWithAvailableSeats(array $filters = [], int $perPage = 5): LengthAwarePaginator;

}
