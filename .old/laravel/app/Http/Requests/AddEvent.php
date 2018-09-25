<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddEvent extends FormRequest
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
     * @return array
     */
    public function rules()
    {
        
        return [
            'title' => 'required',
            'date' => 'required',
            'time' => 'required|date_format:"H:i"',
            'duration_hours' => 'digits_between:0,2',
            'link' => 'nullable|active_url',
            'min_age' => 'digits_between:0,2',
            'alcohol' => 'nullable|boolean',
            'food' => 'nullable|boolean',
            'price_amount' => 'digits_between:0,4',
            'ticket_link' => 'nullable|active_url',
            'image' => 'required'
        ];
    }
}
