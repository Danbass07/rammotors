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
       const neworder =[...this.state.displayCars.sort(this.compareValues(category, this.state.ascending))];
       this.setState({
            displayCars: neworder,
           ascending: !this.state.ascending,
       })
       console.log(this.state.cars)
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
        console.log('compare works')
        return false;
    }    
    render() {
        return (
            <div className="wrapper">
                <div className="closing-div">X</div>
                <div className="workfield"> 
                    {this.state.modal ? this.displayModal() : null}
                    
                        <div className="header">
                            
                            <div className='header-item'>{Object.keys(this.state)[0].toUpperCase()}</div>
                        </div>
                        <div className="header">
                            <div onClick={() => this.clickHandler('registration')} className="header-item">REGISTRATION</div>
                            <div onClick={() => this.clickHandler('make')} className="header-item">TYPE</div>
                            <div onClick={() => this.clickHandler('mot')} className="header-item">MOT</div>
                            <div onClick={() => this.clickHandler('servis')} className="header-item">SERVICE</div>   
                            <div onClick={() => this.clickHandler('appointment')} className="header-item">APPOINTMENT</div>         
                        </div>
                        <div className="table-container" id="style-1">
                        
                            <table className="table-body" id="style-1">
                            
                                <thead className='table-head'>
                                    <tr>
                                        <th >REGISTRATION</th>
                                        <th >MAKE</th>
                                        <th >MOT</th>
                                        <th >SERVICE</th>
                                        <th >APPOINTMENT</th>
                                    </tr>
                                </thead>
                                
                                <tbody className="table-data"  id="style-1">
                                    {this.state.displayCars.map(car =>
                                    <tr className="table-data-row" key={car.id+car.registration} onClick={() => this.editCarHandler(car)}>
                                        <th className='table-item'>{car.registration.toUpperCase()}</th>
                                        <th className='table-item'>{car.make}</th>
                                        <th className='table-item'>{car.mot}</th>
                                        <th className='table-item'>{car.servis}</th>
                                        <th className='table-item'>{car.appointment}</th>
                                    </tr>    
                                    )}
                                    
                                </tbody>
                        
                            </table>   
                        </div>
                    <input className="search-input" onChange={(e) => this.searchHandler(e)} placeholder="Click and type to search here ..." ></input> 
                </div>
            </div>
        );
    }
}


