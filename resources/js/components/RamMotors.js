import React, { Component } from 'react';
import Table from './Table';
import MiniTable from './MiniTable';

export default class RamMotors extends Component {
    constructor(props) {
        super(props);
        this.state = {
                cars: [],
                ascending: true,
                displayCars: [],
                displayAlerts: [],
                pending: [],
                displayPending: [],
                confirmed: [],
                displayConfirmed: [],
                expired: [],
                displayExpired:[],
                editedObject: {},
                focusOn: '',
                focus: false,
        };
        this.compareValues = this.compareValues.bind(this);
    }
   
    componentWillMount() {
        
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
          
    }

    clickHandler(category, table){
        let sortingData;
        if (table === 'displayCars') {
            sortingData = [...this.state.displayCars];
        }
        if (table === 'displayAlerts') {
            sortingData = [...this.state.displayAlerts];
        }
        if (table === 'displayConfirmed') {
            sortingData = [...this.state.displayConfirmed];
        }
        if (table === 'displayPending') {
            sortingData = [...this.state.displayPending];
        }
        if (table === 'displayExpired') {
            sortingData = [...this.state.displayExpired];
        }
        
       const neworder =sortingData.sort(this.compareValues(category, this.state.ascending));
       
       this.setState({
            [table]: [...neworder],
           ascending: !this.state.ascending,
       })
       
    }
  
    searchHandler(e) {
        const target = e.target.value.toLowerCase()
        const searchResult = []
         this.state.cars.map( car => {
            
          if (  car.registration.toLowerCase().includes(target) ||
          car.make.toLowerCase().includes(target) ||
          car.mot.toLowerCase().includes(target) ||
          car.servis.toLowerCase().includes(target) ||
          car.appointment.toLowerCase().includes(target)
          
          ) {
            
            searchResult.push(car);
                
            }})
        this.setState({
            displayCars: [...searchResult],
            })
    }

    editCarHandler(car) {

        this.setState({
            focusOn: '',
            editedObject: {...car},
            focus: !this.state.focus,
        })
    }

    displayTable(table) {
        return (
            <Table tableName={this.state.focusOn} 
            displayCars={this.state[table]} 
            clickHandler={(category) => this.clickHandler(category, this.state.focusOn)} 
            editCarHandler={(car) => this.editCarHandler(car)} />
        )
    }

    focusOnTableHandler(table) {

        this.setState({
            focusOn: table,
            focus: !this.state.focus,
        })
    
    }

    formChangeHandler(e) {
        let editedObject = {...this.state.editedObject};
        editedObject[e.target.placeholder] = e.target.value;
        this.setState({
            editedObject: editedObject,
        }) 
    }

    submitHandler(e){
        e.preventDefault();
      console.log(this.state.editedObject.mot);
        axios.put(`/cars/${this.state.editedObject.id}/update`, {
            registartion: this.state.editedObject.registartion,
            make: this.state.editedObject.make,
            mot: this.state.editedObject.mot,
            servis: this.state.editedObject.servis,
            appointment: this.state.editedObject.appointment,  
        }).then(response => {
           console.log(response);
        });
    }

    displayForm(){
        return (
        <form className="focus-form" onSubmit={(e) => this.submitHandler(e) }>
        <input 
        className="focus-form-input"
        placeholder="registration"
        type="text"
        value={this.state.editedObject.registration}
        onChange={(e) => this.formChangeHandler(e)}
        required
        />
         <input 
         className="focus-form-input"
        placeholder="make"
        type="text"
        value={this.state.editedObject.make}
        onChange={(e) => this.formChangeHandler(e)}
        required
        />
        <input 
        className="focus-form-input"
        placeholder="mot"
        type="date"
        value={this.state.editedObject.mot}
        onChange={(e) => this.formChangeHandler(e)}
        required
        />
        <input
        className="focus-form-input" 
        placeholder="servis"
        type="date"
        value={this.state.editedObject.servis}
        onChange={(e) => this.formChangeHandler(e)}
        required
        />
        <input 
        className="focus-form-input"
        placeholder="appointment"
        type="date"
        value={this.state.editedObject.appointment}
        onChange={(e) => this.formChangeHandler(e)}
        required
        />
         <button 
                type="submit" 
                className="submit-button"

                >
              Save Changes
                </button>
    </form>
        )
    }
    
    focus(focusOn){
        return (
            <div className="focus">
                <div className="focus-field">    
                <div className="closing-div" onClick={() => this.setState({focus:!this.state.focus})}>X</div>
                {focusOn == '' ? this.displayForm() : null}
                {focusOn !== '' ? this.displayTable(this.state.focusOn) : null}
                </div>
            </div>
        )
    }

    compareValues(key, ascending=true) {
        return function(a, b) {
          if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
              return 0; 
          }
      
          const varA = (typeof a[key] === 'string') ? 
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

    contains(a, obj) {
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
                <div className="rammotors-row">

                 <Table tableName="cars" 
                    displayCars={this.state.displayCars} 
                    clickHandler={(category) => this.clickHandler(category, 'displayCars')} 
                    editCarHandler={(car) => this.editCarHandler(car)} />

                </div>
                   

        
                    
                        
            </div>
        );
    }
}


