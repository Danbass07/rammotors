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
                    registration: '',
                    make: '',
                    mot: '',
                    servis: '',
                    appointment: '',
                },

                editedCustomer: {
                    name: '',
                    surname: '',
                    phone: '',
                    email: '',
                    notes: '',
                },

                focusOn: '',
                focus: false,
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

    tableNameHandler(tableName) {  /// synchronise actions to the right diplay table name
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

        this.setState({  ////// to simple need to know if click is from focus on type and keep focus on just change content
            focusOn: table,
            focus: !this.state.focus,
        })

    }

    addNewButtonHandler() { // simply add new depend on active table name car or customer
        this.setState({
            focusOn: '',
            focus: !this.state.focus,
        })
    }

    editCarHandler(car) {  /// set up for start need to handle cars and customers

        this.setState({
            focusOn: '',
            editedObject: {...car},
            focus: !this.state.focus,
        })
    }
 
 
 
    displayForm(editedCar){  /// form for cars needt to change to dynamic build
        return (

    <div className="form-wrapper">
         <form className="focus-form" onSubmit={(e) => this.submitHandler(e) }>


                { Object.keys(editedCar).map(function(key, index) {
                
              return(  <input 
                className="focus-form-input"
                placeholder={key}
                type="text"
                value={this.state.editedCar[editedCar[key]]}
                onChange={(e) => this.formChangeHandler(e)}
                required
                />)
                    console.log(key)
               
                })}

            


         <button 
                    type="submit" 
                    className="submit-button"

                    >
                Save Changes
                    </button>
        </form>

        {/* // <form className="focus-form" onSubmit={(e) => this.submitHandler(e) }>
        //     <input 
        //     className="focus-form-input"
        //     placeholder="registration"
        //     type="text"
        //     value={this.state.editedObject.registration}
        //     onChange={(e) => this.formChangeHandler(e)}
        //     required
        //     />
        //     <input 
        //     className="focus-form-input"
        //     placeholder="make"
        //     type="text"
        //     label="MAKE"
        //     value={this.state.editedObject.make}
        //     onChange={(e) => this.formChangeHandler(e)}
        //     required
        //     />
        //     <label className="form-label"  for="mot">MOT</label>
        //     <input 
        //     className="focus-form-input"
        //     placeholder="mot"
        //     type="date"
        //     value={this.state.editedObject.mot}
        //     onChange={(e) => this.formChangeHandler(e)}
        //     required
        //     />
        //     <label className="form-label"  for="servis">SERVIS</label>
        //     <input
        //     className="focus-form-input" 
        //     placeholder="servis"
        //     type="date"
        //     value={this.state.editedObject.servis}
        //     onChange={(e) => this.formChangeHandler(e)}
        //     required
        //     />
        //     <label className="form-label"  for="appointment">APPOINTMENT</label>
        //     <input 
        //     className="focus-form-input"
        //     placeholder="appointment"
        //     type="date"
        //     value={this.state.editedObject.appointment}
        //     onChange={(e) => this.formChangeHandler(e)}
        //     required
        //     />
        //     <button 
        //             type="submit" 
        //             className="submit-button"

        //             >
        //         Save Changes
        //             </button>
        // </form> */}
    
    </div>
       
        )
    }
    




    submitHandler(e){   // submit both of above new or edit  need to update state reset search value
        e.preventDefault();
        axios.put(`/cars/${this.state.editedObject.id}/update`, {
            registartion: this.state.editedObject.registartion,
            make: this.state.editedObject.make,
            mot: this.state.editedObject.mot,
            servis: this.state.editedObject.servis,
            appointment: this.state.editedObject.appointment,  
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

 
    focus(focusOn){
        return (
            <div className="focus">  
                <div className="closing-div" onClick={() => this.setState({focus:!this.state.focus})}>X</div>
                
                {focusOn == '' ? <div className="focus-work-area"> {() => this.displayForm(this.state.editedCar)} </div> : null}
               
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
                    editCarHandler={(car) => this.editCarHandler(car)}/>

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


