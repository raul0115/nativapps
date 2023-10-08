<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;


class ReservationUpdateRequest extends FormRequest
{
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
        $availableSeats = $this->reservation->flight->total_seats - $this->reservation->flight->reserved_seats + $this->reservation->seats;
        return [
            'seats' => ['required', 'integer', 'min:1','max:'.$availableSeats]
        ];
    }
}
