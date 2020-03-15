import React, { Component } from 'react';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
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
                                <input class="mdl-textfield__input" type="text" id="username_textbox" onChange={(e) => this.setState({ username: e.target.value })} />
                                <i class="material-icons mdl-textfield__label__icon">account_circle</i>
                                <label class="mdl-textfield__label" for="username_textbox">Enter your first and last name</label>
                            </div>
                            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded">
                                <input class="mdl-textfield__input" type="text" id="email_textbox" onChange={(e) => this.setState({ username: e.target.value })} />
                                <i class="material-icons mdl-textfield__label__icon">mail</i>
                                <label class="mdl-textfield__label" for="sample1">Enter your e-mail</label>
                            </div>
                            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded">
                                <input class="mdl-textfield__input" type="text" id="email_textbox" onChange={(e) => this.setState({ username: e.target.value })} />
                                <i class="material-icons mdl-textfield__label__icon">school</i>
                                <label class="mdl-textfield__label" for="sample1">What's your affiliation?</label>
                            </div>
                            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded">
                                <input class="mdl-textfield__input" type="password" id="password_textbox" onChange={(e) => this.setState({ password: e.target.value })} />
                                <label class="mdl-textfield__label" for="sample2">Enter your password</label>
                                <i class="material-icons mdl-textfield__label__icon">lock</i>
                            </div>
                            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded">
                                <input class="mdl-textfield__input" type="password" id="password_textbox" onChange={(e) => this.setState({ password: e.target.value })} />
                                <label class="mdl-textfield__label" for="sample2">Confirm password</label>
                                <i class="material-icons mdl-textfield__label__icon">lock</i>
                            </div>
                            <label class="mdl-checkbox mdl-js-checkbox" for="chkbox1">
                                <input type="checkbox" id="chkbox1" class="mdl-checkbox__input" />
                                <span class="mdl-checkbox__label">I am an author</span>
                            </label>
                            <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="chkbox2">
                                <input type="checkbox" id="chkbox2" class="mdl-checkbox__input" />
                                <span class="mdl-checkbox__label">I am a speaker</span>
                            </label>
                        </form>
                    </div>
                    <div class="mdl-card__actions mdl-card--border">
                        <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="/">Sign up now!</a>
                        <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="/">Go back to the login page</a>
                    </div>
                </div>
            </div>
        );
    }
};
export default Signup;
