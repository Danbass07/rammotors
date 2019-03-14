import React, { Component } from 'react';
import Table from './Table';
import MiniTable from './MiniTable';

export default class RamMotors extends Component {
    constructor(props) {
        super(props);
        this.state = {

                cars: [],
                customers:[],
                pending: [],
                confirmed: [],
                expired: [],
                deleted: [],
                alerts: [],

                
                displayCars: [],
                displayCustomers: [],
                displayAlerts: [],
                displayPending: [],
                displayConfirmed: [],
                displayExpired:[],
                displayDeleted: [],
                
                tableName: 'displayCars',
                ascending: true,
                search: '',
                searchResult:[],

                editedCar: {
                    id: 0,
                    customer_id: 0,
                    registration: '',
                    make: '',
                    mot: '',
                    servis: '',
                    appointment: '',
                    info:'',
                    pending:0,
                    created_at: '',
                    updated_at: '',
                    deleted_at: '',
                },

                editedCustomer: {
                    name: '',
                    surname: '',
                    phone: '',
                    email: '',
                    notes: '',
                    cars: [],
                    info:'',
                },

                focusOn: '',
                focus: false,
                chooseCustomer: true,
                operation: '',
                optionChoice: '',
        };
        this.compareValues = this.compareValues.bind(this);
    }
   
    componentWillMount() {               /// loading all resources

            axios.get('/customers').then(response => this.setState({
                customers: [...response.data],
                displayCustomers: [...response.data],
            }));
            axios.get('/cars').then(response => this.setState({
                cars: [...response.data],
                displayCars: [...response.data],
            }));
            axios.get('/cars/alerts').then(response => this.setState({
                alerts: [...response.data],
                displayAlerts: [...response.data],
            }));
            axios.get('/cars/confirmed').then(response => this.setState({
                confirmed: [...response.data],
                displayConfirmed: [...response.data],
            }));
            axios.get('/cars/pending').then(response => this.setState({
                pending: [...response.data],
                displayPending: [...response.data],
            }));
            axios.get('/cars/get_data_expired').then(response => this.setState({
                expired: [...response.data],
                displayExpired: [...response.data],
            }));
            axios.get('/cars/deleted').then(response => this.setState({
                deleted: [...response.data],
                displayDeleted: [...response.data],
            }));
          
    }

    searchHandler(e) {          /// search or clear search value

        let filtering = this.state.tableName.toLowerCase().replace('display','');            // functions variables
        let searchResult= [];

        if (e === undefined) {          // if we change table clear search results 
            this.state[filtering].map( item => {
                searchResult.push(item); 
            })
            this.setState({
                search: '',
                [this.state.tableName]: searchResult,
            })
        } else  {  // if we fill search input 

                this.setState({
                search: e.target.value, // set search value
                }, 
                
                () => { // and imieditly perform search filter
            
            
           
                this.state[filtering].map( item => {
    
                
    
                    for (const property in item) {
                        if (item.hasOwnProperty(property) && typeof item[property] === 'string' ) {
                            
                            if    (item[property].toLowerCase().includes(this.state.search) && !searchResult.includes(item)) {
            
                                    searchResult.push(item); 
                                    
                                    
                                }
                            }
                        }
                    })

                this.setState({
                    [this.state.tableName]: searchResult,   //then update display state with same table name
                })
            })

        }
     

    }

    tableNameHandler(tableName) {  /// synchronise actions to the according display table name
        this.searchHandler(); 
        this.setState({
            tableName: tableName,
            
        })
    }


    clickHandler(category, table){ // sorting alphabeticly DESC or ASC depend on clicked property (table head)

        let sortingData;

        sortingData = [...this.state[table]];

        const neworder =sortingData.sort(this.compareValues(category, this.state.ascending));

        this.setState({
            [table]: [...neworder],
            ascending: !this.state.ascending,
        })
       
    }
    
    displayTable(table) {  // display full version of mini tables not all functions added yet!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        return (
            <div className="focus-field">

                <Table tableName={this.state.focusOn} 
                displayData={this.state[table]} 
                clickHandler={(category) => this.clickHandler(category, this.state.focusOn)} 
                editCarHandler={(car) => this.editCarHandler(car)} />
            
            </div>
         
        )


    }


