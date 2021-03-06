import React, { Component } from "react";

export default class TableTwo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableNames: [
                'Cars', 'Customers', 'Alerts', 'DeletedCars', 'Zoomed'
            ],
   
            displayData: [
                
            ],
            header: [
                 {  
                     
                    
                    registration: "",
                    make: "",
                    mot: "",
                    servis: "",
                    customer: {
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
                    customer: {
                        surname: ""
                    },
            
                },
                {
                    registration: "",
                    make: "",
                    mot: "",
                    servis: "",
                    appointment: "",
            
                },
                {
                    registration: "",
                    make: "",
                    mot: "",
                    servis: "",
                    appointment: "",
            
                },
            ],
            tableNumber: 2,
            ascending: true,
            search: '',
            zoom: false,
          
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
    zoomHandler()  {
        
        this.searchHandler();
        this.sortingHandler('id');
       this.props.zoomHandler();
      
    }
  
    componentWillReceiveProps(nextProps)  /// 
 {
     if(this.props !== nextProps) {
        if (this.props.tableType === 'mini')  {
            this.setState({
     
                displayData: [... this.props.displayDataArray],
                tableNumber: 0,
                header: [
                    {  
                        
                       
                       
                       make: "",
                 
                       customer: {
                           name: ""
                       },
                       customer: {
                        surname: ""
                    },
                   
               
                   },
                ]
            })
           }
           if (this.props.tableType === 'main')  {
        this.setState({
     
            displayData: [... this.props.displayDataArray],
            tableNumber: 2,
        })
    
    }
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
        let mini = ''
        if (this.props.tableType === 'mini' && !this.state.zoom )  {
        mini = 'mini-'
       }

        return (
            <div className={mini+"wrapper"}>
                <div className={mini+"workfield"}>
                    
                        {this.props.tableType === 'main' ? (
                            <div className={mini+"header-row"}>
                                 <button
                                    className={
                                        this.state.tableNumber === 2
                                            ? "header-table-button active"
                                            : "header-table-button"
                                    }
                                    onClick={() =>{this.searchHandler();  this.setState({tableNumber: 2,})}}
                                >
                                    {this.state.tableNames[2]}
                                </button>
                                <button
                                    className={
                                        this.state.tableNumber === 0
                                            ? "header-table-button active"
                                            : "header-table-button"
                                    }
                                    onClick={() =>{ this.searchHandler(); this.sortingHandler('id'); this.setState({tableNumber: 0})}}
                                >
                                    {this.state.tableNames[0]}
                                </button>
                                <button
                                    className={
                                        this.state.tableNumber === 1
                                            ? "header-table-button active"
                                            : "header-table-button"
                                    }
                                    onClick={() =>{ this.searchHandler(); this.sortingHandler('id'); this.setState({tableNumber: 1})}}
                                >
                                    {this.state.tableNames[1]}
                                </button>
                                <button
                                    className={
                                        this.state.tableNumber === 4
                                            ? "header-table-button active"
                                            : "header-table-button"
                                    }
                                    onClick={() =>{ this.searchHandler(); this.sortingHandler('id'); this.setState({tableNumber: 4})}}
                                >
                                    {this.props.zoomName}
                                </button>
                            </div>
                        ) : ( this.props.tableType === 'mini' ? (
                            <div className={mini+"header-row"}>
                             <div onClick={() => this.zoomHandler()  } className={"mini-header-item"}>
                             {this.props.tableName}
                             </div>
                             <div className={"mini-header-item"}>
                             {this.state.displayData[this.state.tableNumber].length}
                             </div>
                            </div>
                        ): null )}
                     {/* end of 1st header row*/}
        



                    <div className={mini+"header-row"}>

                        {Object.keys(this.state.header[this.state.tableNumber]).map((key, index) => {
                            return ( // table columns names and sorting by them
                                <div 
                                    key={key+index}
                                    onClick={() => this.sortingHandler(key)}
                                    className={mini+"header-item"}
                                >
                               {key === 'servis' ? 'SERVICE' : key.toUpperCase() /// little datatable bad spelling to much bother to change ATM ////// :)
                               } 
                                </div>
                            )})}
   
                    </div>  {/* end of 2nd header row*/}
                    
                    <div className={mini+"table-container"} id="style-1">
                        <table className={mini+"table-body"} id="style-1">
                            <tbody className={mini+"table-data"} id="style-1">
                                { this.state.displayData[this.state.tableNumber].map((rowdata, index) => {
                                    return (

                                            <tr             /// table main content
                                            className={mini+"table-data-row"}
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
                                                                <p className={'data-link'} onClick={(e) => 
                                                                this.props.editHandler( rowdata,  "edited"+this.state.tableNames[this.state.tableNumber], true) }>
                                                                {data[1].toUpperCase()}
                                                                </p> : data[1] : 
                                                                data[1] === null ? ' ' : 
                                                                
                                                                Object.keys(this.state.header[this.state.tableNumber][key]).map((key) => {
                                                                    return (
                                                                        Object.entries(data[1]).map( innerdata => {
                                                                        
                                                                            return (
                                                                                innerdata[0].toString() === key.toString() ?
    
                                                                               <div className={'data-link'} onClick={() => this.props.editHandler( data[1] , 

                                                                               "edited"+this.state.tableNames[1]) 
                                                                               
                                                                               
                                                                               }>
                                                                               {innerdata[1].toUpperCase()}
                                                                               </div>  : null
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
                    {this.props.tableType === 'main'  ? <div className="under-table-field">
                        <button
                            className="under-table-button"

                            onClick={() => {
                                if(this.state.tableNumber !== 1) {
                                    this.props.editHandler({}, "newCar", "newCar")
                                } else {
                                    this.props.editHandler({}, "newCustomer", "newCustomer")
                                 
                                }
                                
                            }
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
                                this.setState({tableNumber: 3})
                            }
                        >
                            DELETED CARS
                        </button>
                    </div> : null}
                </div>
            </div>
        );
    }
}
