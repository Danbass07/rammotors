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
                id: 0,
                customer_id: 0,
                registration: "",
                make: "",
                mot: "2000-12-12",
                servis: "",
                appointment: "",
                info: "",
                pending: 0,
                created_at: "",
                updated_at: "",
                deleted_at: ""
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
        console.log('submit trigger');
        console.log(editedObjectName.toString());
        e.preventDefault();

    if  (editedObjectName === "newCar" ) {

        const newCar = { ...this.state.newCar };
        
        axios
            .post(`/cars`, {
                registration: newCar.registration,
                make: newCar.make,
                mot: newCar.mot,
                servis: newCar.servis,
                appointment: newCar.appointment
            }).then(() => {
                this.props.refreshData();
                });     

    } else if (editedObjectName.toString() === "editedCars" ) {
        console.log('submit trigger Cars');
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
            console.log(editedObjectName);
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
componentWillMount() {
    if (this.props.editedObjectName === "newCar" ) {
        this.setState({
            [this.props.editedObjectName]: {
                  ...this.state.newCar,
            
              }
          });
        } 
    else if (this.props.editedObjectName === "newCustomer" ) {
    this.setState({
        [this.props.editedObjectName]: {
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
        const inline = {
            display: "flex",
            flexDirection: "row"
        };
        return (
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
                        <h2>{//this.props.editedObjectName.replace("edited", "")
                        } </h2>
                        {Object.entries(this.state.editedObject).map(data => {
                            return (
                                <div key={data[0]} style={inline}>
                                    <label
                                        style={
                                            data[0] === "cars" ||
                                            data[0] === "updated_at" ||
                                            data[0] === "created_at" ||
                                            data[0] === "deleted_at" ||
                                            data[0] === "pending" ||
                                            data[0] === "id" ||
                                            data[0] === "customer_id"||
                                            data[0] === "customer"
                                                ? style
                                                : null
                                        }
                                    >
                                        {data[0]}
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
                                            data[0] === "customer"
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
                                            data[0] === "registration"
                                                ? this.state[this.props.editedObjectName][
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
