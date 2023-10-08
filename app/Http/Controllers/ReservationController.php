<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Reservation;
use Illuminate\Http\Request;
use App\Http\Requests\ReservationStoreRequest;
use App\Http\Requests\ReservationUpdateRequest;
use App\Repositories\ReservationRepositoryInterface;

class ReservationController extends Controller
{
    public function __construct(protected ReservationRepositoryInterface $reservationRepository)
    {}

    public function index(Request $request)
    {
        $reservations = $this->reservationRepository->allPaginate();
        return Inertia::render('Reservation/Index', ['reservations' => $reservations,  'page' => $request->page,'status' => session('status')]);
    }


    public function store(ReservationStoreRequest $request)
    {
        $this->reservationRepository->create($request->validated());

        return to_route('flight.index',["page"=> $request->page]);
    }


    public function update(ReservationUpdateRequest $request, Reservation $reservation)
    {
       $reservation =  $this->reservationRepository->update($reservation, $request->validated());

        return to_route('reservation.index',['page'=>$request->page]);

    }

    public function cancel( Reservation $reservation)
    {
       $reservation =  $this->reservationRepository->update($reservation, ['is_cancelled'=>true]);
        return to_route('reservation.index');

    }
}
