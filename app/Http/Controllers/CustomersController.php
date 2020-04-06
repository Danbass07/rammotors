<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Customer;
use Validator;
use Illuminate\Support\Facades\Log;
use App\Message;

class CustomersController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $customers = Customer::with('cars')->get();

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
            
        ]);
            
        Log::info(request());
            
    
            $customer = Customer::findOrfail($id);
            $customer->name = request('name');
            $customer->surname = request('surname');
            $customer->phone = request('phone');
            $customer->email = request('email');
            $customer->info = request('info');
            
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
        $customer = \App\Customer::find($id)->load('cars');
         foreach($customer->cars as $car) {
            $car->customer()->dissociate();
		$car->save();

        }
        Customer::destroy($id);
		
        return response()->json();
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
    
    public function toNexmo($id)
	{
		$car = \App\Car::find($id);
		
	  	$nexmo = app('Nexmo\Client');
	  
	  	if ( empty($car->customer->phone)) {

              // $number = '447794338771';
              $number = '447828414128';
	  		
	  		$name = 'This car has no owner in your system';
	  	}

	  	else {

	  		$customer = \App\Customer::findOrfail($car->customer->id);
	  		$name = $customer->name;
		  	$number = '44'.$customer->phone;
		  	//$number = '447828414128';
			
			}

		$nexmo->message()->send([
		    'to'   => $number,
		    'from' => '447794338771',
		    'text' => 'Hello '.$name.'. This is a polite reminder that your '.$car->make.' ('.strtoupper($car->registration).') is due MOT on or before '.$car->mot.' and service on '.$car->servis.'. To book your appointment text or call Robert on 07794338771 or visit www.rammotorsretford.co.uk/book-appointment.html *************************************************************** sms send by application developed by DCS.'
		    			
		]);

			// $nexmo->message()->send([
	
		    // 'to'   => '447794338771',
		    // 'from' => "NEXMO",
		    // 'text' => 'Sms sent to :  '.$customer->name.' '.$customer->surname.', '.$car->make.', '.strtoupper($car->registration).'.  MOT '.$car->mot.'.  Serv '.$car->servis. ' 0'.$customer->phone.' '.$customer->info.'',


			// ]);
		

		$car->pending = 1;
		$car->save();
			 
			return response()->json();
    }
    public function sendMessage($id, $messageindex, $carid ) {
		
        $nexmo = app('Nexmo\Client');
        $message = Message::findOrfail($messageindex+1);
        $customer = \App\Customer::findOrfail($id);
        $number = '447828414128';
        $car= \App\Car::findOrfail($carid);
        if ( empty($customer->phone)) {

             $number = '447794338771';
            //$number = '447828414128';
            
            $name = 'This car has no owner in your system';
        }

        else {

           $number = '44'.$customer->phone;
          
           $message =  $message->body;

           $newphrase = str_replace("%REG%", $car->registration,  $message);
           Log::info($newphrase);
          }

      $nexmo->message()->send([
          'to'   => $number,
          'from' => '447794338771',
          'text' => 'Hello '.$customer->name.' .'.$newphrase,        
      ]);
    }
    
}
