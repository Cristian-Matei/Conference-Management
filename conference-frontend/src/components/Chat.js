import React, { Component } from 'react';
import SockJsClient from 'react-stomp';

class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: this.props.location.state.email,
            token: this.props.location.state.token,
            message: ""
        };
    }

    sendMessage = (msg) => {
        this.clientRef.sendMessage('/topic/public', msg);
      }
    render() {
        return (
            <div>
                <SockJsClient url='http://localhost:8080/ws' topics={['/topic/public']} 
            onMessage={(msg) => { console.log(msg); }} onConnect={ () => { alert("Connected!") } }
            ref={ (client) => { this.clientRef = client }} />
            <div>Hello {this.state.email}!</div>
            <label for="fname">Enter your message here:</label>
  <input type="text" id="fname" name="fname" />
            <button id="send" onClick={() => this.sendMessage("Hello!!!")}>Send message</button>
            </div>
        );
    }
}

export default Chat;