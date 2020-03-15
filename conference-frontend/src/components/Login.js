import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username : "",
            password: ""
        }
    }

    sendData = () => {
        var apiLoginUrl = "whatever";
        var payload = {
            "username" : this.state.username,
            "password" : this.state.password
        };

        axios.post(apiLoginUrl, payload).then((response) => {
            // TODO 
            alert(response.status);
        });
    }
    render() {
        return (
            <div class="centered">
				<div class="demo-card-wide mdl-card mdl-shadow--2dp">
					<div class="mdl-card__title">
						<h2 class="mdl-card__title-text">Welcome to this year's edition!</h2>
					</div>
					<div class="mdl-card__supporting-text">
						<form action="#">
							<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded">
								<input class="mdl-textfield__input" type="text" id="email_textbox" onChange={ (e) => this.setState({username : e.target.value })}/>
								<i class="material-icons mdl-textfield__label__icon">mail</i>
                                <label class="mdl-textfield__label" for="sample1">Enter your e-mail</label>
							</div>
							<div class="mdl-textfield mdl-js-textfield">
								<input class="mdl-textfield__input" type="password" id="password_textbox" onChange={ (e) => this.setState({password : e.target.value })}/>
								<label class="mdl-textfield__label" for="sample2">Enter your password</label>
                                <i class="material-icons mdl-textfield__label__icon">lock</i>
							</div>
						</form>
					</div>
					<div class="mdl-card__actions mdl-card--border">
						<a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="/">Login</a>
						<a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="/signup">New user? Sign up here!</a>
					</div>
				</div>
			</div>
        );
    }
};
export default Login;