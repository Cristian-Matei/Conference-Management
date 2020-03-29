import React, { Component } from 'react';
import axios from 'axios';
import { withRouter} from 'react-router-dom';
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email : "",
            password: "",
            token: ""
        }
    }

    redirect = () => {
        this.props.history.push({
            pathname: '/chat',
            state: {
                email: this.state.email,
                token: this.state.token
            }
        });
    }

    sendData = () => {

        var apiBaseUrl = "http://localhost:8080/auth/login";
        var payload = {
            "email": this.state.email,
            "password": this.state.password
        };

        axios.post(apiBaseUrl, payload).then((response) => {
            if (response.status === 200) {
                this.setState({ token: response.data.accessToken });
                //alert(this.state.token);
                this.redirect();
                //alert(response.data.accessToken);
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
						<h2 class="mdl-card__title-text">Welcome to this year's edition!</h2>
					</div>
					<div class="mdl-card__supporting-text">
						<form action="#">
							<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded">
								<input class="mdl-textfield__input" type="text" id="email_textbox" onChange={ (e) => this.setState({email : e.target.value })}/>
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
                        
                    <button class="mdl-button mdl-js-button mdl-button--raised" onClick={() => this.sendData()}>Login</button>
                    {/* <button class="mdl-button mdl-js-button mdl-button--raised" onClick={() => this.props.history.push({ "pathname" : "/signup"})}>Sign up</button> */}
					<a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="/signup">New user? Sign up here!</a>
					</div>
				</div>
			</div>
        );
    }
};
export default withRouter(Login);