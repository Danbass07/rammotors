<?php

namespace App\Http\Controllers;


use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as BaseVerifier;
use Illuminate\Database\Eloquent\SoftDeletes;
use Nexmo\Laravel\Facade\Nexmo;
use Yajra\Datatables\Datatables;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Car;
use App\Customer;
use Illuminate\Support\Facades\Log;
use Validator;
use Input;






class CarsController extends Controller
{

	 public function __construct()
    {
        $this->middleware('auth');
    }
	
	 public function get_datatables_deleted() {
    	
	 	$cars = Car::select(['id','registration','make','info'])->get();
	 	

       		return Datatables::of($cars)->make()->withCars($cars);
    	
    	
    }



	public function get_data_expired() {
    	

			$cars = \App\Car::with('customer')->where('mot', '<', Carbon::now())->get();
			return response()->json($cars);

    	
    }

   

    public function index() {
			$cars = Car::with('customer')->get();
    		return response()->json($cars);

    }

	public function create() {
		
		$now=date("Y-m-j");

			return view('cars.create')->withNow($now);

	 }

	public function alerts() {
		
           
		
		
		$carsmotcoming = \App\Car::with('customer')->where('mot', '<', Carbon::now()->addWeeks(4))
			->where('mot','>',Carbon::now())
			->where('pending','=', 0)
			->where('appointment','<',Carbon::now())
			->orWhere('servis', '<', Carbon::now()->addWeeks(4))
			->where('servis','>',Carbon::now())
			->where('pending','=', 0)
			->where('appointment','<',Carbon::now())
			->get();

		
		
		
		
		
			
			
			return response()->json($carsmotcoming);
	}




	public function store(Request $request)	{
			
		
		$this->validate(request(), [
        'registration' => 'required|unique:cars,registration|max:255',
        'make' => 'required',
        'mot' => 'required',
        'servis' => 'required',
        
    ]);
		

		

		$car = new Car();
		$car->registration = request('registration');
		$car->make = request('make');
		$car->mot = request('mot');
		$car->servis = request('servis');
		$car->appointment = request('appointment');
		$car->info = request('info');
		$car->save();

			

			return response()->json($car);
	}

		
	public function edit($id) {

	}

	public function update(Request $request, $id)	{
		

		
		$this->validate(request(), [
        
        'make' => 'required',
        'mot' => 'required',
        'servis' => 'required',
        
    ]);
		
		$car = Car::findOrfail($id);
		$car->make = $request->make;
		$car->mot = $request->mot;
		$car->servis = $request->servis;
		$car->appointment = $request->appointment;
		
			if ($car->appointment > Carbon::now()) {
				
				$car->pending = 0;
		}

		$car->info = $request->info;
		$car->save();
		return response()->json();
	
	}
	public function updateayear($id, $type)	{

		$car = Car::findOrfail($id);
		
		$futureDate=date('Y-m-d', strtotime('+1 year', strtotime($car->$type)));
		
		if ($type == 'mot') {
		$car->mot = $futureDate;
		}
		if ($type == 'servis') {
		$car->servis = $futureDate;
		}
		if ($type == 'appointment') {
			$car->appointment = $futureDate;
		}
		
			if ($car->appointment > Carbon::now()) {
				
				$car->pending = 0;
		}

		$car->info = request('info');
		$car->save();

		
			return redirect()->route('cars.edit', $id)
                        ->with('message','car has been updated');
	
	}
	public function destroy($id) {
		
		Car::destroy($id);
		
			return response()->json();
		
	 }

	 public function undestroy($id) {
		
		$car = \App\Car::onlyTrashed()->where('id', $id)->restore();

		
		
			return redirect('cars/deleted');
		
	 }

	public function toNexmo($id)
	{
		$car = \App\Car::find($id);
		
	  	$nexmo = app('Nexmo\Client');
	  
	  	if ( empty($car->customer->phone)) {

	  		$number = '447794338771';
	  		
	  		$name = 'This car has no owner in your system';
	  	}

	  	else {

	  		$customer = \App\Customer::findOrfail($car->customer->id);
	  		$name = $customer->name;
		  	$number = '44'.$customer->phone;
		
		  	
			
			}

		$nexmo->message()->send([
		    'to'   => $number,
		    'from' => '447794338771',
		    'text' => 'Hello '.$name.'. This is a polite reminder that your '.$car->make.' ('.strtoupper($car->registration).') is due MOT on or before '.$car->mot.' and service on '.$car->servis.'. To book your appointment text or call Robert on 07794338771 or visit www.rammotorsretford.co.uk/book-appointment.html *************************************************************** sms send by application developed by DCS.'
		    			
		]);

	
		

		$car->pending = 1;
		$car->save();
			 
		return response()->json($car);
	}

	public function toNexmoAlert($id)
	{
		$car = \App\Car::find($id);
		
	  	$nexmo = app('Nexmo\Client');
	  
	  	if ( empty($car->customer->phone)) {

	  		$number = '447794338771';
	  		
	  		$name = 'This car has no owner in your system';
	  	}

	  	else {

	  		$customer = \App\Customer::findOrfail($car->customer->id);
	  		$name = $customer->name;
		  	$number = '44'.$customer->phone;
		
		  	
			
			}

		$nexmo->message()->send([
		    'to'   => $number,
		    'from' => '447794338771',
			'text' => 'Hello '.$name.'. This is a polite alert that your '.$car->make.' ('.strtoupper($car->registration).')
			 has MOT expired on '.$car->mot.' and service on '.$car->servis.'. To book your appointment text or call Robert on 07794338771 or visit www.rammotorsretford.co.uk/book-appointment.html *************************************************************** sms send by application developed by DCS.'
		    			
		]);

	
		

		$car->pending = 1;
		$car->save();
			 
		return response()->json($car);
	}
	public function dashboard() {

		$cars = \App\Car::where('mot', '<', Carbon::now())
						->orWhere('mot', '<', Carbon::now())
						->get();


			return view('cars/dashboard')->withCars($cars);;
	}

	public function pending() {

		$cars = \App\Car::with('customer')->where('pending', '=', 1)->get();


		return response()->json($cars);
	}

	public function confirmed() {

		$cars = \App\Car::with('customer')->where('appointment', '>', Carbon::now())
						->get();


						return response()->json($cars);
	}


	public function addOwner($owner) {
		
		$customer = \App\Customer::find($owner);
		$car = \App\Car::find(intval(request('car_id')));
		$customer->cars()->save($car);

			return redirect()->route('customers.edit', $owner);
	}

	public function removeOwner($owner, $car) {
		

		
		$customer = \App\Customer::find($owner);
		$car = \App\Car::find($car);

		
		$car->customer()->dissociate();
		$car->save();

			return redirect()->route('customers.edit', $owner);
	}

	public function deleted() {
		
		$cars = \App\Car::onlyTrashed()->orderBy('deleted_at', 'desc')->get();
		
			return response()->json($cars);
		
 }

}