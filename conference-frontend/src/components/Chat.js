import React, { Component } from 'react';
import SockJsClient from 'react-stomp';
import Toolbar from './Toolbar';
import "./Chat.css";
class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chatType: this.props.location.state.chatType,
            email: this.props.location.state.email,
            token: this.props.location.state.token,
            roles: this.props.location.state.roles,
            message: "",
            topic: this.props.location.state.topic,
            // usernamePage : document.querySelector('#username-page')
        };
    }

    // chatPage = document.querySelector('#chat-page');
    // usernameForm = document.querySelector('#usernameForm');
    // messageForm = document.querySelector('#messageForm');
    // messageInput = document.querySelector('#message');
    // messageArea = document.querySelector('#messageArea');
    // connectingElement = document.querySelector('.connecting');

    startChat = () => {
        document.getElementById("username-page").classList.add("hidden");
        this.clientRef.sendMessage(this.state.topic, JSON.stringify({ sender: this.state.email, type: "JOIN" }));
        //this.sendMessage(JSON.stringify({ sender: this.state.email, type: "JOIN" }));
        document.getElementById("chat-page").classList.remove("hidden");
    }

    sendMessage = () => {
        var chatMessage = {
            sender: this.state.email,
            content: this.state.message,
            type: 'CHAT'
        };
        this.clientRef.sendMessage(this.state.topic, JSON.stringify(chatMessage));
    }

    receivedMessage = (payload) => {
        var messageArea = document.querySelector('#messageArea');
        var message = payload;
        var messageElement = document.createElement('li');


        if (message.type === 'JOIN') {
            messageElement.classList.add('event-message');
            message.content = message.sender + ' joined!';
        } else {
            messageElement.classList.add('chat-message');

            var avatarElement = document.createElement('i');
            var avatarText = document.createTextNode(message.sender[0]);
            avatarElement.appendChild(avatarText);
            avatarElement.style['background-color'] = this.getAvatarColor(message.sender);

            messageElement.appendChild(avatarElement);

            var usernameElement = document.createElement('span');
            var usernameText = document.createTextNode(message.sender);
            usernameElement.appendChild(usernameText);
            messageElement.appendChild(usernameElement);
        }

        var textElement = document.createElement('p');
        var messageText = document.createTextNode(message.content);
        textElement.appendChild(messageText);
        messageElement.appendChild(textElement);

        document.getElementById("messageArea").appendChild(messageElement);
        document.getElementById("messageArea").scrollTop = document.getElementById("messageArea").scrollHeight;
    }



    getAvatarColor = (messageSender) => {

        var colors = [
            '#2196F3', '#32c787', '#00BCD4', '#ff5652',
            '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
        ];
        var hash = 0;
        for (var i = 0; i < messageSender.length; i++) {
            hash = 31 * hash + messageSender.charCodeAt(i);
        }
        var index = Math.abs(hash % colors.length);
        return colors[index];
    }

    WebSocketConnection = () => {
        return (
            <div>
                <SockJsClient url='http://localhost:8080/ws' topics={[this.state.topic]}
                    onMessage={(msg) => this.receivedMessage(msg)} onConnect={console.log("Connected")}
                    ref={(client) => { this.clientRef = client }} />
            </div>
        );
    }
    render() {
        return (
            <div>
                <this.WebSocketConnection />
                <Toolbar />
                <div id="username-page">
                    <div class="username-page-container">
                        <h1 class="title">Welcome to the {this.state.chatType} chatroom!</h1>
                        {/* <form id="usernameForm" name="usernameForm"> */}
                        <div class="form-group">
                            <input type="text" id="name" placeholder={this.state.email} autocomplete="off" class="form-control" />
                        </div>
                        <div class="form-group">
                            <button type="submit" class="accent username-submit" onClick={this.startChat}>Join chat</button>
                        </div>
                        {/* </form> */}
                    </div>
                </div>

                <div id="chat-page" class="hidden">
                    <div class="chat-container">
                        <div class="chat-header">
                            <h4>Welcome to the {this.state.chatType} chatroom!</h4>
                        </div>
                        <div class="connecting">

                        </div>
                        <ul id="messageArea">

                        </ul>
                        <div id="messageForm" name="messageForm">
                            <div class="form-group">
                                <div class="input-group clearfix">
                                    <input type="text" id="message" placeholder="Type a message..." autocomplete="off"
                                        class="form-control" onChange={(e) => this.setState({ message: e.target.value })} />
                                    <button type="submit" class="primary" onClick={() => this.sendMessage()}>Send</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;