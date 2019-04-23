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
        
                    focusOn: "editedCar",
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
                        {/* {this.displayActions(this.state[this.state.objectName].id)}
                        {this.displayList(
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

                {this.state.focusOn !== "" && this.state.focusOn !== "newCar"  && this.state.focusOn !== "newCustomer" ? console.log('notable')
                // this.displayTable(this.state.tableName) 
                : null}
            </div>
        </div>
    )
    }
}
