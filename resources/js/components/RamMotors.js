import React, { Component } from 'react';

export default class RamMotors extends Component {
    constructor(props) {
        super(props);
        this.state = {
                cars: [],
        };

    }
   
    componentWillMount() {
        
            axios.get('/cars').then(response =>
             this.setState({
                cars: [...response.data]
                 })
            );
            console.log(this.state);
        
    }
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Example Component</div>

                            <div className="card-body">
                                I'm an RamMotors
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