///////////// methods depending on focus state
////////////// modal display and form to add or update

    focusOnTableHandler(table) { ///  focus on or off

        this.setState({  //////  need to know if click is from focus on type and keep focus on just change content
            focusOn: table,
            focus: !this.state.focus,
        })

    }

    addNewButtonHandler() { // simply add new depend on active table name car or customer
        this.setState({
            editedCar: {
                id: 0,
                customer_id: 0,
                registration: '',
                make: '',
                mot: '',
                servis: '',
                appointment: '',
                info:'',
                pending:0,
                created_at: '',
                updated_at: '',
                deleted_at: '',
            },
            focusOn: '',
            focus: !this.state.focus,
            operation: 'addNew',
        })
    }
    editCarHandler(data) {
        this.setState({
            editedCar: {...data},
            focusOn: '',
            focus: !this.state.focus,
        })
    }

    editHandler(object, objectName) {  /// 

        this.setState({
            focusOn: '',
            [objectName]: {
                ...object
            },
            focus: !this.state.focus,
        })
    }
 
    chooseCar() {

       return  (
        <form className="focus-form" onSubmit={(e) => this.submitHandler(e, 'editedCustomer', 'assign') }>
       <select className="focus-form-input" value={this.s} >
            {this.state.cars.map((car) => {
                
                if (!car.customer_id) {
              
                 return   <option onClick={
                     (e) => this.setState({optionChoice: e.target.value})
                 } key={car.id} value={car.id}>
                                {car.registration}
                         </option>
                }
            })}
           </select>
           <button 
                    type="submit" 
                    className="submit-button"

                    >
                Assign Owner
                    </button>
        </form>
       )
    }
    formChangeHandler(e, key){
        let editedObjectName = ''; 
        if(this.state.tableName == 'displayCars') {
            editedObjectName = 'editedCar'
        }
        if(this.state.tableName == 'displayCustomers') {
            editedObjectName = 'editedCustomer'
        }
        
        this.setState({
            [editedObjectName]: {
                ...this.state[editedObjectName],
                [key]: e.target.value
    
            }
        })
    }
    
    displayForm(editedObject, operation){  /// dynamic form 
        
        let editedObjectName = ''; 
        if(this.state.tableName == 'displayCars') {
            editedObjectName = 'editedCar'
        }
        if(this.state.tableName == 'displayCustomers') {
            editedObjectName = 'editedCustomer'
        }
        const style = {
            display: 'none',
        }
       
        return (

    <div className="form-wrapper">
         <form className="focus-form" onSubmit={(e) => this.submitHandler(e, editedObjectName, this.state.operation) }>


                { Object.keys(editedObject).map((key) => {
              return(  
              
              <input 
                key={key}
                className="focus-form-input"
                placeholder={key}
                style={key==='c_car' || key==='c_car_1' || key==='c_car_2' || key==='cars' || key==='updated_at' || key==='created_at' || key==='deleted_at' || key==='pending' || key==='id' || key==='customer_id' ? style : null }
                type={key === 'mot' || key === 'servis' || key === 'appointment' ? "date" : "text"}
                value={this.state[editedObjectName][key]}
                onChange={(e) => this.formChangeHandler(e, key)}
                
                />)
                    
                })}

         <button 
                    type="submit" 
                    className="submit-button"

                    >
                Save Changes
                    </button>
                   
        </form>

    
    </div>
       
        )
    }
    

    displayList(id) {  ///// not dynamic yet
        if (this.state.tableName === 'displayCustomers') {

            return(
                <div className="form-wrapper">
                    <h1>List Of Cars</h1>
                {this.state.cars.map(car => {
                    
                return (  
                    car.customer_id === id ?
                   <div key={id+car.customer_id} className="display-list-item">
                   {car.registration}
                   </div>
                   : null )})
                }
                </div>
            )
        }
        if (this.state.tableName === 'displayCars') {

            return(
                <div className="form-wrapper">
                    <h1>List Of Customers</h1>
                {this.state.customers.map(customer => {
                    
                return (  
                    customer.id === id ?
                   <div key={id} className="display-list-item">
                   {customer.name+ ' '+customer.surname}
                   </div>
                   : null )})
                }
              
                </div>
            )
        }
        
 
    }
    addYear(editedDate, editedDateName) {
        var date = this.stringToDate(editedDate,"YYYY-mm-dd", "-");
                            
                            
        var year = date.getFullYear()+1;
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var day = ("0" + date.getDate()).slice(-2);
        var c = year.toString() +"-"+ month.toString() +"-"+ day.toString()
        this.setState({
            editedCar: {
                ...this.state.editedCar,
                [editedDateName]: c,
            }
        })
    }
    displayActions(id) {  ///// not dynamic yet
        
        if (this.state.tableName === 'displayCustomers') {

            return(
                <div className="form-wrapper">
                    <h1>Actions</h1>
                    { this.chooseCar() }
                    <button>DELETE</button>
                </div>
            )
        }
        if (this.state.tableName === 'displayCars') {

            return(
                <div className="form-wrapper">
                    <h1>Actions</h1>
                    <button  onClick={ () => this.addYear(this.state.editedCar.mot, 'mot') }>Add Year MOT</button>
                    <button  onClick={ () => this.addYear(this.state.editedCar.servis, 'servis') }>Add Year Service</button>
                    <button  onClick={ () => this.addYear(this.state.editedCar.appointment, 'appointment') }>Add Year Appointment</button>
                    {this.state.alerts.map(alertedCar => {
                 
                        if   (id === alertedCar.id) {
                        
                            return (   
                            <button key={id}>Send SMS</button>
                        
                            )
                        }
                    })}
                  <button>DELETE</button>
                </div>
            )
        }
 
    }
   

    submitHandler(e, editedObjectName, operation='addNew'){   // submit both of above new or edit  need to update state reset search value
        e.preventDefault();
        if  (editedObjectName === 'editedCustomer' && operation === 'assign' ) {
            const editedCustomer = {...this.state.editedCustomer}
            console.log(editedCustomer.id)
            console.log(this.state.optionChoice)
        }
        if (editedObjectName === 'editedCar' && operation === 'addNew' ) {
            const editedCar = {...this.state.editedCar}
            axios.post(`/cars`, {
                registration: editedCar.registration,
                make: editedCar.make,
                mot: editedCar.mot,
                servis: editedCar.servis,
                appointment: editedCar.appointment,  
            }).then(response => {
                axios.get('/cars').then(response => this.setState({
                    cars: [...response.data],
                    displayCars: [...response.data],
                }));
                axios.get('/cars/alerts').then(response => this.setState({
                    alerts: [...response.data],
                    displayAlerts: [...response.data],
                }));
                axios.get('/cars/confirmed').then(response => this.setState({
                    confirmed: [...response.data],
                    displayConfirmed: [...response.data],
                }));
                axios.get('/cars/pending').then(response => this.setState({
                    pending: [...response.data],
                    displayPending: [...response.data],
                }));
                axios.get('/cars/get_data_expired').then(response => this.setState({
                    expired: [...response.data],
                    displayExpired: [...response.data],
                }));
                this.setState({
                    focusOn: '',
                    focus: !this.state.focus,
                    search: '',
                })
            });

        }
      else if (editedObjectName === 'editedCar' && operation === 'update' ) {
        const editedCar = {...this.state.editedCar}
            axios.put(`/cars/${editedCar.id}/update`, {
                make: editedCar.make,
                mot: editedCar.mot,
                servis: editedCar.servis,
                appointment: editedCar.appointment,
                info: editedCar.info,  
            }).then(response => {
                axios.get('/cars').then(response => this.setState({
                    cars: [...response.data],
                    displayCars: [...response.data],
                }));
                axios.get('/cars/alerts').then(response => this.setState({
                    alerts: [...response.data],
                    displayAlerts: [...response.data],
                }));
                axios.get('/cars/confirmed').then(response => this.setState({
                    confirmed: [...response.data],
                    displayConfirmed: [...response.data],
                }));
                axios.get('/cars/pending').then(response => this.setState({
                    pending: [...response.data],
                    displayPending: [...response.data],
                }));
                axios.get('/cars/get_data_expired').then(response => this.setState({
                    expired: [...response.data],
                    displayExpired: [...response.data],
                }));
                this.setState({
                    focusOn: '',
                    focus: !this.state.focus,
                    search: '',
                })
            });
        } else if (editedObjectName === 'editedCustomer'  && operation === 'addNew' ){
         
            const editedCustomer = {...this.state.editedCustomer}
            
            axios.post(`/customers`, {
                name: editedCustomer.name,
                surname: editedCustomer.surname,
                phone: editedCustomer.phone,
                email: editedCustomer.email,
            }).then(response => {
                axios.get('/customers').then(response => this.setState({
                    customers: [...response.data],
                    displayCustomers: [...response.data],
                }));
 
                this.setState({
                    focusOn: '',
                    focus: !this.state.focus,
                    search: '',
                })
            });
        }  else if (editedObjectName === 'editedCustomer'  && operation === 'update' ){
      
            const editedCustomer = {...this.state.editedCustomer}
            
            axios.put(`/customers/${editedCustomer.id}/update`, {
                name: editedCustomer.name,
                surname: editedCustomer.surname,
                phone: editedCustomer.phone,
                email: editedCustomer.email,
            }).then(response => {
                axios.get('/customers').then(response => this.setState({
                    customers: [...response.data],
                    displayCustomers: [...response.data],
                }));
 
                this.setState({
                    focusOn: '',
                    focus: !this.state.focus,
                    search: '',
                })
            });
        } else {
            return
        }
    }

 
    focus(focusOn){
        return (
            <div className="focus">  
                <div className="closing-div" onClick={() => this.setState({focus:!this.state.focus})}>X</div>
                
                {focusOn == '' && this.state.tableName == 'displayCars' ? <div className="focus-work-area"> 
                    {this.displayForm(this.state.editedCar, 'update')}
                    {this.displayActions(this.state.editedCar.id)}
                    {this.displayList(this.state.editedCar.customer_id)} </div> : null }

                {focusOn == '' && this.state.tableName == 'displayCustomers' ? <div className="focus-work-area"> 
                    {this.displayForm(this.state.editedCustomer, 'update')}
                    {this.displayActions(this.state.editedCustomer.id)}
                    {this.displayList(this.state.editedCustomer.id)} </div> : null }
                                      
                {focusOn !== '' ? this.displayTable(this.state.focusOn) : null}

            </div>
        )
    }


    ////// helping fuctions 

    compareValues(key, ascending=true) {   /// sorting 
        return function(a, b) {
          if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
              return 0; 
          }
      
          const varA = (typeof a[key] === 'string') ?   /// letter case insensitive
            a[key].toUpperCase() : a[key];
          const varB = (typeof b[key] === 'string') ? 
            b[key].toUpperCase() : b[key];
      
          let comparison = 0;
          if (varA > varB) {
            comparison = 1;
          } else if (varA < varB) {
            comparison = -1;
          }
          return (
            (ascending == false) ? (comparison * -1) : comparison
          );
        };
    }

    contains(a, obj) {  /// that was firt method i found I could use indexof but maybe later
        for (var i = 0; i < a.length; i++) {
          
            if (a[i].id === obj.id) {
              
                return true;
            }
        }
        return false;
    } 
    stringToDate(_date,_format,_delimiter)
{
            var formatLowerCase=_format.toLowerCase();
            var formatItems=formatLowerCase.split(_delimiter);
            var dateItems=_date.split(_delimiter);
            var monthIndex=formatItems.indexOf("mm");
            var dayIndex=formatItems.indexOf("dd");
            var yearIndex=formatItems.indexOf("yyyy");
            var month=parseInt(dateItems[monthIndex]);
            month-=1;
            var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
            return formatedDate;
} 

    render() { 
        return (
            <div className="rammotors">

                {this.state.focus ? this.focus(this.state.focusOn) : null}

                <div className="rammotors-row">

                    <Table tableName={this.state.tableName} 
                    displayData={this.state[this.state.tableName]} 
                    clickHandler={(category) => this.clickHandler(category, this.state.tableName)} 
                    tableNameHandler={(tableName) => this.tableNameHandler(tableName)}
                    addNewButtonHandler={(item) => this.addNewButtonHandler(item)}
                    searchHandler={(e) => this.searchHandler(e)}
                    searchValue={this.state.search}
                    editHandler={(object, objectName) => this.editHandler(object, objectName)}/>

                </div> 
  
                <div className="rammotors-row">
                                  
                    <MiniTable tableName="displayAlerts" 
                    displayCars={this.state.displayAlerts} 
                    clickHandler={(category) => this.clickHandler(category, 'displayAlerts')} 
                    editCarHandler={(car) => this.editCarHandler(car)} 
                    focusOnTableHandler={(table) => this.focusOnTableHandler(table)}/>

                    <MiniTable tableName="displayPending" 
                    displayCars={this.state.displayPending} 
                    clickHandler={(category) => this.clickHandler(category, 'displayPending')} 
                    editCarHandler={(car) => this.editCarHandler(car)} 
                    focusOnTableHandler={(table) => this.focusOnTableHandler(table)}/>

                    
                    <MiniTable tableName="displayConfirmed" 
                    displayCars={this.state.displayConfirmed} 
                    clickHandler={(category) => this.clickHandler(category, 'displayConfirmed')} 
                    editCarHandler={(car) => this.editCarHandler(car)} 
                    focusOnTableHandler={(table) => this.focusOnTableHandler(table)}/>

                    <MiniTable tableName="displayExpired" 
                    displayCars={this.state.displayExpired} 
                    clickHandler={(category) => this.clickHandler(category, 'displayExpired')} 
                    editCarHandler={(car) => this.editCarHandler(car)} 
                    focusOnTableHandler={(table) => this.focusOnTableHandler(table)}/>
                </div>
              

        
                    
                        
            </div>
        );
    }
}


