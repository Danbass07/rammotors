import React, { Component } from 'react';

export default class MiniTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
  
        };
    }
  

    render() {
        return ( 
            <div className="mini-wrapper">
                <div className="mini-workfield"> 
                    
                        <div className="mini-header"  >
                            
                            <div className='mini-header-item' onClick={() => this.props.focusOnTableHandler(this.props.tableName)}> {this.props.tableName.toUpperCase().replace('DISPLAY','')} </div>
                        </div>
                        <div className="mini-header">
                            <div onClick={() => this.props.sortingHandler('registration')} className="mini-header-item">REGISTRATION</div>
                            <div onClick={() => this.props.sortingHandler('make')} className="mini-header-item">MAKE</div>
                            <div onClick={() => this.props.sortingHandler('customers')} className="mini-header-item">OWNER</div>
                          
                        </div>
                        <div className="mini-table-container" id="style-1">
                        
                            <table className="mini-table-body" id="style-1">
                            
                                <thead className='mini-table-head'>
                                    <tr>
                                        <th >REGISTRATION</th>
                                        <th >MAKE</th>
                                        <th>OWNER</th>
                                     
                                    </tr>
                                </thead>
                                
                                <tbody className="mini-table-data"  id="style-1">
                                    {this.props.displayCars.map(car => {

                   
                                    
                                        

                                        return (
                                            <tr className="mini-table-data-row" key={car.id+car.registration} onClick={() => this.props.editCarHandler(car)}>
                                            <th className='mini-table-item'>{car.registration.toUpperCase()}</th>
                                            <th className='mini-table-item'>{car.make}</th>
                                            
                                            {this.props.customers.map(customer => {
                                            return (
                                            customer.id === car.customer_id ? 
                                           <th className='mini-table-item'>{customer.surname}</th> : null)})
                                            
                                            }
                                        </tr>    
                                        )
                                    }
                                    
                           
                                    )}
                                    
                                </tbody>
                        
                            </table>   
                        </div>
                </div>
            </div>

                )
        }
    }
