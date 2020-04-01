import React, { Component } from "react";

export default class Messages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [
                {
                    body: "loading"
                },
                {
                    body: "loading"
                }
            ]
        };
    }
    submitHandler(e, index) {
        // submit both of above new or edit  need to update state reset search value

        e.preventDefault();
        console.log(this.state.messages[index]);
        axios
            .put(`/messages/${index + 1}/update`, {
                body: this.state.messages[index].body
            })
            .then(response => {
                console.log(response.data.body);
            });
    }

    formChangeHandler(e, number) {
        const messages = [...this.state.messages];
        messages[number].body = e.target.value;
        this.setState({
            messages: messages
        });
    }

    componentDidMount() {
        axios.get("/messages").then(response =>
            this.setState({
                messages: [...response.data]
            })
        );
    }
    sendMessage(cid) {
        axios
            .get(
                `/customers/${this.props.editedObject.customer_id}/sendMessage/${cid}`
            )
            .then(() => {});
    }

    render() {
        return (
            <div className="focus-messages">
                <form onSubmit={e => this.submitHandler(e, 0)}>
                    <textarea
                        className="focus-message"
                        type="text"
                        name="name"
                        value={this.state.messages[0].body}
                        onChange={e => this.formChangeHandler(e, 0)}
                    />
                    <input type="submit" value="SAVE" />
                    <input
                        onClick={() => {
                            this.sendMessage(0);
                        }}
                        value="SEND"
                    />
                </form>

                <form onSubmit={e => this.submitHandler(e, 1)}>
                    <textarea
                        className="focus-message"
                        type="text"
                        name="name"
                        value={this.state.messages[1].body}
                        onChange={e => this.formChangeHandler(e, 1)}
                    />

                    <input type="submit" value="SAVE" />
                    <input
                        onClick={() => {
                            this.sendMessage(1);
                        }}
                        value="SEND"
                    />
                </form>
            </div>
        );
    }
}
