import React, { Component } from "react";

export default class MiniTable extends Component {
  
    render() {
        return (
            <div className="mini-wrapper">
                <div className="mini-workfield">
                    <div className="mini-header">
                        <div
                            className="mini-header-item"
                            onClick={() =>
                                this.props.focusOnTableHandler(
                                    this.props.tableName
                                )
                            }
                        >
                            {this.props.tableName
                                .toUpperCase()
                                .replace("DISPLAY", "")}
                        </div>
                    </div>
                    <div className="mini-header">
                        <div
                            onClick={() => this.props.sortingHandler("registration")}
                            className="mini-header-item"
                        >
                            MAKE
                        </div>
                        <div
                            onClick={() => this.props.sortingHandler("make")}
                            className="mini-header-item"
                        >
                            NAME
                        </div>
                        <div
                            onClick={() => this.props.sortingHandler("customers")}
                            className="mini-header-item"
                        >
                            SURNAME
                        </div>
                    </div>
                    <div className="mini-table-container" id="style-1">
                        <table className="mini-table-body" id="style-1">
                            <thead className="mini-table-head">
                                <tr>
                                    <th>MAKE</th>
                                    <th>NAME</th>
                                    <th>SURNAME</th>
                                </tr>
                            </thead>

                            <tbody className="mini-table-data" id="style-1">
                                {this.props.displayCars.map(car => {
                                    return (
                                        <tr
                                            key={car.id+this.props.tableName}
                                            className="mini-table-data-row"
                                           
                                         
                                        >
                                            <th onClick={() =>
                                                            this.props.editCarHandler(car)
                                                        }
                                                className="mini-table-item">
                                            {car.make}
                                            </th>
                                           

                                            {this.props.customers.map(
                                                customer => {
                                                    return customer.id === car.customer_id ? (
                                                        <React.Fragment key={customer.name} >
                                                        <th key={customer.name} className="mini-table-item">
                                                        {customer.name}
                                                        </th>
                                                        <th key={customer.id} className="mini-table-item">
                                                            {customer.surname}
                                                        </th>
                                                        </React.Fragment>
                                                    ) : null;
                                                }
                                            )}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
