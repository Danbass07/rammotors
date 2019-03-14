<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Customer;
use Validator;
use Illuminate\Support\Facades\Log;

class CustomersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $customers = Customer::all();

        return response()->json($customers);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        

		$this->validate(request(), [
        'name' => 'required',
        'surname' => 'required',
        'phone' => 'required',
        'email' => 'required',
        
    ]);
		

		

		$customer = new Customer();
		$customer->name = request('name');
		$customer->surname = request('surname');
		$customer->phone = request('phone');
		$customer->email = request('email');
		
		$customer->save();

			

			return response()->json($customer);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate(request(), [
            'name' => 'required',
            'surname' => 'required',
            'phone' => 'required',
            'email' => 'required',
            
        ]);
            
        Log::info(request());
            
    
            $customer = Customer::findOrfail($id);
            $customer->name = request('name');
            $customer->surname = request('surname');
            $customer->phone = request('phone');
            $customer->email = request('email');
            
            $customer->save();
    
                
    
                return response()->json($customer);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
    public function addCar($owner, $car) {
		
		$customer = \App\Customer::find($owner);
		$car = \App\Car::find($car);
		$customer->cars()->save($car);

			return response()->json();
    } 
    public function removeCar($owner, $car) {
		
		$customer = \App\Customer::find($owner);
		$car = \App\Car::find($car);
		$car->customer()->dissociate();
		$car->save();

			return response()->json();
	} 
}
