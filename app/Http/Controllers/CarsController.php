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

   
    public function get_datatables() {
    	
    	// $cars = Car::select(['id','make','registration','mot','servis','appointment','info',])
    	// ->get();
	 	
     //    return Datatables::of($cars)->toJson();

	    	return datatables()->of(Car::query())
		    	 	->addColumn('action', function ($car) {

		                return '<a href="/cars/'.$car->id.'/edit" class="btn btn-xs btn-primary"><i class="glyphicon glyphicon-edit"></i> Edit</a>';
		           		 })

		    	 	->editColumn('Id', 'ID: {{$id}}')
		            ->toJson();
	    	
    }

	public function get_data_expired() {
    	
    		return  datatables()->of(Car::query()->where('mot', '<', Carbon::now()))
			    	->addColumn('action', function ($car) {

			                return '<a href="'.$car->id.'/destroy" class="btn btn-xs btn-primary"><i class="glyphicon glyphicon-remove"></i> DELETE</a>';
			            })

			        ->editColumn('Id', 'ID: {{$id}}')
			    	->toJson();
    	
    }

    public function get_data_next30days() {

	    	return  datatables()->of(Car::query()->where('mot', '<', Carbon::now()))
			    	->addColumn('action', function ($car) {
			               
			                return '<a href="'.$car->id.'/destroy" class="btn btn-xs btn-primary"><i class="glyphicon glyphicon-remove"></i> DELETE</a>';
			            })

			        ->editColumn('Id', 'ID: {{$id}}')
			    	->toJson();

    	
    	
    }

    public function index() {
			$cars = Car::all();
    		return response()->json($cars);

    }

	public function create() {
		
		$now=date("Y-m-j");

			return view('cars.create')->withNow($now);

	 }

	public function alerts() {
		
           
		
		
		$carsmotcoming = \App\Car::where('mot', '<', Carbon::now()->addWeeks(4))
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




	public function store()	{
			

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

			

			return redirect('/cars')
                        ->with('message','car has been added');
	}

		
	public function edit($id) {

		$customers = \App\Customer::all();	
		$car = \App\Car::findOrfail($id); 
		
			return View('cars.edit')->withCar($car)->withCustomers($customers);
	}

	public function update($id)	{
		

		
		$this->validate(request(), [
        
        'make' => 'required',
        'mot' => 'required',
        'servis' => 'required',
        
    ]);
		
     		
		$car = Car::findOrfail($id);
		$car->make = request('make');
		$car->mot = request('mot');
		$car->servis = request('servis');
		$car->appointment = request('appointment');
		
			if ($car->appointment > Carbon::now()) {
				
				$car->pending = 0;
		}

		$car->info = request('info');
		$car->save();

		
			return redirect()->route('cars.edit', $id)
                        ->with('message','car has been updated');
	
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
		
		\App\Car::destroy($id);
		
			return redirect('cars/dashboard');
		
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

			// $nexmo->message()->send([
	
		    // 'to'   => '447794338771',
		    // 'from' => "NEXMO",
		    // 'text' => 'Sms sent to :  '.$customer->name.' '.$customer->surname.', '.$car->make.', '.strtoupper($car->registration).'.  MOT '.$car->mot.'.  Serv '.$car->servis. ' 0'.$customer->phone.' '.$customer->info.'',


			// ]);
		

		$car->pending = 1;
		$car->save();
			 
			return redirect('cars/alerts');
	}

	public function dashboard() {

		$cars = \App\Car::where('mot', '<', Carbon::now())
						->orWhere('mot', '<', Carbon::now())
						->get();


			return view('cars/dashboard')->withCars($cars);;
	}

	public function pending() {

		$cars = \App\Car::where('pending', '=', 1)->get();


			return view('cars/pending')->withCars($cars);
	}

	public function confirmed() {

		$cars = \App\Car::where('appointment', '>', Carbon::now())
						->get();


			return view('cars/confirmed')->withCars($cars);
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
		
			return View('cars/deleted')->withCars($cars);
		
 }

}