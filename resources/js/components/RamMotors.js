import React, { Component } from "react";
import Table from "./Table";
import Form from "./Form";

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

            displayCars: [],
            displayCustomers: [],
            displayAlerts: [],
            displayPending: [],
            displayConfirmed: [],
            displayExpired: [],
            displayDeleted: [],
      

            tableName: "displayAlerts",
            ascending: true,
            search: "",
            searchResult: [],

            editedCars: {
                id: 0,
                customer_id: 0,
                registration: "",
                make: "",
                mot: "",
                servis: "",
                appointment: "",
                info: "",
                pending: 0,
                created_at: "",
                updated_at: "",
                deleted_at: ""
            },

            editedCustomers: {
                name: "",
                surname: "",
                phone: "",
                email: "",
                notes: "",
                cars: [],
                info: ""
            },

            newCar: { 
                id: 0,
                customer_id: 0,
                registration: "",
                make: "",
                mot: "",
                servis: "",
                appointment: "",
                info: "",
                pending: 0,
                created_at: "",
                updated_at: "",
                deleted_at: ""
            },

            focusOn: "editedCar",
            focus: false,
            chooseCustomer: true,
            operation: "",
            optionChoice: "",
            delete: 0
        };
       // this.compareValues = this.compareValues.bind(this);
       
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

    displayFocus(focusOn) {
        return (
            <div className="focus">
                <div
                    className="closing-div"
                    onClick={() => this.setState({ focus: !this.state.focus })}
                >
                    X
                </div>
                
                {focusOn == "Edit"  ? (
                    <div className="focus-work-area">
                        <Form 
                        clearFocus={() => this.setState({ focus: !this.state.focus })}
                        editedObject={this.state.editedObject}
                        editedObjectName={this.state.objectName}
                        refreshData={() => this.refreshData()}
                        focusOnTableHandler={() => this.focusOnTableHandler()}
                        />
                        {this.displayActions(this.state[this.state.objectName].id)}
                        {this.displayList(
                            this.state.editedCars.customer_id
                        )}{" "}
                    </div>
                ) : null}


                {focusOn == "newCar" ? (
                  
                    <div className="focus-work-area">
                          <Form 
                        clearFocus={() => this.setState({ focus: !this.state.focus })}
                        editedObjectName={"newCar"}
                        refreshData={() => this.refreshData()}
                        focusOnTableHandler={() => this.focusOnTableHandler()}
                        />
                    
                    </div>
                ) : null}
                   { focusOn == "newCustomer"? (
                  
                  <div className="focus-work-area">
                        <Form 
                      clearFocus={() => this.setState({ focus: !this.state.focus })}
                      editedObjectName={"newCustomer"}
                      refreshData={() => this.refreshData()}
                      focusOnTableHandler={() => this.focusOnTableHandler()}
                      />
                  
                  </div>
              ) : null}

                {this.state.focusOn !== "" && this.state.focusOn !== "newCar"  && this.state.focusOn !== "newCustomer" ? this.displayTable(this.state.tableName) : null}
            </div>
        );
    }
  

 






    ///// functions returns stuff need  convert to components

    displayTable(size, data1, data2,  data4, data3) {
        // display tables in 2 version2  mini or big 
        
        let data = [4];
        let tableName = ''
        if (size === 'big') {
            data = [data1 , data2 , data4, data3] 

        } else { data[0] = data1
            tableName = data2  }
        
     
        return (
            <div>
           
                         <Table 
                         tableName={tableName} 
                         displayDataArray={data} 
                         editHandler={(data, key) => this.editHandler(data, key)}
                            focusOnTableHandler={(table) => this.focusOnTableHandler(table)}/>
        
            </div>
        );
    }
    
    deleteHandler(object, id) {
        this.setState({ delete: this.state.delete + 1 }, () => {
            if (this.state.delete == 4) {
                axios.get(`/${object}/${id}/destroy`).then(() => {
                    axios.get("/customers").then(response =>
                        this.setState({
                            customers: [...response.data],
                            displayCustomers: [...response.data],
                            focusOn: "",
                            focus: !this.state.focus,
                            search: "",
                            delete: 0
                        })
                    );
                    axios.get("/cars").then(response =>
                        this.setState({
                            cars: [...response.data],
                            displayCars: [...response.data]
                        })
                    );
                });
            }
        });
    }
    sendSmsHandler(id) {
        axios.get(`/cars/${id}/toNexmo`).then(() => {
            this.refreshData();
        });
    }

    chooseCar() {

        return (
            <div>
                <select
                    className="focus-form-input"
                    onChange={e => {
                        this.setState({ optionChoice: e.target.value });
                    }}
                >
                    {this.state.cars.map(car => {
                        if (!car.customer_id) {
                            return (
                                <option key={car.id} value={car.id}>
                                    {car.registration.toUpperCase()}
                                </option>
                            );
                        }
                    })}
                </select>
                <button
                    onClick={e =>
                        this.submitHandler(e, "editedCustomer", "assign")
                    }
                >
                    ASSIGN CAR TO THE OWNER{" "}
                </button>
            </div>
        );
    }

  

    displayList(id) {
        ///// not dynamic yet might never be

        if (this.state.tableName === "displayCustomers") {
            return (
                <div className="list-wrapper">
                    <h1>List Of Cars</h1>
                    {this.state.cars.map(car => {
                        return car.customer_id === id ? (
                            <div
                                key={car.registration}
                                className="display-list-item"
                            >
                                {car.registration.toUpperCase()}
                                <button
                                    value={car.id}
                                    onClick={e =>
                                        this.submitHandler(
                                            e,
                                            "editedCustomer",
                                            "remove"
                                        )
                                    }
                                >
                                    Remove
                                </button>
                            </div>
                        ) : null;
                    })}
                </div>
            );
        }

        if (this.state.tableName === "displayCars") {
            return (
                <div className="list-wrapper">
                    <h1>OWNER</h1>
                    {this.state.customers.map(customer => {
                        return customer.id === id ? (
                            <div
                                key={id}
                                className="display-list-item"
                                onClick={() =>
                                    this.editHandler(customer, "editedCustomer")
                                }
                            >
                                {customer.name + " " + customer.surname}
                            </div>
                        ) : null;
                    })}
                </div>
            );
        }
    }

    displayActions(id) {
        ///// not dynamic yet might never be
        if (this.state.tableName === "displayCustomers") {
            return (
                <div className="list-wrapper">
                    <h1>Actions</h1>
                    {this.chooseCar()}
                    <button
                        className={"submit-button" + "-" + this.state.delete}
                        onClick={() => this.deleteHandler("customers", id)}
                    >
                        DELLETE
                    </button>
                </div>
            );
        }
        if (this.state.objectName.toString() === "editedCars") {
            return (
                <div className="list-wrapper">
                    <div className="focus-form">
                        <h1>Actions</h1>
                        
                        {this.state.alerts.map(alertedCar => {
                            if (id === alertedCar.id) {
                                return (
                                    <button
                                        className="submit-button"
                                        onClick={() => this.sendSmsHandler(id)}
                                        key={id}
                                    >
                                        Send SMS
                                    </button>
                                );
                            }
                        })}
                        <button
                            className={
                                "submit-button" + "-" + this.state.delete
                            }
                            onClick={() => this.deleteHandler("cars", id)}
                        >
                            DELETE
                        </button>
                    </div>
                </div>
            );
        }
    }

    submitHandler(e, editedObjectName, operation) {
        // submit both of above new or edit  need to update state reset search value

        e.preventDefault();

        if (editedObjectName === "editedCustomer" && operation === "remove") {
            let editedCustomer = { ...this.state.editedCustomer };
            axios
                .post(
                    `/customers/${editedCustomer.id}/removeCar/${
                        e.target.value
                    }`,
                    {}
                )
                .then(response => {
                    axios.get("/customers").then(response =>
                        this.setState({
                            customers: [...response.data],
                            displayCustomers: [...response.data]
                        })
                    );
                    axios.get("/cars").then(response =>
                        this.setState({
                            cars: [...response.data],
                            displayCars: [...response.data]
                        })
                    );
                });
        }
        if (editedObjectName === "editedCustomer" && operation === "assign") {
            const editedCustomer = { ...this.state.editedCustomer };
            axios
                .post(
                    `/customers/${editedCustomer.id}/addCar/${
                        this.state.optionChoice
                    }`,
                    {}
                )
                .then(response => {
                    axios.get("/customers").then(response =>
                        this.setState({
                            customers: [...response.data],
                            displayCustomers: [...response.data]
                        })
                    );
                    axios.get("/cars").then(response =>
                        this.setState({
                            cars: [...response.data],
                            displayCars: [...response.data]
                        })
                    );
                });
        }
    
       
        
        
         else {
            return;
        }
    }


    render() {
        return (
            <div className="rammotors">
                {this.state.focus ? this.displayFocus(this.state.focusOn) : null}

                <div className="rammotors-row">
                    {this.displayTable('big', [...this.state.cars], [...this.state.customers],  [...this.state.alerts], [...this.state.deleted] )}
                </div>
                

                <div className="rammotors-row">
                {this.displayTable('small', [...this.state.alerts], 'ALERTS' )}
                {this.displayTable('small', [...this.state.pending], 'PENDING' )}
                {this.displayTable('small', [...this.state.confirmed], 'CONFIRMED' )}
                {this.displayTable('small', [...this.state.expired], 'EXPIRED' )}

 
                    
                </div>
            </div>
        );
    }
}
                   