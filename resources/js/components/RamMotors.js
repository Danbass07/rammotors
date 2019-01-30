import React, { Component } from 'react';

export default class RamMotors extends Component {
    constructor(props) {
        super(props);
        this.state = {
                cars: [],
                ascending: true,
                displayCars: [],
                editedcar: {},
                modal: false,
        };
        this.compareValues = this.compareValues.bind(this);
    }
   
    componentWillMount() {
        
            axios.get('/cars').then(response => this.setState({
                cars: [...response.data],
                displayCars: [...response.data],
            }));
               
    }
    clickHandler(category){
       const neworder =[...this.state.cars.sort(this.compareValues(category, this.state.ascending))];
       this.setState({
           cars: neworder,
           sorting: !this.state.sorting,
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
            editedcar: car,
            modal: !this.state.modal,
        })
        console.log(this.state.editedcar)
    }
    
    displayModal(){
        return (
            <div className="modal">

                 
            <h1 onClick={() => this.editCarHandler({})}> hello</h1>

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
        <div>
            {this.state.modal ? this.displayModal() : null}
            <div className="table-container" id="style-1">
            
            <table className="table-body" id="style-1">
            <thead className='table-head'>
                <tr>
                    <th onClick={() => this.clickHandler('registration')}>REGISTRATION</th>
                    <th onClick={() => this.clickHandler('make')}>MAKE</th>
                    <th onClick={() => this.clickHandler('mot')}>MOT</th>
                    <th onClick={() => this.clickHandler('servis')}>SERVICE</th>
                    <th onClick={() => this.clickHandler('appointment')}>APPOINTMENT</th>
                </tr>
            </thead>
            <tbody className="table-data"  id="style-1">
                {this.state.displayCars.map(car =>
                <tr className="table-data-row" key={car.id+car.registration} onClick={() => this.editCarHandler(car)}>
                    <th className='table-registration'>{car.registration.toUpperCase()}</th>
                    <th>{car.make}</th>
                    <th>{car.mot}</th>
                    <th>{car.servis}</th>
                    <th>{car.appointment}</th>
                </tr>    
                )}
                
            </tbody>
           
            </table>   
            <input className="search-input" onChange={(e) => this.searchHandler(e)}></input> 
            </div>
        </div>
        );
    }
}


