import React, { Component } from 'react';
import Form from "./Form";
let editedObject;
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
                        cars: [{  id: 0,
                            customer_id: 0,
                            registration: "",
                            make: "",
                            mot: ""}],
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
                    // focus: false,
                    // chooseCustomer: true,
                    // operation: "",
                    // optionChoice: "",
                    delete: 0,
                    objectName: '',
                };
        };
     
        deleteHandler(object, id) {
            if (this.state.delete === 3) {
                    axios.get(`/${object}/${id}/destroy`).then(() => {
                            this.setState({
                                delete: 0,
                            });
                    }).then( () => { this.props.clearFocus(); this.props.refreshData() })
            } else {
                    this.setState({ 
                        delete: this.state.delete + 1 }
                    )}
                }
       
        unDeleteHandler(object, id) {
            axios.get(`/${object}/${id}/undestroy`).then( () => { this.props.clearFocus(); this.props.refreshData() })
        }
        
        componentWillMount() {
            this.setState({
                focusOn: this.props.focusOn,
                editedObject:  {
                    ...this.props.object
                },
                objectName: this.props.editedObjectName,
                editedCustomers: this.props.editedCustomer,
            }) 
        }
   

        sendSmsHandler(id) {
            axios.get(`/cars/${id}/toNexmo`).then(() => {
                this.props.refreshData();
            });
        }
        
        sendSmsAlertHandler(id) {
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
                                    onClick={() => {this.setState({
                                        editedCustomers: {...customer},
                                        objectName: 'editedCars',
                                        editedObject: {...car}});
                                     } }
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
    
            if (this.state.objectName.toString() === "editedCars" || this.state.objectName.toString() === "editedZoomed" || this.state.objectName.toString() === "editedAlerts" ) {
                return (
                    <div className="list-wrapper">
                        <div className={'focus-header'}>OWNER</div>
                        <div className="focus-list-item-big"
                                    onClick={() => {this.setState({objectName: ['editedCustomers'], editedObject: {...this.state.editedCustomers}}); } }>
                            {this.state.editedCustomers.name}{" "}{this.state.editedCustomers.surname} 
                        </div>
                        {this.state.editedCustomers.cars? 
                        this.state.editedCustomers.cars.map(car => {
                            return ( 

                                <div className="focus-list-item"
                                    onClick={() => {this.setState({ objectName: ['editedCars'], editedObject: {...car}}); } }>
                                    {car.registration} 
                                </div> 
                            )
                        }
                 ) : null}
              
              
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
            if (this.state.objectName.toString() === "editedCars" || this.state.objectName.toString() === "editedZoomed" || this.state.objectName.toString() === "editedAlerts" || this.state.objectName.toString() === "editedDeletedCars") {
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
                            {this.props.deleted.map(deletedCar => {
                                if (id === deletedCar.id) {
                                    return (
                                        <button
                                            className="submit-button"
                                            onClick={() => this.unDeleteHandler("cars", id)}
                                            key={id}
                                        >
                                          Revive
                                        </button>
                                    );
                                }
                            })}
                       
                            
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
                        deleted={this.props.deleted}
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
