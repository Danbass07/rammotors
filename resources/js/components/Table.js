import React, { Component } from "react";

export default class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="wrapper">
                <div className="workfield">
                    <div className="header-row">
                        {this.props.tableName === "displayCars" ||
                        this.props.tableName === "displayCustomers" ? (
                            <div>
                                <button
                                    className={
                                        this.props.tableName === "displayCars"
                                            ? "header-table-button active"
                                            : "header-table-button"
                                    }
                                    onClick={() =>
                                        this.props.tableNameHandler(
                                            "displayCars"
                                        )
                                    }
                                >
                                    CARS
                                </button>
                                <button
                                    className={
                                        this.props.tableName ===
                                        "displayCustomers"
                                            ? "header-table-button active"
                                            : "header-table-button"
                                    }
                                    onClick={() =>
                                        this.props.tableNameHandler(
                                            "displayCustomers"
                                        )
                                    }
                                >
                                    CUSTOMERS
                                </button>
                            </div>
                        ) : (
                            <h2>
                                {this.props.tableName
                                    .toUpperCase()
                                    .replace("DISPLAY", "")}
                            </h2>
                        )}
                    </div>
                    {this.props.tableName === "displayCustomers" ? (
                        <div className="header-row">
                            <div
                                onClick={() => this.props.sortingHandler("name")}
                                className="header-item"
                            >
                                NAME
                            </div>
                            <div
                                onClick={() =>
                                    this.props.sortingHandler("surname")
                                }
                                className="header-item"
                            >
                                SURNAME
                            </div>
                            <div
                                onClick={() => this.props.sortingHandler("phone")}
                                className="header-item"
                            >
                                PHONE
                            </div>
                            <div
                                onClick={() => this.props.sortingHandler("email")}
                                className="header-item"
                            >
                                EMAIL
                            </div>
                            <div
                                onClick={() => this.props.sortingHandler("notes")}
                                className="header-item"
                            >
                                NOTES
                            </div>
                        </div>
                    ) : (
                        <div className="header-row">
                            <div
                                onClick={() =>
                                    this.props.sortingHandler("registration")
                                }
                                className="header-item"
                            >
                                REGISTRATION
                            </div>
                            <div
                                onClick={() => this.props.sortingHandler("make")}
                                className="header-item"
                            >
                                TYPE
                            </div>
                            <div
                                onClick={() => this.props.sortingHandler("mot")}
                                className="header-item"
                            >
                                MOT
                            </div>
                            <div
                                onClick={() =>
                                    this.props.sortingHandler("servis")
                                }
                                className="header-item"
                            >
                                SERVICE
                            </div>
                            <div
                                onClick={() =>
                                    this.props.sortingHandler("appointment")
                                }
                                className="header-item"
                            >
                                APPOINTMENT
                            </div>
                        </div>
                    )}
                    <div className="table-container" id="style-1">
                        <table className="table-body" id="style-1">
                            {this.props.tableName === "displayCustomers" ? (
                                <thead className="table-head">
                                    <tr>
                                        <th>NAME</th>
                                        <th>SURNAME</th>
                                        <th>PHONE</th>
                                        <th>EMAIL</th>
                                        <th>NOTES</th>
                                    </tr>
                                </thead>
                            ) : (
                                <thead className="table-head">
                                    <tr>
                                        <th>REGISTRATION</th>
                                        <th>MAKE</th>
                                        <th>MOT</th>
                                        <th>SERVICE</th>
                                        <th>APPOINTMENT</th>
                                    </tr>
                                </thead>
                            )}
                            {this.props.tableName === "displayCustomers" ? (
                                <tbody className="table-data" id="style-1">
                                    {this.props.displayData.map(data => (
                                        <tr
                                            className="table-data-row"
                                            key={
                                                data[Object.keys(data)[0]] +
                                                "customer"
                                            }
                                            onClick={() =>
                                                this.props.editHandler(
                                                    data,
                                                    "editedCustomer"
                                                )
                                            }
                                        >
                                            <th className="table-item">
                                                {data[
                                                    Object.keys(data)[1]
                                                ].toUpperCase()}{" "}
                                            </th>
                                            <th className="table-item">
                                                {data[Object.keys(data)[2]]}
                                            </th>
                                            <th className="table-item">
                                                {data[Object.keys(data)[3]]}
                                            </th>
                                            <th className="table-item">
                                                {data[Object.keys(data)[4]]}
                                            </th>
                                            <th className="table-item">
                                                {data[Object.keys(data)[5]]}
                                            </th>
                                        </tr>
                                    ))}
                                </tbody>
                            ) : (
                                <tbody className="table-data" id="style-1">
                                    {this.props.displayData.map(data => (
                                        <tr
                                            className="table-data-row"
                                            key={data[Object.keys(data)[0]]}
                                            onClick={() =>
                                                this.props.editHandler(
                                                    data,
                                                    "editedCar"
                                                )
                                            }
                                        >
                                            <th className="table-item">
                                                {data[
                                                    Object.keys(data)[2]
                                                ].toUpperCase()}
                                            </th>
                                            <th className="table-item">
                                                {data[Object.keys(data)[3]]}
                                            </th>
                                            <th className="table-item">
                                                {data[Object.keys(data)[4]]}
                                            </th>
                                            <th className="table-item">
                                                {data[Object.keys(data)[5]]}
                                            </th>
                                            <th className="table-item">
                                                {data[Object.keys(data)[6]]}
                                            </th>
                                        </tr>
                                    ))}
                                </tbody>
                            )}
                        </table>
                    </div>
                    <div className="under-table-field">
                        <button
                            className="under-table-button"
                            onClick={() =>
                                this.props.addNewButtonHandler(
                                    this.props.tableName
                                )
                            }
                        >
                            ADD NEW
                        </button>

                        <input
                            className="search-input"
                            onChange={e => this.props.searchHandler(e, this.props.tableName)}
                            value={this.props.searchValue}
                            placeholder="Click and type to search here ..."
                        />

                        <button
                            className="under-table-button"
                            onClick={() =>
                                this.props.tableNameHandler("displayDeleted")
                            }
                        >
                            DELETED
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
