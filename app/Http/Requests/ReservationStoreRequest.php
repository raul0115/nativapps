<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Repositories\FlightRepositoryInterface;

class ReservationStoreRequest extends FormRequest
{
    public function __construct(protected FlightRepositoryInterface $flightRepository)
    {}
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }


    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {

        $rules = [
            'flight_id' => ['required', 'integer','exists:flights,id'],
            'email' => ['required', 'email'],
            'seats' => ['required', 'integer']
        ];
        $flight = $this->flightRepository->find($this->flight_id ?? 0);
        if($flight){
            $availableSeats = $flight->total_seats - $flight->reserved_seats;

            $rules['seats'] = ['required', 'integer', 'min:1','max:'.$availableSeats];
        }

        return $rules;
    }
}
