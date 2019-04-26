import React, { Component } from "react";
import Table from "./Table";
import Focus from "./Focus";

export default class RamMotors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cars: [],
            customers: [],
            pending: [],
            confirmed: [],
            expired: [],
            deleted: [],
            alerts: [],



            focusOn: "editedCar",
            focus: false,
            chooseCustomer: true,
            operation: "",
            optionChoice: "",
        };
       
    }

    refreshData() {
        axios.get("/cars/alerts").then(response =>
            this.setState({
                alerts: [...response.data],
                displayAlerts: [...response.data]
            })
        );
        
        axios.get("/cars/deleted").then(response =>
            this.setState({
                deleted: [...response.data],
                displayDeleted: [...response.data]
            })
        );
      
        axios.get("/cars").then(response =>
            this.setState({
                cars: [...response.data],
                displayCars: [...response.data]
            })
        );
      
        axios.get("/cars/confirmed").then(response =>
            this.setState({
                confirmed: [...response.data],
                displayConfirmed: [...response.data]
            })
        );
        axios.get("/cars/pending").then(response =>
            this.setState({
                pending: [...response.data],
                displayPending: [...response.data]
            })
        );
        axios.get("/cars/get_data_expired").then(response =>
            this.setState({
                expired: [...response.data],
                displayExpired: [...response.data]
            })
        );
        axios.get("/customers").then(response =>
            this.setState({
                customers: [...response.data],
                displayCustomers: [...response.data]
            })
        );
        this.setState({ search: ''})
 
    }

    componentWillMount() {
        /// loading all resources
        this.refreshData();
    }

    ///////////// methods depending on focus state
    ////////////// modal display and form to add or update
    editHandler(object, objectName, focus = !this.state.focus, focusOn = "Edit"){
     
        this.setState({
            focusOn: focusOn,
            editedObject:  {
                ...object
            },
            focus: focus,
            objectName: [objectName],
        },console.log(this.state.editedObject));
    }


    render() {
        return (
            <div className="rammotors">

                {this.state.focus ?   
                    <Focus 
                    editHandler={(object, objectName, focus) => this.editHandler(object, objectName, focus)}
                    focusOn={this.state.focusOn}
                    object={this.state.editedObject}
                    editedObjectName={this.state.objectName}
                    clearFocus={() => this.setState({ focus: !this.state.focus })}
                    refreshData={() => this.refreshData()}
                    alerts={this.state.alerts}
                    cars={this.state.cars}
                    expired={this.state.expired}
                    customers={this.state.customers}

                    />
                    : null
                }

                <div className="rammotors-row">
                    <Table 
                    tableName={''}
                    displayDataArray={[[...this.state.cars], [...this.state.customers],  [...this.state.alerts], [...this.state.deleted]]}
                    editHandler={(object, objectName, focusOn) => this.editHandler(object, objectName, focusOn)}/>
                </div>
                

                <div className="rammotors-row">
                    <Table 
                    tableName={'ALERTS'}
                    displayDataArray={[[...this.state.alerts]]} 
                    editHandler={(data, key) => this.editHandler(data, key)}/>
                    <Table 
                    tableName={'PENDING'}
                    displayDataArray={[[...this.state.pending]]} 
                    editHandler={(data, key) => this.editHandler(data, key)}/>
                    <Table 
                    tableName={'CONFIRMED'}
                    displayDataArray={[[...this.state.confirmed]]} 
                    editHandler={(data, key) => this.editHandler(data, key)}/>
                    <Table 
                    tableName={'EXPIRED'}
                    displayDataArray={[[...this.state.expired]]} 
                    editHandler={(data, key) => this.editHandler(data, key)}/>
                </div>
            </div>
        );
    }
}
                   