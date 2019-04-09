import React, { Component } from "react";

export default class TableTwo extends Component {
    constructor(props) {
        super(props);
        this.state = {
   
            displayData: [
                
            ],
            header: [
                 {  
                     
                    
                    registration: "",
                    make: "",
                    mot: "",
                    servis: "",
                    info: "",
                    customer: {
                        name: "",
                        surname: ""
                    },
                
            
                },
                {
                    name: "",
                    surname: "",
                    phone: "",
                    info: ""
                },
                {
                    registration: "",
                    make: "",
                    mot: "",
                    servis: "",
                    info: "",
                    customer: {
                        name: "",
                        surname: ""
                    },
            
                },
                {
                    registration: "",
                    make: "",
                    mot: "",
                    servis: "",
                    appointment: "",
                    info: "",
            
                },
            ],
            tableNumber: 0,
            ascending: true,
            search: '',
          
        };
    }
    searchHandler(e) {
        /// search or clear search value

    // functions variables
        let searchResult = [];
        let search 
        if (e === undefined) {
            // if we change table clear search results
         
            search = ''
        } else { search = e.target.value}
           
            // if we fill search input
            let searchedDisplayData = [...this.state.displayData]
            this.setState(
                {
                    search: search // set search value
                },

                () => {
                    // and imieditly perform search filter

                    this.props.displayDataArray[this.state.tableNumber].map(item => {
                        for (const property in item) {
                            if (
                                item.hasOwnProperty(property) &&
                                typeof item[property] === "string"
                            ) {
                                if (
                                    item[property]
                                        .toLowerCase()
                                        .includes(this.state.search) &&
                                    !searchResult.includes(item)
                                ) {
                                    searchResult.push(item);
                                }
                            }
                        }
                    });
                    searchedDisplayData[this.state.tableNumber] = searchResult
                    this.setState({
                        //then update display state with same table name
                        displayData: [...searchedDisplayData],
                    });
                }
            );
        
    }
    sortingHandler(category) {
        // sorting alphabeticly DESC or ASC depend on clicked property (table head)
     
        let sortingData;

        sortingData = [...this.state.displayData];
       
        sortingData[this.state.tableNumber] = sortingData[this.state.tableNumber].sort(
            this.compareValues(category, this.state.ascending)
        );
        this.setState({

            displayData: [...sortingData],
            ascending: !this.state.ascending
        });
    }
  
    componentWillReceiveProps(nextProps)
 {
     if(this.props !== nextProps) {

        this.setState({
     
            displayData: [... this.props.displayDataArray],
        })
    

     }

 }

    ////// helping fuctions
  
    compareValues(key, ascending = true) {
        /// sorting
        return function(a, b) {
            if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                // property doesn't exist on either object
                return 0;
            }

            const varA =
                typeof a[key] === "string" /// letter case insensitive
                    ? a[key].toUpperCase()
                    : a[key];
            const varB =
                typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

            let comparison = 0;
            if (varA > varB) {
                comparison = 1;
            } else if (varA < varB) {
                comparison = -1;
            }
            return ascending == false ? comparison * -1 : comparison;
        };
    }


    render() {
        if (this.state.displayData[this.state.tableNumber]===undefined) {
            return (<div>Table Has No Data</div>)
        }
       
        return (
            <div className="wrapper">
                <div className="workfield">
                    <div className="header-row">
                        {this.props.displayDataArray.length === 4 ? (
                            <div>
                                 <button
                                    className={
                                        this.state.tableNumber === 2
                                            ? "header-table-button active"
                                            : "header-table-button"
                                    }
                                    onClick={() =>{this.searchHandler();  this.setState({tableNumber: 2,})}}
                                >
                                    ALERTS
                                </button>
                                <button
                                    className={
                                        this.state.tableNumber === 0
                                            ? "header-table-button active"
                                            : "header-table-button"
                                    }
                                    onClick={() =>{ this.searchHandler(); this.sortingHandler('id'); this.setState({tableNumber: 0})}}
                                >
                                    CARS
                                </button>
                                <button
                                    className={
                                        this.state.tableNumber === 1
                                            ? "header-table-button active"
                                            : "header-table-button"
                                    }
                                    onClick={() =>{ this.searchHandler(); this.sortingHandler('id'); this.setState({tableNumber: 1})}}
                                >
                                    CUSTOMERS
                                </button>
                            </div>
                        ) : (
                            <h2>
                             MINI TABLE
                            </h2>
                        )}
                    </div> {/* end of header row*/}
        



                    <div className="header-row">

                        {Object.keys(this.state.header[this.state.tableNumber]).map((key, index) => {
                            return (

                                <div key={key+index}
                                onClick={() =>
                                    this.sortingHandler(key)
                                }
                                className="header-item"
                            >
                               {key.toUpperCase()}
                            </div>

                            )})}
                        
                 
                    </div>  {/* end of header row*/}
                    
                    <div className="table-container" id="style-1">
                        <table className="table-body" id="style-1">
                     
    
                                <tbody className="table-data" id="style-1">
                          
                                    { this.state.displayData[this.state.tableNumber].map((rowdata, index) => {
                                     
                                      return (

                                            <tr
                                            className="table-data-row"
                                            key={'row'+index}
                                        
                                            >
                                            {Object.entries(rowdata).map((data) => {
                                            

                                                return (
                                                    Object.keys(this.state.header[this.state.tableNumber]).map((key, index) => {
                                                        
                                                        if (data[0].toString() === key.toString()) {
                                                        
                                                            return (
                                                                <td
                                                                key={'data'+ index} 
                                                                className="table-item">
                                                                {typeof( data[1]) !== 'object' ? 
                                                                typeof(data[1]) === 'string' ? 
                                                                <p onClick={() => this.props.editHandler( rowdata, key ) }>
                                                                {data[1].toUpperCase()}</p> : data[1] : 
                                                                data[1] === null ? ' ' : 
                                                                
                                                                Object.keys(this.state.header[this.state.tableNumber][key]).map((key, index) => {
                                                                    return (
                                                                        Object.entries(data[1]).map( innerdata => {
                                                                        
                                                                            return (
                                                                                innerdata[0].toString() === key.toString() ?
    
                                                                               <p onClick={() => this.props.editHandler( innerdata, key ) }>{innerdata[1].toUpperCase()}</p>  : null
                                                                            )

                                                                            
                                                                           
                                                                         })
                                                                    )

                                                                   
                                                                    
                                                                }) 
                                                                } 
                                                            </td>
                                                            )
                                                        }
                                                        
                                                    })
                                                ) 

                                            
                                               
                                            })}
                                             
      
                                        </tr>
                                        
                                    )}) }    
                                </tbody> 
                            
                        </table>
                    </div>
                    {this.props.displayDataArray.length === 4 ? <div className="under-table-field">
                        <button
                            className="under-table-button"

                            onClick={() =>
                                this.props.addNewButtonHandler()
                            }
                        >
                            ADD NEW
                        </button>

                        <input
                            className="search-input"
                            onChange={e => this.searchHandler(e, this.props.tableName)}
                            value={this.state.search}
                            placeholder="Click and type to search here ..."
                        />

                        <button
                            className="under-table-button"
                            onClick={() =>
                                this.setState({tableNumber: 3,})
                            }
                        >
                            DELETED
                        </button>
                    </div> : null}
                </div>
            </div>
        );
    }
}
