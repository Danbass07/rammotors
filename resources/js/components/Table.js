import React, { Component } from 'react';

export default class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
  
        };
    }

    render() {
        return ( 
            <div className="wrapper">
                <div className="closing-div">X</div>
                <div className="workfield"> 
                    
                        <div className="header">
                            
                            <div className='header-item'>{this.props.tableName.toUpperCase()}</div>
                        </div>
                        <div className="header">
                            <div onClick={() => this.props.clickHandler('registration')} className="header-item">REGISTRATION</div>
                            <div onClick={() => this.props.clickHandler('make')} className="header-item">TYPE</div>
                            <div onClick={() => this.props.clickHandler('mot')} className="header-item">MOT</div>
                            <div onClick={() => this.props.clickHandler('servis')} className="header-item">SERVICE</div>   
                            <div onClick={() => this.props.clickHandler('appointment')} className="header-item">APPOINTMENT</div>         
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
                                    {this.props.displayCars.map(car =>
                                    
                                    <tr className="table-data-row" key={car.id+car.registration} onClick={() => this.props.editCarHandler(car)}>
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
                    <input className="search-input" onChange={(e) => this.props.searchHandler(e)} placeholder="Click and type to search here ..." ></input> 
                </div>
            </div>

                )
        }
    }
