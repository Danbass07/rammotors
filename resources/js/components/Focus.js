import React, { Component } from 'react';
import Form from "./Form";

export default class Focus extends Component {
            constructor(props) {
                super(props);
                this.state = {
  
   
        
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
        
                    focusOn: "",
                    focus: false,
                    chooseCustomer: true,
                    operation: "",
                    optionChoice: "",
                    delete: 0,
                    objectName: '',
                };
        };
    
        componentWillMount() {
            this.setState({
                focusOn: this.props.focusOn,
                editedObject:  {
                    ...this.props.object
                },
                objectName: this.props.editedObjectName,
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
                        {this.props.cars.map(car => {
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
            {console.log(this.state.objectName)}
            ///// not dynamic yet might never be
            if (this.state.objectName.toString() === "editedCustomers") {
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
            if (this.state.objectName.toString() === "editedCars" || this.state.objectName.toString() === "editedAlerts") {
                return (
                    <div className="list-wrapper">
                        <div className="focus-form">
                            <h1>Actions</h1>
                            
                            {this.props.alerts.map(alertedCar => {
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
    render() {
        let focusOn = "Edit"
        return (
        <div>
                        <div className="focus">
                <div
                    className="closing-div"
                    onClick={() => this.props.clearFocus()}
                >
                    X
                </div>
                
                {focusOn == "Edit"  ? (
                    <div className="focus-work-area">
                        <Form 
                        clearFocus={() => this.props.clearFocus()}
                        editedObject={this.state.editedObject}
                        editedObjectName={this.state.objectName}
                        refreshData={() => this.props.refreshData()}
                        focusOnTableHandler={() => this.focusOnTableHandler()}
                        />
                        {this.displayActions(this.state.editedObject.id,this.state.objectName)}
                        {/* {this.displayList(
                            this.state.editedCars.customer_id
                        )} */}
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

                {/* {this.state.focusOn !== "" && this.state.focusOn !== "newCar"  && this.state.focusOn !== "newCustomer" ? console.log('notable') */}
                {/* // this.displayTable(this.state.tableName) 
                : null} */}
            </div>
        </div>
    )
    }
}
