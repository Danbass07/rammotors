import React, { Component } from 'react';
import Table from './Table';
import MiniTable from './MiniTable';
import ASSIGN_CAR_TO_THE_OWNER from './ASSIGN_CAR_TO_THE_OWNER';

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
                delete: 0,
        };
        this.compareValues = this.compareValues.bind(this);
    }

    refreshData() {
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
   
    componentWillMount() {               /// loading all resources

        this.refreshData();
    }

    //// Handlers section 
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


    sortingHandler(category, table){ // sorting alphabeticly DESC or ASC depend on clicked property (table head)

        let sortingData;

        sortingData = [...this.state[table]];

        const neworder =sortingData.sort(this.compareValues(category, this.state.ascending));

        this.setState({
            [table]: [...neworder],
            ascending: !this.state.ascending,
        })
       
    }
    
    deleteHandler(object, id){

        this.setState({ delete: this.state.delete + 1},
            () => {
                if(this.state.delete == 4) {
                    axios.get(`/${object}/${id}/destroy`).then( () => {
                        axios.get('/customers').then(response => this.setState({
                            customers: [...response.data],
                            displayCustomers: [...response.data],
                            focusOn: '',
                            focus: !this.state.focus,
                            search: '',
                            delete: 0,
                        }));
                        axios.get('/cars').then(response => this.setState({
                            cars: [...response.data],
                            displayCars: [...response.data],
                        }));
                    })
                }
            }
        )
    
        

    }
    sendSmsHandler(id) {

        axios.get(`/cars/${id}/toNexmo`).then( () => { this.refreshData() });

    }


///////////// methods depending on focus state
////////////// modal display and form to add or update
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
    displayForm(editedObject){  /// dynamic form for adding new object end editing existing one
        /// find better way to disable unwanted categories and ajusting types
        /// need to display form depend on focusOn state

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
        const inline = {
            display: 'flex',
            flexDirection: 'row',
        }

        return (

            <div className="form-wrapper">

                <form className="focus-form" onSubmit={(e) => this.submitHandler(e, editedObjectName, this.state.operation) }>
                <h2>{editedObjectName.replace('edited', '')} </h2>
                {Object.keys(editedObject).map((key) => {
                    return( 

                        <div style={inline}>
                            <label style={key==='c_car_3' || key==='c_car_1' || key==='c_car_2' || key==='cars' || key==='updated_at' || key==='created_at' || key==='deleted_at' || key==='pending' || key==='id' || key==='customer_id' ? style : null }>
                                {key}
                            </label>
                            <input 
                            key={key}
                            className="focus-form-input"
                            placeholder={key}
                            style={key==='c_car' || key==='c_car_1' || key==='c_car_2' || key==='cars' || key==='updated_at' || key==='created_at' || key==='deleted_at' || key==='pending' || key==='id' || key==='customer_id' ? style : null }
                            type={key === 'mot' || key === 'servis' || key === 'appointment' ? "date" : "text"}
                            value={key==='registration' ? this.state[editedObjectName][key].toUpperCase() : this.state[editedObjectName][key]}
                            onChange={(e) => this.formChangeHandler(e, key)}
                            />
                        </div>    
                    )
                        
                })}

                <button type="submit" className="submit-button">Save Changes</button>

                </form>
            </div>

        )
    }

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
            focus: !this.state.focus,
            operation: 'addNew',
        })
    }
    editCarHandler(data) {
        this.setState({
            editedCar: {
                ...data
            },
            tableName: 'displayCars',
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
            operation: 'update',
        })
    }

    ///// functions returns stuff need  convert to components

    displayTable(table) {  // display full version of mini tables
        return (
            <div className="focus-field">

                <Table tableName={this.state.focusOn} 
                displayData={this.state[table]} 
                sortingHandler={(category) => this.sortingHandler(category, this.state.tableName)} 
                tableNameHandler={(tableName) => this.tableNameHandler(tableName)}
                addNewButtonHandler={(item) => this.addNewButtonHandler(item)}
                searchHandler={(e) => this.searchHandler(e)}
                searchValue={this.state.search}
                editHandler={(object, objectName) => this.editHandler(object, objectName)}/>
            
            </div>

         
        )


    }
 
    chooseCar() {  // <ASSIGN_CAR_TO_THE_OWNER editedCustomer={this.props.editedCustomer}>

       return  (
        <div>
       <select className="focus-form-input" onChange={(e) => {this.setState({ optionChoice: e.target.value,})} } >
            {this.state.cars.map((car) => {
                
                if (!car.customer_id) {
              
                 return   <option key={car.id} value={car.id}>
                               {car.registration.toUpperCase()}
                         </option>
                }
            })}
           </select>
        <button onClick={(e) => this.submitHandler(e, 'editedCustomer', 'assign' )}>ASSIGN CAR TO THE OWNER </button>
        </div>   
           

       )
    }



    /// functions dealing with forms
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
    
 
    

    displayList(id) {  ///// not dynamic yet might never be

        if (this.state.tableName === 'displayCustomers') {

            return(
                <div className="list-wrapper">
                    <h1>List Of Cars</h1>
                {this.state.cars.map(car => {
                    
                return (  
                    car.customer_id === id ?
                   <div key={car.registration} className="display-list-item">
                  {car.registration.toUpperCase()}
                   <button value={car.id} onClick={(e) =>this.submitHandler(e,'editedCustomer','remove')}>
                   Remove
                   </button>
                   </div>
                   : null )})
                }
                </div>
            )
        }

        if (this.state.tableName === 'displayCars') {

            return(
                <div className="list-wrapper">
                    <h1>OWNER</h1>
                {this.state.customers.map(customer => {
                    
                return (  
                    customer.id === id ?
                   <div key={id} className="display-list-item" onClick={() => this.editHandler(customer, 'editedCustomer')}>
                    {customer.name + ' ' + customer.surname}
                   </div>
                   : null )})
                }
              
                </div>
            )
        }
        
 
    }



    displayActions(id) {  ///// not dynamic yet might never be
        
        if (this.state.tableName === 'displayCustomers') {

            return(
                <div className="list-wrapper">
                    <h1>Actions</h1>
                    { this.chooseCar()}
                    {/* <ASSIGN_CAR_TO_THE_OWNER editedCustomer={this.state.editedCustomer} cars={this.state.cars} refreshData={this.refreshData()}/> */}
                    <button className={"submit-button"+"-"+this.state.delete} onClick={() => this.deleteHandler('customers', id)}>DELLETE</button>
                </div>
            )
        }
        if (this.state.tableName === 'displayCars') {

            return(
                <div className="list-wrapper">
                <div className="focus-form" >
                    <h1>Actions</h1>
                    <button className="submit-button" onClick={ () => this.addYear(this.state.editedCar.mot, 'mot') }>Add Year MOT</button>
                    <button className="submit-button" onClick={ () => this.addYear(this.state.editedCar.servis, 'servis') }>Add Year Service</button>
                    <button className="submit-button" onClick={ () => this.addYear(this.state.editedCar.appointment, 'appointment') }>Add Year Appointment</button>
                    {this.state.alerts.map(alertedCar => {
                 
                        if   (id === alertedCar.id) {
                        
                            return (   
                            <button className="submit-button" onClick={() => this.sendSmsHandler(id)} key={id}>Send SMS</button>
                        
                            )
                        }
                    })}
                  <button className={"submit-button"+"-"+this.state.delete} onClick={() => this.deleteHandler('cars', id)}>DELETE</button>
                  </div>
                </div>
            )
        }
 
    }
   

    submitHandler(e, editedObjectName, operation='addNew'){   // submit both of above new or edit  need to update state reset search value
        
        e.preventDefault();

        if  (editedObjectName === 'editedCustomer' && operation === 'remove' ) {
            let editedCustomer = {...this.state.editedCustomer}
                    axios.post(`/customers/${editedCustomer.id}/removeCar/${e.target.value}`,
                    {}).then(response => {
                       axios.get('/customers').then(response => this.setState({
                           customers: [...response.data],
                           displayCustomers: [...response.data],
                       }));
                       axios.get('/cars').then(response => this.setState({
                           cars: [...response.data],
                           displayCars: [...response.data],
                       }));
        
                   });
        }
        if  (editedObjectName === 'editedCustomer' && operation === 'assign' ) {
           
            const editedCustomer = {...this.state.editedCustomer}
            axios.post(`/customers/${editedCustomer.id}/addCar/${this.state.optionChoice}`,
             {}).then(response => {
                axios.get('/customers').then(response => this.setState({
                    customers: [...response.data],
                    displayCustomers: [...response.data],
                }));
                axios.get('/cars').then(response => this.setState({
                    cars: [...response.data],
                    displayCars: [...response.data],
                }));
 
            });
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

 


    ////// helping fuctions 
    addYear(editedDate, editedDateName) {
        
        let date = this.stringToDate(editedDate,"YYYY-mm-dd", "-");                 
        let year = date.getFullYear()+1;
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        let day = ("0" + date.getDate()).slice(-2);
        let yearLater = year.toString() +"-"+ month.toString() +"-"+ day.toString()
        this.setState({
            editedCar: {
                ...this.state.editedCar,
                [editedDateName]: yearLater,
            }
        })
    }
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
                    sortingHandler={(category) => this.sortingHandler(category, this.state.tableName)} 
                    tableNameHandler={(tableName) => this.tableNameHandler(tableName)}
                    addNewButtonHandler={(item) => this.addNewButtonHandler(item)}
                    searchHandler={(e) => this.searchHandler(e)}
                    searchValue={this.state.search}
                    editHandler={(object, objectName) => this.editHandler(object, objectName)}/>

                </div> 
  
                <div className="rammotors-row">
                                  
                    <MiniTable tableName="displayAlerts" 
                    customers={this.state.customers}
                    displayCars={this.state.displayAlerts} 
                    sortingHandler={(category) => this.sortingHandler(category, 'displayAlerts')} 
                    editCarHandler={(car) => this.editCarHandler(car)} 
                    focusOnTableHandler={(table) => this.focusOnTableHandler(table)}/>

                    <MiniTable tableName="displayPending" 
                    customers={this.state.customers}
                    displayCars={this.state.displayPending} 
                    sortingHandler={(category) => this.sortingHandler(category, 'displayPending')} 
                    editCarHandler={(car) => this.editCarHandler(car)} 
                    focusOnTableHandler={(table) => this.focusOnTableHandler(table)}/>

                    
                    <MiniTable tableName="displayConfirmed" 
                    customers={this.state.customers}
                    displayCars={this.state.displayConfirmed} 
                    sortingHandler={(category) => this.sortingHandler(category, 'displayConfirmed')} 
                    editCarHandler={(car) => this.editCarHandler(car)} 
                    focusOnTableHandler={(table) => this.focusOnTableHandler(table)}/>

                    <MiniTable tableName="displayExpired" 
                    customers={this.state.customers}
                    displayCars={this.state.displayExpired} 
                    sortingHandler={(category) => this.sortingHandler(category, 'displayExpired')} 
                    editCarHandler={(car) => this.editCarHandler(car)} 
                    focusOnTableHandler={(table) => this.focusOnTableHandler(table)}/>
                </div>
              

        
                    
                        
            </div>
        );
    }
}


