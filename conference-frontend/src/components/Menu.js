import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Toolbar from './Toolbar';


class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.location.state.userId,
            email: this.props.location.state.email,
            token: this.props.location.state.token,
            roles: this.props.location.state.roles,
            speaker: false,
            participant: false,
            organizer: false
        }
        
        
    }
    componentDidMount(){
        for(var i=0; i<this.state.roles.length;i++){
            console.log(this.state.roles[i]);
            if(this.state.roles[i]=='speaker')
                this.setState({speaker:true});
            if(this.state.roles[i]=="participant")
                this.setState({participant:true});
            if(this.state.roles[i]=="organizer")
                this.setState({organizer:true});
        }
       
    }

    redirect = (value) => {
        let path;
        if (value === 1)
            path = '/filter'
        if (value === 2)
            path = '/upload'
        if (value === 3)
            path = '/talk'
        if (value === 4)
            path = '/manage'

        this.props.history.push({
            pathname: path,
            state: {
                email: this.state.email,
                token: this.state.token,
                roles: this.state.received_roles,
                userId: this.state.userId
            }
        });

    }

    chatRedirect = (chatType, topic) => {
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
        if (this.state.roles.includes("organizer")) {
            return <Toolbar>
                <button className="mdl-button" onClick={() => this.chatRedirect("private", "/topic/organizers")}>Organizer chat</button>
                <button className="mdl-button" onClick={() => this.chatRedirect("public", "/topic/public")}>Public chat</button>
            </Toolbar>
        }
        return <Toolbar>
            <button className="mdl-button" onClick={() => this.chatRedirect("public", "/topic/public")}>Public chat</button>
        </Toolbar>
    };

    render() {
        return (
            <div>
                <this.ChatLinks />
                <div className="centered">

                    <div className="demo-card-wide mdl-card mdl-shadow--2dp">
                        <div className="mdl-card__title">
                            <h2 className="mdl-card__title-text">Menu </h2>
                        </div>
                        <h1>              </h1>
                        <div class="mdl-textfield mdl-js-textfield">
                            <button style={{ width: '200px' }} className="mdl-button mdl-js-button mdl-button--raised" onClick={(e) => { this.redirect(1) }}>Filter Articles</button>
                        </div>
                        {(this.state.speaker || this.state.organizer) &&
                        <div class="mdl-textfield mdl-js-textfield">
                            <button style={{ width: '200px' }} className="mdl-button mdl-js-button mdl-button--raised" onClick={(e) => { this.redirect(2) }}>Upload Articles</button>
                        </div>
                        }
                        <div class="mdl-textfield mdl-js-textfield">
                            <button style={{ width: '200px' }} className="mdl-button mdl-js-button mdl-button--raised" onClick={(e) => { this.redirect(3) }}>Register for a talk</button>
                        </div>
                        {this.state.organizer &&
                        <div class="mdl-textfield mdl-js-textfield">
                            <button style={{ width: '200px' }} className="mdl-button mdl-js-button mdl-button--raised" onClick={(e) => { this.redirect(4) }}>Manage talks</button>
                        </div>
                        }
                    </div>
                </div>
            </div>

        );
    }
};
export default withRouter(Menu);