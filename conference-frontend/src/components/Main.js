import React, { Component } from 'react';
import Toolbar from './Toolbar';

class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: this.props.location.state.email,
            token: this.props.location.state.token,
            roles: this.props.location.state.roles,
        };
    }

    redirect = (chatType, topic) => {
        this.props.history.push({
            pathname: '/chat',
            state: {
                email: this.state.email,
                token: this.state.token,
                roles: this.state.received_roles,
                chatType : chatType,
                topic: topic
            }
        });
    }

    ChatLinks = () => {
        if(this.state.roles.includes("organizer")){
            return <Toolbar>
                <button className="mdl-button" onClick = {() => this.redirect("private", "/topic/organizers")}>Organizer chat</button>
				<button className="mdl-button" onClick = {() => this.redirect("public", "/topic/public")}>Public chat</button>
            </Toolbar>
        }
        return <Toolbar>
        <button className="mdl-button" onClick = {() => this.redirect("public", "/topic/public")}>Public chat</button>
    </Toolbar>
    };

    render(){
        return(
            <div>
                <this.ChatLinks />
            </div>
        );
    }
}

export default Main;