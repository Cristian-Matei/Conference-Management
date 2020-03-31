import React, { Component } from 'react';
import axios from 'axios';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName : "",
            username: "",
            password: "",
            password2: "",
            affiliation : "",
            isParticipant : false,
            isSpeaker : false
        }
    }

    sendData = () => {

        var apiBaseUrl = "http://localhost:8080/auth/signup";
        let roles = [];
        if (this.state.isParticipant){
            roles.push({"roleName" : "participant"})
        }
        if (this.state.isSpeaker){
            roles.push({"roleName" : "speaker"})
        }
        var payload = {
            "firstName" : this.state.firstName,
            "lastName" : this.state.lastName,
            "email": this.state.email,
            "affiliation" : this.state.affiliation,
            "password": this.state.password,
            "roles" : roles
        };
        console.log(payload);

        axios.post(apiBaseUrl, payload).then((response) => {
            if (response.status === 201) {
                //this.setState({ token: response.data.accessToken });
                //alert(this.state.token);
                //this.redirect();
                alert("success");
            }
            if (response.status === 401) {
                alert("Incorrect credentials! Try again");
            }
        });
    }
    render() {
        return (
            
            <div class="centered">
                <div class="demo-card-wide mdl-card mdl-shadow--2dp">
                    <div class="mdl-card__title">
                        <h2 class="mdl-card__title-text">Enter your details below</h2>
                    </div>
                    <div class="mdl-card__supporting-text">
                        
                        <form action="#">
                            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded">
                                <input class="mdl-textfield__input" type="text" id="firstname_textbox" onChange={(e) => this.setState({ firstName: e.target.value })} />
                                <i class="material-icons mdl-textfield__label__icon">account_circle</i>
                                <label class="mdl-textfield__label" for="firstname_textbox">Enter your first name</label>
                            </div>
                            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded">
                                <input class="mdl-textfield__input" type="text" id="lastname_textbox" onChange={(e) => this.setState({ lastName: e.target.value })} />
                                <i class="material-icons mdl-textfield__label__icon">account_circle</i>
                                <label class="mdl-textfield__label" for="lastname_textbox">Enter your first and last name</label>
                            </div>
                            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded">
                                <input class="mdl-textfield__input" type="text" id="email_textbox" onChange={(e) => this.setState({ email: e.target.value })} />
                                <i class="material-icons mdl-textfield__label__icon">mail</i>
                                <label class="mdl-textfield__label" for="email_textbox">Enter your e-mail</label>
                            </div>
                            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded">
                                <input class="mdl-textfield__input" type="text" id="affiliation_textbox" onChange={(e) => this.setState({ affiliation: e.target.value })} />
                                <i class="material-icons mdl-textfield__label__icon">school</i>
                                <label class="mdl-textfield__label" for="affiliation_textbox">What's your affiliation?</label>
                            </div>
                            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded">
                                <input class="mdl-textfield__input" type="password" id="password_textbox" onChange={(e) => this.setState({ password: e.target.value })} />
                                <label class="mdl-textfield__label" for="password_textbox">Enter your password</label>
                                <i class="material-icons mdl-textfield__label__icon">lock</i>
                            </div>
                            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded">
                                <input class="mdl-textfield__input" type="password" id="password2_textbox" onChange={(e) => this.setState({ password2: e.target.value })} />
                                <label class="mdl-textfield__label" for="password2_textbox">Confirm password</label>
                                <i class="material-icons mdl-textfield__label__icon">lock</i>
                            </div>
                            <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="speaker_checkbox">
                                <input type="checkbox" id="speaker_checkbox" class="mdl-checkbox__input" onChange = {(e) => this.setState({isSpeaker : e.target.checked})}/>
                                <span class="mdl-checkbox__label">I am a speaker</span>
                            </label>
                            <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="participant_checkbox">
                                <input type="checkbox" id="participant_checkbox" class="mdl-checkbox__input" onChange = {(e) => this.setState({isParticipant : e.target.checked})}/>
                                <span class="mdl-checkbox__label">I'm a participant</span>
                            </label>
                        </form>
                    </div>
                    <div class="mdl-card__actions mdl-card--border">
                    <button class="mdl-button mdl-js-button mdl-button--raised" onClick={() => this.sendData()}>Signup</button>
                        {/* <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="/">Sign up now!</a> */}
                        <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="/">Go back to the login page</a>
                    </div>
                </div>
            </div>
        );
    }
};
export default Signup;
