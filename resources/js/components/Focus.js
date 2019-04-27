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
                        id: 0,
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
     
        deleteHandler(object, id) {
            
            this.setState({ 
                delete: this.state.delete + 1 }, () => {
                if (this.state.delete == 4) {
                    axios.get(`/${object}/${id}/destroy`).then(() => {
                            this.setState({
                                delete: 0,
                            });
                        
                }).then( () => { this.props.clearFocus(); this.props.refreshData()})
            }})
        }



        whyWhiteSetState() {    //////////// what the??? something wrong with fuction above?
            this.setState({});
        }

        componentWillMount() {
            this.setState({
                focusOn: this.props.focusOn,
                editedObject:  {
                    ...this.props.object
                },
                objectName: this.props.editedObjectName,
            });
        }
  
    
        sendSmsHandler(id) {
            axios.get(`/cars/${id}/toNexmo`).then(() => {
                this.props.refreshData();
            });
        }
        sendAlertSmsHandler(id) {
            axios.get(`/cars/${id}/toNexmoAlert`).then(() => {
                this.props.refreshData();
            });
        }
        assignCar(carId) {
            axios.put(`/customers/${this.props.object.id}/addCar/${carId}/`).then(() => {
                this.props.refreshData();
            });
        }

        removeCar(carId) {
            axios.put(`/customers/${this.props.object.id}/removeCar/${carId}/`).then(() => {
                this.props.refreshData();
            });
        }
        
    
        chooseCar() {
    
            return (
                <div>
                    <select
                        className="focus-form-select"
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
                    <button className="focus-form-select-button"
                        onClick={() => this.assignCar(this.state.optionChoice)}
                    >
                        ASSIGN CAR TO THE OWNER
                    </button>
                </div>
            );
        }
    
      
    
        displayList(id) {
            ///// not dynamic yet might never be
    
            if (this.state.objectName.toString() === "editedCustomers") {
                return (
                    <div className="list-wrapper">
                        <h1 className={'focus-header'}>List Of Cars</h1>
                        {this.props.customers.map(customer => {
                            return customer.id === id ? (
                                customer.cars.map(car => {

                                    return (
                                    <div
                                    key={car.registration}
                                    className="focus-list-item"
                                >
                                    {car.registration.toUpperCase()}
                                    <br/>
                                    {car.make.toUpperCase()}
                                    <button className={'focus-remove'}
                                        value={car.id}
                                        onClick={() => this.removeCar(car.id)}
                                    >
                                       X
                                    </button>
                                </div>
                                )
                                })
                            ) : null 
                                
                        })}
                    </div>
                );
            }
    
            if (this.state.objectName.toString() === "editedCars" || this.state.objectName.toString() === "editedAlerts" ) {
                return (
                    <div className="list-wrapper">
                        <h1 className={'focus-header'}>OWNER</h1>
                        {this.props.customers.map(customer => { 

                        return    customer.cars.map(customerCars => {
                       
                                return customerCars.id === id ? (
                                    <div
                                        key={id}
                                        className="focus-list-item"
                                        onClick={() =>
                                            this.props.editHandler(customer, 'editedCustomers', true)
                                            }

                                    >
                                        {customer.name + " " + customer.surname}
                                    </div>
                                ) : null;
                            })
                          
                        })}
                    </div>
                );
            }
        }
    
        displayActions(id) {
            ///// not dynamic but they will be
            if (this.state.objectName.toString() === "editedCustomers") {
                return (
                    <div className="list-wrapper">
                        <h1 className={'focus-header'}>Actions</h1>
                        {this.chooseCar()}
                        <button
                            className={"submit-button-" + this.state.delete}
                            onClick={() => this.deleteHandler("customers", id)}
                        >
                            DELETE CUSTOMER
                        </button>
                    </div>
                );
            }
            if (this.state.objectName.toString() === "editedCars" || this.state.objectName.toString() === "editedAlerts") {
                return (
                    <div className="list-wrapper">
                        <div className="focus-form">
                            <h1 className={'focus-header'} >Actions</h1>
                            
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
                                {this.props.expired.map(expiredCar => {
                                if (id === expiredCar.id) {
                                    return (
                                        <button
                                            className="submit-button"
                                            onClick={() => this.sendSmsAlertHandler(id)}
                                            key={id}
                                        >
                                            Send Alert SMS
                                        </button>
                                    );
                                }
                            })}
                            <button
                                className={
                                    "submit-button-" + this.state.delete
                                }
                                onClick={() => this.deleteHandler("cars", id)}
                            >
                                DELETE CAR
                            </button>
                        </div>
                    </div>
                );
            }
        }
    render() {
     
        return (
        <div>
                        <div className="focus">
                <div
                    className="closing-div"
                    onClick={() => this.props.clearFocus()}
                >
                    X
                </div>
                
                {this.props.focusOn == "Edit" || this.state.editedObject !== undefined ? (
                    <div className="focus-work-area">
                        <Form 
                        clearFocus={() => this.props.clearFocus()}
                        editedObject={this.state.editedObject}
                        editedObjectName={this.state.objectName}
                        refreshData={() => this.props.refreshData()}
                        focusOnTableHandler={() => this.focusOnTableHandler()}
                        />
                        {this.displayActions(this.state.editedObject.id,this.state.objectName)}
                        {this.displayList(this.state.editedObject.id)}
                    </div>
                ) : null}


                {this.props.focusOn == "newCar" ? (
                  
                    <div className="focus-work-area">
                          <Form 
                        clearFocus={() => this.setState({ focus: !this.state.focus })}
                        editedObjectName={"newCar"}
                        refreshData={() => this.refreshData()}
                        focusOnTableHandler={() => this.focusOnTableHandler()}
                        />
                     
                    
                    </div>
                ) : null}
                   { this.props.focusOn == "newCustomer"? (
                  
                  <div className="focus-work-area">
                        <Form 
                      clearFocus={() => this.setState({ focus: !this.state.focus })}
                      editedObjectName={"newCustomer"}
                      refreshData={() => this.refreshData()}
                      focusOnTableHandler={() => this.focusOnTableHandler()}
                      />
                  
                  </div>
              ) : null}

            </div>
        </div>
    )
    }
}
