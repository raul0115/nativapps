<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Repositories\FlightRepositoryInterface;

class FlightController extends Controller
{
    public function __construct(protected FlightRepositoryInterface $flightRepository)
    {}

    public function index(Request $request)
    {
        $conditions = $request->only(['origin_city']);
        $flights = $this->flightRepository->allWithAvailableSeats($conditions);
        return Inertia::render('Flight/Index', ['flights' => $flights, 'conditions' => $conditions, 'page' => $request->page,'status' => session('status')]);


    }

}
