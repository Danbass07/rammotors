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
            pendingExpired: [],
            confirmed: [],
            expired: [],
            deletedCars: [],
            alerts: [],
            zoomed: [],
            ZoomedName: "empty",
            messages: [],

            focusOn: "editedCar",
            focus: false,
            chooseCustomer: true,
            operation: "",
            optionChoice: ""
        };
    }

    refreshData() {
        axios.get("/cars/alerts").then(response =>
            this.setState({
                alerts: [...response.data]
            })
        );
        axios.get("/cars/deleted").then(response =>
            this.setState({
                deletedCars: [...response.data]
            })
        );
        // axios.get("/customers/deleted").then(response =>
        //     this.setState({
        //         deletedCustomers: [...response.data]
        //     })
        //);
        axios.get("/cars").then(response =>
            this.setState({
                cars: [...response.data]
            })
        );
        axios.get("/cars/confirmed").then(response =>
            this.setState({
                confirmed: [...response.data]
            })
        );
        axios.get("/cars/pending").then(response =>
            this.setState({
                pending: [...response.data]
            })
        );
        axios.get("/cars/pendingExpired").then(response =>
            this.setState({
                pendingExpired: [...response.data]
            })
        );
        axios.get("/cars/get_data_expired").then(response =>
            this.setState({
                expired: [...response.data]
            })
        );
        axios.get("/customers").then(response =>
            this.setState({
                customers: [...response.data]
            })
        );

        this.setState({ search: "" });
    }

    componentWillMount() {
        /// loading all resources
        this.refreshData();
    }

    ///////////// methods depending on focus state
    ////////////// modal display and form to add or update
    editHandler(
        object,
        objectName,
        focus = !this.state.focus,
        focusOn = "Edit"
    ) {
        let editedCustomer;
        if (
            objectName.toString() === "editedCars" ||
            objectName.toString() === "editedAlerts"
        ) {
            this.state.customers.forEach(customer => {
                customer.cars.forEach(customerCars => {
                    if (customerCars.id === object.id) {
                        editedCustomer = customer;
                    }
                });
            });
        }
        this.setState({
            focusOn: focusOn,
            editedObject: {
                ...object
            },
            editedCustomer: { ...editedCustomer },
            focus: focus,
            objectName: [objectName]
        });
    }

    render() {
        return (
            <div className="rammotors">
                {this.state.focus ? (
                    <Focus
                        message={this.state.messages}
                        editHandler={(object, objectName, focus) =>
                            this.editHandler(object, objectName, focus)
                        }
                        focusOn={this.state.focusOn}
                        object={this.state.editedObject}
                        editedObjectName={this.state.objectName}
                        clearFocus={() =>
                            this.setState({ focus: !this.state.focus })
                        }
                        refreshData={() => this.refreshData()}
                        alerts={this.state.alerts}
                        cars={this.state.cars}
                        expired={this.state.expired}
                        deleted={this.state.deletedCars}
                        customers={this.state.customers}
                        editedCustomer={this.state.editedCustomer}
                    />
                ) : null}

                <div className="rammotors-row">
                    <Table
                        zoomName={this.state.zoomName}
                        tableType={"main"}
                        tableName={""}
                        displayDataArray={[
                            [...this.state.cars],
                            [...this.state.customers],
                            [...this.state.alerts],
                            [...this.state.deletedCars],
                            [...this.state.zoomed]
                        ]}
                        editHandler={(object, objectName, focusOn) =>
                            this.editHandler(object, objectName, focusOn)
                        }
                    />
                </div>

                <div className="rammotors-row">
                    <Table
                        tableType={"mini"}
                        tableName={"PENDING_EXPIRED"}
                        zoomHandler={() =>
                            this.setState({
                                zoomed: this.state.pendingExpired,
                                zoomName: "Pending Expired"
                            })
                        }
                        displayDataArray={[[...this.state.pendingExpired]]}
                        editHandler={(data, key) => this.editHandler(data, key)}
                    />
                    <Table
                        tableType={"mini"}
                        tableName={"PENDING"}
                        zoomHandler={() =>
                            this.setState({
                                zoomed: this.state.pending,
                                zoomName: "Pending"
                            })
                        }
                        displayDataArray={[[...this.state.pending]]}
                        editHandler={(data, key) => this.editHandler(data, key)}
                    />
                    <Table
                        tableType={"mini"}
                        tableName={"CONFIRMED"}
                        zoomHandler={() =>
                            this.setState({
                                zoomed: this.state.confirmed,
                                zoomName: "Confirmed"
                            })
                        }
                        displayDataArray={[[...this.state.confirmed]]}
                        editHandler={(data, key) => this.editHandler(data, key)}
                    />
                    <Table
                        tableType={"mini"}
                        tableName={"EXPIRED"}
                        zoomHandler={() =>
                            this.setState({
                                zoomed: this.state.expired,
                                zoomName: "Expired"
                            })
                        }
                        displayDataArray={[[...this.state.expired]]}
                        editHandler={(data, key) => this.editHandler(data, key)}
                    />
                </div>
            </div>
        );
    }
}
