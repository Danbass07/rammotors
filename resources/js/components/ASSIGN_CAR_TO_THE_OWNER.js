import React, { Component } from 'react';

export default class ASSIGN_CAR_TO_THE_OWNER extends Component {
    constructor(props) {
        super(props);
        this.state = {
            optionChoice: '',
        };
    }

    submitHandler(e, editedCustomer){   // submit both of above new or edit  need to update state reset search value
        
        e.preventDefault();
    
        axios.post(`/customers/${editedCustomer.id}/addCar/${this.state.optionChoice}`,
         {}).then(response => {

          
        

        });
    }


    render() {
        return (
        <div>
        <select className="focus-form-input" onChange={(e) => {this.setState({ optionChoice: e.target.value,})} } >
             {this.props.cars.map((car) => {
                 
                 if (!car.customer_id) {
               
                  return   <option key={car.id} value={car.id}>
                                 {car.registration}
                          </option>
                 }
             })}
            </select>
         <button onClick={(e) => this.submitHandler(e, this.props.editedCustomer )}>ASSIGN CAR TO THE OWNER </button>
         </div>   )
    }
}
