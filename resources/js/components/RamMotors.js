import React, { Component } from 'react';

export default class RamMotors extends Component {
    constructor(props) {
        super(props);
        this.state = {
                cars: [],
                sorting: true,
        };
        this.compareValues = this.compareValues.bind(this);
    }
   
    componentWillMount() {
        
            axios.get('/cars').then(response => this.setState({
                cars: [...response.data],
            }));
               
    }
    clickHandler(category){
       const neworder =[...this.state.cars.sort(this.compareValues(category, this.state.sorting))];
       this.setState({
           cars: neworder,
           sorting: !this.state.sorting,
       })
    }
     compareValues(key, order=true) {
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
            (order == false) ? (comparison * -1) : comparison
          );
        };
      }
    render() {
        return (
            <div className="table-container">
            <table>
            <thead className='table-head'>
                <tr>
                    <th onClick={() => this.clickHandler('registration')}>REGISTRATION</th>
                    <th onClick={() => this.clickHandler('make')}>MAKE</th>
                    <th onClick={() => this.clickHandler('mot')}>MOT</th>
                    <th onClick={() => this.clickHandler('servis')}>SERVICE</th>
                    <th onClick={() => this.clickHandler('appointment')}>APPOINTMENT</th>
                </tr>
            </thead>
            <tbody>
                {this.state.cars.map(car =>
                <tr key={car.id+car.registration}>
                    <th>{car.registration}</th>
                    <th>{car.make}</th>
                    <th>{car.mot}</th>
                    <th>{car.servis}</th>
                    <th>{car.appointment}</th>
                </tr>    
                )}
                
            </tbody>
            </table>    
            </div>
        );
    }
}


