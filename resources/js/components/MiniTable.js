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
                <div className="closing-div">X</div>
                <div className="mini-workfield"> 
                    
                        <div className="mini-header">
                            
                            <div className='mini-header-item'>{this.props.tableName.toUpperCase()}</div>
                        </div>
                        <div className="mini-header">
                            <div onClick={() => this.props.clickHandler('registration')} className="mini-header-item">REGISTRATION</div>
                            <div onClick={() => this.props.clickHandler('make')} className="mini-header-item">Make</div>
                          
                        </div>
                        <div className="mini-table-container" id="style-1">
                        
                            <table className="mini-table-body" id="style-1">
                            
                                <thead className='mini-table-head'>
                                    <tr>
                                        <th >REGISTRATION</th>
                                        <th >MAKE</th>
                                     
                                    </tr>
                                </thead>
                                
                                <tbody className="mini-table-data"  id="style-1">
                                    {this.props.displayCars.map(car =>
                                    
                                    <tr className="mini-table-data-row" key={car.id+car.registration} onClick={() => this.props.editCarHandler(car)}>
                                        <th className='mini-table-item'>{car.registration.toUpperCase()}</th>
                                        <th className='mini-table-item'>{car.make}</th>
                                
                                        
                                    </tr>    
                                    )}
                                    
                                </tbody>
                        
                            </table>   
                        </div>
                </div>
            </div>

                )
        }
    }
