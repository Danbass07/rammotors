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
            ],
          
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
                        {this.props.tableName === "displayCars" ||
                        this.props.tableName === "displayCustomers" ||
                        this.props.tableName === "displayAlerts"? (
                            <div>
                                 <button
                                    className={
                                        this.props.tableName === "displayAlerts"
                                            ? "header-table-button active"
                                            : "header-table-button"
                                    }
                                    onClick={() =>
                                        this.props.tableNameHandler(
                                            "displayAlerts"
                                        )
                                    }
                                >
                                    ALERTS
                                </button>
                                <button
                                    className={
                                        this.props.tableName === "displayCars"
                                            ? "header-table-button active"
                                            : "header-table-button"
                                    }
                                    onClick={() =>
                                        this.props.tableNameHandler(
                                            "displayCars"
                                        )
                                    }
                                >
                                    CARS
                                </button>
                                <button
                                    className={
                                        this.props.tableName ===
                                        "displayCustomers"
                                            ? "header-table-button active"
                                            : "header-table-button"
                                    }
                                    onClick={() =>
                                        this.props.tableNameHandler(
                                            "displayCustomers"
                                        )
                                    }
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

                        {Object.keys(this.state.header[1]).map(key => {
                            return (

                                <div
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
                                    {this.props.displayData.map((data, index) => {
                                        return (

                                            <tr
                                            className="table-data-row"
                                            key={index}
                                            onClick={() =>
                                                this.props.editHandler(
                                                    data,
                                                    "editedCar"
                                                )
                                            }
                                            >

                                            {Object.entries(data).map((data) => {


                                            
                                                   
                                                     if (data[0] !== 'id' && data[0] !== 'updated_at' && data[0] !== 'created_at' && data[0] !== 'deleted_at')
                                                        return (
                                                            <th className="table-item">
                                                            {data[1]} 
                                                        </th>
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
