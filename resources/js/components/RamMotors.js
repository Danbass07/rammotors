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
            delete: 0
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
 
    }

    componentWillMount() {
        /// loading all resources
        this.refreshData();
    }

    ///////////// methods depending on focus state
    ////////////// modal display and form to add or update
    editHandler(object, objectName){
        this.setState({
            focusOn: 'Edit',
            editedObject:  {
                ...object
            },
            focus: !this.state.focus,
            objectName: [objectName],
        });
    }
    focusOnTableHandler(table) {
        ///  focus on or off
        this.setState({
            //////  need to know if click is from focus on type and keep focus on just change content
            focusOn: table,
            focus: !this.state.focus
        });
    }

    render() {
        return (
            <div className="rammotors">

                {this.state.focus ?   
                    <Focus 
                    focusOn={this.state.focusOn}
                    object={this.state.editedObject}
                    editedObjectName={this.state.objectName}
                    clearFocus={() => this.setState({ focus: !this.state.focus })}
                    refreshData={() => this.refreshData()}
                    />
                    : null
                }

                <div className="rammotors-row">
                    <Table 
                    tableName={''}
                    displayDataArray={[[...this.state.cars], [...this.state.customers],  [...this.state.alerts], [...this.state.deleted]]} 
                    editHandler={(data, key) => this.editHandler(data, key)}
                    focusOnTableHandler={(table) => this.focusOnTableHandler(table)}/>
                </div>
                

                <div className="rammotors-row">
                    <Table 
                    tableName={'ALERTS'}
                    displayDataArray={[[...this.state.alerts]]} 
                    editHandler={(data, key) => this.editHandler(data, key)}
                    focusOnTableHandler={(table) => this.focusOnTableHandler(table)}/>
                    <Table 
                    tableName={'PENDING'}
                    displayDataArray={[[...this.state.pending]]} 
                    editHandler={(data, key) => this.editHandler(data, key)}
                    focusOnTableHandler={(table) => this.focusOnTableHandler(table)}/>
                    <Table 
                    tableName={'CONFIRMED'}
                    displayDataArray={[[...this.state.confirmed]]} 
                    editHandler={(data, key) => this.editHandler(data, key)}
                    focusOnTableHandler={(table) => this.focusOnTableHandler(table)}/>
                    <Table 
                    tableName={'EXPIRED'}
                    displayDataArray={[[...this.state.expired]]} 
                    editHandler={(data, key) => this.editHandler(data, key)}
                    focusOnTableHandler={(table) => this.focusOnTableHandler(table)}/>
                </div>
            </div>
        );
    }
}
                   