import React from "react";

class Form extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            message: ''
        }
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onMessageChange = this.onMessageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateEmail(email) {
        if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email))
            return true;
        else
            return false;
    }

    validateMessage(message)
    {
        return !(message == "");
    }

    handleSubmit(event) {
        console.log("inside submit");
        let isValidEmail = this.validateEmail(this.state.email)
        let isValidMessage = this.validateMessage(this.state.message)

        if (!isValidEmail) {
            alert("wrong email");
            event.preventDefault();
        }
        if (!isValidMessage) {
            alert("wrong message");
            event.preventDefault();
        }
        if (isValidEmail && isValidMessage) {
            fetch('/submit-review', {
                method: "POST",
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
                if (response.status === 200) {
                    //alert("Message Sent."); // change to refresh feed with new entry
                } else {
                    alert("Message failed to send.")
                }
            })
        } else {
            event.preventDefault();
        }
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <input type="text" placeholder="Email" value={this.state.value} onChange={this.onEmailChange} />
                </div>
                <div>
                    <textarea type="text" placeholder="Message" value={this.state.value} onChange={this.onMessageChange} />
                </div>
                <input type="submit" value="Submit" />
            </form>
        );
    }

    onEmailChange(event) {
        this.setState({email: event.target.value})
    }

    onMessageChange(event) {
        this.setState({message: event.target.value})
    }
}

export default Form;