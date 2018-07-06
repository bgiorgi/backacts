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
            'link' => 'active_url',
            'min_age' => 'digits_between:0,2',
            'alcohol' => 'boolean',
            'food' => 'boolean',
            'price_amount' => 'digits_between:0,4',
            'ticket_link' => 'active_url',
            'image' => 'required'
        ];
    }
}
