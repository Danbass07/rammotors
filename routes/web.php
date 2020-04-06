<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('home');
});

Auth::routes();


	// Cars Controllers

Route::get('/cars', 'CarsController@index');
Route::get('/cars/dashboard', 'CarsController@dashboard')->name('cars.dashboard');
Route::get('/cars/alerts', 'CarsController@alerts')->name('cars.alerts');
Route::get('/cars/create', 'CarsController@create')->name('cars.create');
Route::get('/cars/pending', 'CarsController@pending')->name('cars.pending');
Route::get('/cars/pendingExpired', 'CarsController@pendingExpired')->name('cars.pendingExpired');
Route::get('/cars/confirmed', 'CarsController@confirmed')->name('cars.confirmed');
Route::get('/cars/{id}/edit', 'CarsController@edit')->name('cars.edit');
Route::get('/cars/{id}/destroy', 'CarsController@destroy')->name('cars.destroy');
Route::get('/cars/{id}/undestroy', 'CarsController@undestroy')->name('cars.undestroy');
Route::get('/cars/deleted', 'CarsController@deleted')->name('cars.deleted');
Route::get('/cars/{id}/toNexmo', 'CarsController@toNexmo')->name('cars.toNexmo');
Route::get('/cars/{id}/toNexmoAlert', 'CarsController@toNexmoAlert')->name('cars.toNexmoAlert');
Route::post('/cars', 'CarsController@store')->name('cars.store');
Route::put('/cars/{id}/update', 'CarsController@update')->name('cars.update');
Route::get('/cars/{id}/updateayear/{type}', 'CarsController@updateayear')->name('cars.updateayear');
Route::get('/get_datatables', 'CarsController@get_datatables')->name('get_datatables');
Route::get('cars/get_data_expired', 'CarsController@get_data_expired')->name('cars.get_data_expired');


	// Customers Controllers

Route::get('/customers', 'CustomersController@index')->name('customers.index');
Route::get('/customers/alerts', 'CustomersController@alerts')->name('customers.alerts');
Route::get('/customers/create', 'CustomersController@create')->name('customers.create');
Route::get('/customers/{id}/edit', 'CustomersController@edit')->name('customers.edit');
Route::get('/customers/{id}/destroy', 'CustomersController@destroy')->name('customers.destroy');
Route::post('/customers', 'CustomersController@store')->name('cars.store');
Route::put('/customers/{id}/update', 'CustomersController@update')->name('customers.update');
Route::put('/customers/{id}/addCar/{cid}', 'CustomersController@addCar')->name('customers.addCar');
Route::put('/customers/{id}/removeCar/{cid}', 'CustomersController@removeCar')->name('customers.removeCar');
Route::get('/get_customers_datatables', 'CustomersController@get_customers_datatables')->name('get_customers_datatables');	
Route::get('/customers/{id}/sendMessage/{messageindex}/carId/{carid}', 'CustomersController@sendMessage')->name('customers.sendMessage');
		
Route::get('/messages', 'MessagesController@index')->name('messages.index');
Route::put('/messages/{id}/update', 'MessagesController@update')->name('messages.update');

// // Authentication routes...
// Route::get('auth/login', 'Front@login');
// Route::post('auth/login', 'Front@authenticate');
// Route::get('auth/logout', 'Front@logout');

// // Registration routes...
// Route::post('/register', 'Front@register');
		
// Route::get('/checkout', [
//     'middleware' => 'auth',
//     'uses' => 'Front@checkout'
// ]);






Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
