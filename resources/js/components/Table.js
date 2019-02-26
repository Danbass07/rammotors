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
                {/* <div className="closing-div">X</div> */}
                <div className="workfield"> 
                    
                        <div className="header">
                            
                            <div className='header-item' onClick={() => this.props.tableNameHandler(this.props.tableName)}>{this.props.tableName.toUpperCase()}</div>
                        </div>
                        {this.props.tableName === "customers"? 
                        <div className="header">
                            <div onClick={() => this.props.clickHandler('name')} className="header-item">NAME</div>
                            <div onClick={() => this.props.clickHandler('surname')} className="header-item">SURNAME</div>
                            <div onClick={() => this.props.clickHandler('phone')} className="header-item">PHONE</div>
                            <div onClick={() => this.props.clickHandler('email')} className="header-item">EMAIL</div>   
                            <div onClick={() => this.props.clickHandler('notes')} className="header-item">NOTES</div>         
                        </div>
                        :
                        <div className="header">
                            <div onClick={() => this.props.clickHandler('registration')} className="header-item">REGISTRATION</div>
                            <div onClick={() => this.props.clickHandler('make')} className="header-item">TYPE</div>
                            <div onClick={() => this.props.clickHandler('mot')} className="header-item">MOT</div>
                            <div onClick={() => this.props.clickHandler('servis')} className="header-item">SERVICE</div>   
                            <div onClick={() => this.props.clickHandler('appointment')} className="header-item">APPOINTMENT</div>         
                        </div>
                        }
                        <div className="table-container" id="style-1">
                        
                            <table className="table-body" id="style-1">
                            
                                {this.props.tableName === "customers"? 
                                <thead className='table-head'>
                                <tr>
                                    <th >NAME</th>
                                    <th >SURNAME</th>
                                    <th >PHONE</th>
                                    <th >EMAIL</th>
                                    <th >NOTES</th>
                                </tr>
                            </thead>


                                : <thead className='table-head'>
                                    <tr>
                                        <th >REGISTRATION</th>
                                        <th >MAKE</th>
                                        <th >MOT</th>
                                        <th >SERVICE</th>
                                        <th >APPOINTMENT</th>
                                    </tr>
                                    </thead> }
                                {this.props.tableName === 'customers' ?
                                <tbody className="table-data"  id="style-1">
                                    {this.props.displayData.map((data) => 
                                             <tr className="table-data-row" key={data[Object.keys(data)[0]]} onClick={() => this.props.editCusomerHandler(data)}>
                                             <th className='table-item'>{data[Object.keys(data)[1]].toUpperCase()}</th>
                                             <th className='table-item'>{data[Object.keys(data)[2]]}</th>
                                             <th className='table-item'>{data[Object.keys(data)[3]]}</th>
                                             <th className='table-item'>{data[Object.keys(data)[4]]}</th>
                                             <th className='table-item'>{data[Object.keys(data)[5]]}</th>
                    
                        
                                        
                                    </tr>    
                                    )}
                                    
                                </tbody> : 
                                     <tbody className="table-data"  id="style-1">
                                     {this.props.displayData.map((data) => 
                                     
                                     <tr className="table-data-row" key={data[Object.keys(data)[0]]} onClick={() => this.props.editCarHandler(data)}>
                                     <th className='table-item'>{data[Object.keys(data)[2]].toUpperCase()}</th>
                                     <th className='table-item'>{data[Object.keys(data)[3]]}</th>
                                     <th className='table-item'>{data[Object.keys(data)[4]]}</th>
                                     <th className='table-item'>{data[Object.keys(data)[5]]}</th>
                                     <th className='table-item'>{data[Object.keys(data)[6]]}</th>
                         
                                         
                                     </tr>    
                                     )}
                                     
                                 </tbody>
                                }
                        
                            </table>   
                        </div>
                    <div className="search-add-fild">
                        <input className="search-input" onChange={(e) => this.props.searchHandler(e)} placeholder="Click and type to search here ..." ></input> 
                        <button className="add-new-button" onClick={() => this.props.addNewButtonHandler(this.props.tableName)}>
                        ADD NEW {this.props.TableName}
                        </button>
                    </div>

                </div>
            </div>

                )
        }
    }
