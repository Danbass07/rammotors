import React, { Component } from 'react';

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editedCar: {
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

            editedCustomer: {
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
        };
    }
    submitHandler(e, editedObjectName) {
        // submit both of above new or edit  need to update state reset search value
        console.log('submnit trigger');
        console.log(editedObjectName);
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
                this.props.focusOnTableHandler()
                });     

    } else if (editedObjectName === "editedCar" ) {

            const editedCar = { ...this.state.editedCar };

            axios
                .put(`/cars/${editedCar.id}/update`, {
                    make: editedCar.make,
                    mot: editedCar.mot,
                    servis: editedCar.servis,
                    appointment: editedCar.appointment,
                    info: editedCar.info
                }).then(() => {
                    this.props.refreshData();
                    this.props.focusOnTableHandler()
                    });
                        
             
    } else if  (editedObjectName === "editedCustomer" ) {

            const editedCustomer = { ...this.state.editedCustomer };

            axios
                .put(`/customers/${editedCustomer.id}/update`, {
                    name: editedCustomer.name,
                    surname: editedCustomer.surname,
                    phone: editedCustomer.phone,
                    email: editedCustomer.email,
                    info: editedCustomer.info
                }).then(() => {
                    this.props.refreshData();
                    this.props.focusOnTableHandler()
                    });

        }  else if (editedObjectName === "newCustomer" ) {
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
                    this.props.focusOnTableHandler()
                    });

            } else {
            return;
        }
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
            
              }
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
                        <h2>{this.props.editedObjectName.replace("edited", "")} </h2>
                        {Object.keys(this.state[this.props.editedObjectName]).map(key => {
                            return (
                                <div key={key} style={inline}>
                                    <label
                                        style={
                                            key === "cars" ||
                                            key === "updated_at" ||
                                            key === "created_at" ||
                                            key === "deleted_at" ||
                                            key === "pending" ||
                                            key === "id" ||
                                            key === "customer_id"
                                                ? style
                                                : null
                                        }
                                    >
                                        {key}
                                    </label>
                                    <input
                                        key={key}
                                        className="focus-form-input"
                                        placeholder={key}
                                        style={
                                            key === "cars" ||
                                            key === "updated_at" ||
                                            key === "created_at" ||
                                            key === "deleted_at" ||
                                            key === "pending" ||
                                            key === "id" ||
                                            key === "customer_id"
                                                ? style
                                                : null
                                        }
                                        type={
                                            key === "mot" ||
                                            key === "servis" ||
                                            key === "appointment"
                                                ? "date"
                                                : "text"
                                        }
                                        value={
                                            key === "registration"
                                                ? this.state[this.props.editedObjectName][
                                                      key
                                                  ].toUpperCase()
                                                : this.state[this.props.editedObjectName][key]
                                        }
                                        onChange={e =>
                                            this.formChangeHandler(e, key, this.props.editedObjectName)
                                        }
                                    />
                                    {   key === "mot" || key === "servis" ||   key === "appointment" ? this.props.editedObjectName !== 'newCar' ? <div className="action-button" onClick={() =>
                                        this.addYear(this.state[this.props.editedObjectName][key], key)}
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
