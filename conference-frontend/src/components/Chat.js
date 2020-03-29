import React, { Component } from 'react';
import SockJsClient from 'react-stomp';

class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chatType : this.props.location.state.chatType,
            email: this.props.location.state.email,
            token: this.props.location.state.token,
            roles: this.props.location.state.roles,
            message: ""
        };
    }

    WebSocketConnection = () =>{
        var topics = [];
        var destination = "";
        if (this.state.chatType === "public"){
            topics.push("/topic/public");
            destination = "/topic/public";
        }
        else{
            topics.push("/topic/organizers");
            destination = "/topic/organizers";
        }
        return (
            <div>
        <SockJsClient url='http://localhost:8080/ws' topics={topics} 
        onMessage={(msg) => { alert(msg); }} onConnect={ () => { alert("Connected!") } }
        ref={ (client) => { this.clientRef = client }} />
        <button id="send" onClick={() => this.sendMessage(destination, "Hello!!!")}>Send message</button>
        </div>
        );
    }

    sendMessage = (destination, msg) => {
        this.clientRef.sendMessage(destination, msg);
      }
    render() {
        return (
            <this.WebSocketConnection />
        );
    }
}

export default Chat;