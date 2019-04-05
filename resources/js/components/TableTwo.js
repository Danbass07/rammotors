import React, { Component } from "react";

export default class TableTwo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayCars: [],
            displayCustomers: [],
            displayAlerts: [],
            displayData: [],
            header: [
                 {
                    registration: "",
                    make: "",
                    mot: "",
                    servis: "",
                    appointment: "",
                    info: "",
            
                },
                {
                    name: "",
                    surname: "",
                    phone: "",
                    email: "",
                    info: ""
                },
                {
                    registration: "",
                    make: "",
                    mot: "",
                    servis: "",
                    appointment: "",
                    info: "",
            
                },
            ],
            tableNumber: 2,
          
        };
    }
    componentWillMount() {
        this.setState({
            displayCars: [...this.props.displayDataArray[0]],
            displayCustomers: [...this.props.displayDataArray[1]],
            displayAlerts: [...this.props.displayDataArray[2]],
            displayData: [ ...this.props.displayData ],
        })
    }

    render() {
        // console.log(this.state)
        return (
            <div className="wrapper">
                <div className="workfield">
                    <div className="header-row">
                        {this.state.tableNumber !== '' ? (
                            <div>
                                 <button
                                    className={
                                        this.state.tableNumber === 2
                                            ? "header-table-button active"
                                            : "header-table-button"
                                    }
                                    onClick={() =>{ this.setState({tableNumber: 2})}}
                                >
                                    ALERTS
                                </button>
                                <button
                                    className={
                                        this.state.tableNumber === 0
                                            ? "header-table-button active"
                                            : "header-table-button"
                                    }
                                    onClick={() =>{ this.setState({tableNumber: 0})}}
                                >
                                    CARS
                                </button>
                                <button
                                    className={
                                        this.state.tableNumber === 1
                                            ? "header-table-button active"
                                            : "header-table-button"
                                    }
                                    onClick={() =>{ this.setState({tableNumber: 1})}}
                                >
                                    CUSTOMERS
                                </button>
                            </div>
                        ) : (
                            <h2>
                                {this.props.tableName
                                    .toUpperCase()
                                    .replace("DISPLAY", "")}
                            </h2>
                        )}
                    </div> {/* end of header row*/}
        



                    <div className="header-row">

                        {Object.keys(this.state.header[this.state.tableNumber]).map((key, index) => {
                            return (

                                <div key={key+index}
                                onClick={() =>
                                    this.props.sortingHandler(key)
                                }
                                className="header-item"
                            >
                               {key.toUpperCase()}
                            </div>

                            )})}
                        
                 
                    </div>  {/* end of header row*/}
                    
                    <div className="table-container" id="style-1">
                        <table className="table-body" id="style-1">
                     
    
                                <tbody className="table-data" id="style-1">
                                    {this.props.displayDataArray[this.state.tableNumber].map((data, index) => {
                                        return (

                                            <tr
                                            className="table-data-row"
                                            key={'row'+index}
                                            onClick={() =>
                                                this.props.editHandler(
                                                    data,
                                                    "editedCar"
                                                )
                                            }
                                            >
                                            {Object.entries(data).map((data) => {
                                                return (
                                                    Object.keys(this.state.header[this.state.tableNumber]).map((key, index) => {
                                                
                                                        if (data[0].toString() === key.toString()) {
                                                            return (
                                                                <td key={'data'+ index} className="table-item">
                                                                {data[1]} 
                                                            </td>
                                                            )
                                                        }
                                                    })
                                                )
                                               
                                                    

                                                
                                               
                                                    
                                                    
                                                    
                                                      
    
                                                    
                                            })}
                                             
      
                                        </tr>
                                        
                                    )})}      
                                </tbody> 
                            
                        </table>
                    </div>
                    <div className="under-table-field">
                        <button
                            className="under-table-button"

                            onClick={() =>
                                this.props.addNewButtonHandler()
                            }
                        >
                            ADD NEW
                        </button>

                        <input
                            className="search-input"
                            onChange={e => this.props.searchHandler(e, this.props.tableName)}
                            value={this.props.searchValue}
                            placeholder="Click and type to search here ..."
                        />

                        <button
                            className="under-table-button"
                            onClick={() =>
                                this.props.tableNameHandler("displayDeleted")
                            }
                        >
                            DELETED
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
