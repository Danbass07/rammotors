import React, { Component } from 'react';
import Table from './Table';

export default class RamMotors extends Component {
    constructor(props) {
        super(props);
        this.state = {
                cars: [],
                ascending: true,
                displayCars: [],
                displayAlerts: [],
                editedObject: {},
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
    }
    clickHandler(category, table){
        let sortingData;
        if (table === 'displayCars') {
            sortingData = [...this.state.displayCars];
        }
        if (table === 'displayAlerts') {
            sortingData = [...this.state.displayAlerts];
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
        console.log(typeof(car));

        this.setState({
            editedObject: {...car},
            focus: !this.state.focus,
        })
    }
    formChangeHandler(e) {
        console.log(typeof(this.state.editedObject));
        let editedObject = {...this.state.editedObject};
        editedObject[e.target.placeholder] = e.target.value;
        this.setState({
            editedObject: editedObject,
        }) 
    }
    submitHandler(e){
        e.preventDefault();
      
        axios.put(`/cars/${this.state.editedObject.id}`, {
            registartion: this.state.name,
            make: this.state.type,
            mot: this.state.url,
            servis: this.state.wins,
            appointment: this.state.lost,  
        }).then(response => {
           this.props.history.push('/home');
        });
    }
    
    focus(){
        return (
            <div className="focus">
                <div className="focus-field">    
                    <h1 onClick={() => this.setState({focus:!this.state.focus})}> CLOSE</h1>
                    <form onSubmit={(e) => this.submitHandler(e) }>
                        <input 
                        placeholder="registration"
                        value={this.state.editedObject.registration}
                        onChange={(e) => this.formChangeHandler(e)}
                        required
                        />
                         <input 
                        placeholder="make"
                        value={this.state.editedObject.make}
                        onChange={(e) => this.formChangeHandler(e)}
                        required
                        />
                           <input 
                        placeholder="mot"
                        value={this.state.editedObject.mot}
                        onChange={(e) => this.formChangeHandler(e)}
                        required
                        />
                         <input 
                        placeholder="servis"
                        value={this.state.editedObject.servis}
                        onChange={(e) => this.formChangeHandler(e)}
                        required
                        />
                         <input 
                        placeholder="appointment"
                        value={this.state.editedObject.appointment}
                        onChange={(e) => this.formChangeHandler(e)}
                        required
                        />
                         <button 
                                type="submit" 
                                className="btn btn-primary"

                                >
                              Save Changes
                                </button>
                    </form>
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
            {this.state.focus ? this.focus() : null}
            <Table tableName="cars" displayCars={this.state.displayCars} clickHandler={(category) => this.clickHandler(category, 'displayCars')} editCarHandler={(car) => this.editCarHandler(car)} />
            <Table tableName="alerts" 
            displayCars={this.state.displayAlerts} 
            clickHandler={(category) => this.clickHandler(category, 'displayAlerts')} 
            editCarHandler={(car) => this.editCarHandler(car)} />
               
                
            </div>
        );
    }
}


