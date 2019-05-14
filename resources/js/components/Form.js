import React, { Component } from 'react';

export default class Form extends Component {
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
                registration: "",
                make: "",
                mot: "",
                servis: "",
                appointment: "",
                info: "",
             
            },
            newCustomer: {
                name: "",
                surname: "",
                phone: "",
                email: "",
                notes: "",
                cars: [],
                info: ""
            },
            editedObject: {}
        };
    }
    submitHandler(e,  editedObjectName) {
        // submit both of above new or edit  need to update state reset search value
   
        e.preventDefault();

    if  (editedObjectName.toString() === "newCar" ) {

        const newCar = { ...this.state.newCar };
        console.log(this.props.deleted)
        axios
            .post(`/cars`, {
                registration: newCar.registration,
                make: newCar.make,
                mot: newCar.mot,
                servis: newCar.servis,
                appointment: newCar.appointment,
                info: newCar.info,
            }).then(() => {
                this.props.refreshData();
                });     

    } else if (editedObjectName.toString() === "editedCars" || editedObjectName.toString() === "editedAlerts") {
            const editedCar = { ...this.state[editedObjectName.toString()] };

            axios
                .put(`/cars/${editedCar.id}/update`, {
                    make: editedCar.make,
                    mot: editedCar.mot,
                    servis: editedCar.servis,
                    appointment: editedCar.appointment,
                    info: editedCar.info
                }).then(() => {
                    this.props.refreshData();
                    });
                        
             
    } else if  (editedObjectName.toString() === "editedCustomers" ) {

            const editedCustomer = { ...this.state[editedObjectName.toString()] };

            axios
                .put(`/customers/${editedCustomer.id}/update`, {
                    name: editedCustomer.name,
                    surname: editedCustomer.surname,
                    phone: editedCustomer.phone,
                    email: editedCustomer.email,
                    info: editedCustomer.info
                }).then(() => {
                    this.props.refreshData();
                    });

        }  else if (editedObjectName.toString() === "newCustomer" ) {
            const newCustomer = { ...this.state.newCustomer };
        
            axios
                .post(`/customers`, {
                    name: newCustomer.name,
                    surname: newCustomer.surname,
                    phone: newCustomer.phone,
                    email: newCustomer.email,
                    info: newCustomer.info
                }).then(() => {
                    this.props.refreshData();
                    });

            } else {
            return;
        }
        this.props.clearFocus()
    }

    formChangeHandler(e, key, editedObjectName) {
  

        this.setState({
            [editedObjectName]: {
                ...this.state[editedObjectName],
                [key]: e.target.value
               
            }
        });

    }
    componentDidUpdate(nextProps)  /// not dynamic easy fix but better with props
    {
        if(this.props !== nextProps) {
            if (this.props.editedObjectName.toString() === "newCar" ) {
                this.setState({
                    editedObject: {
                          ...this.state.newCar,
                    
                      }
                  });
                } 
            else if (this.props.editedObjectName.toString() === "newCustomer" ) {
            this.setState({
                editedObject: {
                        ...this.state.newCustomer,
                
                    }
                });
            } else {
                this.setState({
                    [this.props.editedObjectName]: {
                          ...this.props.editedObject,
                    
                      },
                      editedObject:{...this.props.editedObject,}
                  });
            }
        }
    }
componentWillMount() {
    
    if (this.props.editedObjectName.toString() === "newCar" ) {
        this.setState({
            editedObject: {
                  ...this.state.newCar,
            
              }
          });
        } 
    else if (this.props.editedObjectName.toString() === "newCustomer" ) {
    this.setState({
        editedObject: {
                ...this.state.newCustomer,
        
            }
        });
    } else {
        this.setState({
            [this.props.editedObjectName]: {
                  ...this.props.editedObject,
            
              },
              editedObject:{...this.props.editedObject,}
          });
    }
 
    
}

stringToDate(_date, _format, _delimiter) {
    var formatLowerCase = _format.toLowerCase();
    var formatItems = formatLowerCase.split(_delimiter);
    var dateItems = _date.split(_delimiter);
    var monthIndex = formatItems.indexOf("mm");
    var dayIndex = formatItems.indexOf("dd");
    var yearIndex = formatItems.indexOf("yyyy");
    var month = parseInt(dateItems[monthIndex]);
    month -= 1;
    var formatedDate = new Date(
        dateItems[yearIndex],
        month,
        dateItems[dayIndex]
    );
    return formatedDate;
}
addYear(editedDate, editedProperty) {
    
    let date = this.stringToDate(editedDate, "YYYY-mm-dd", "-");
    let year = date.getFullYear() + 1;
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    let yearLater =
        year.toString() + "-" + month.toString() + "-" + day.toString();
    this.setState({
        [this.props.editedObjectName]: {
            ...this.state[this.props.editedObjectName],
            [editedProperty]: yearLater
        }
    });
}

    render() {
                /// dynamic form for adding new object end editing existing one
        /// find better way to disable unwanted categories and ajusting types
        /// need to display form depend on focusOn state

    
        const style = {
            display: "none"
        };
        const style2 = {
            color: 'wheat',
            width: '100%',
            height: '130px',
            marginBottom: '1px',
        };
        const inline = {
            display: "flex",
            flexDirection: "row",
            justifyContent: 'space-between'
        };
        if (this.state.editedObject)  return (
                <div className="form-wrapper">
                    <form
                        className="focus-form"
                        onSubmit={e =>
                            this.submitHandler(
                                e,
                                this.props.editedObjectName,
                            )
                        }
                    >
                      
                        {Object.entries(this.state.editedObject).map(data => {
                            return (
                                <div key={data[0]} style={inline}>
                                    <label className={"form-label"}
                                        style={
                                            data[0] === "cars" ||
                                            data[0] === "updated_at" ||
                                            data[0] === "created_at" ||
                                            data[0] === "deleted_at" ||
                                            data[0] === "pending" ||
                                            data[0] === "id" ||
                                            data[0] === "customer_id"||
                                            data[0] === "customer"||
                                            data[0] === "notes" ||
                                            data[0] === "info"
                                                ? style
                                                : null
                                        }
                                    >
                                        {data[0].toUpperCase()}
                                    </label>
                                    <input
                                        key={data[0]}
                                        className="focus-form-input"
                                        placeholder={data[0]}
                                        style={ 
                                            data[0] === "cars" ||
                                            data[0] === "updated_at" ||
                                            data[0] === "created_at" ||
                                            data[0] === "deleted_at" ||
                                            data[0] === "pending" ||
                                            data[0] === "id" ||
                                            data[0] === "customer_id"||
                                            data[0] === "customer" ||
                                            data[0] === "info"
                                                ? style
                                                : null
                                        }
                                        type={
                                            data[0] === "mot" ||
                                            data[0] === "servis" ||
                                            data[0] === "appointment"
                                                ? "date"
                                                : "text"
                                        }
                                        value={
                                            data[0] === "registration" && typeof(this.state[this.props.editedObjectName][data[0]]) === 'string'   ? 
                                            this.state[this.props.editedObjectName][
                                                    data[0]
                                                   ].toUpperCase()
                                                : this.state[this.props.editedObjectName][data[0]]
                                        }
                                        onChange={e =>
                                            this.formChangeHandler(e, data[0], this.props.editedObjectName)
                                        }
                                    />
                                    {   data[0] === "mot" || data[0] === "servis" ||   data[0] === "appointment" ? this.props.editedObjectName !== 'newCar' ? <div className="action-button" onClick={() =>
                                        this.addYear(this.state[this.props.editedObjectName][data[0]], data[0])}
                        >+1 Y</div> : null : null }
                           {data[0] === "info"  ?   
                            
                                    <input
                                        key={'info'+data[0]}
                                        className="focus-form-input"
                                        placeholder={data[0]}
                                        style={
                                            data[0] === "info"
                                                ? style2
                                                : style
                                        }
                                        type={"text"}
                                        value={this.state[this.props.editedObjectName][data[0]]
                                        }
                                        onChange={e =>
                                            this.formChangeHandler(e, data[0], this.props.editedObjectName)
                                        }
                                    /> : null }

                              
                                  
                                </div>
                            );
                        })}
    
                        <button type="submit" className="submit-button">
                            Save Changes
                        </button>
                
                    </form>
                    
                </div>
    ) 
    }
}
