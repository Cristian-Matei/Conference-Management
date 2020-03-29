import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './components/Login';
import Signup from './components/Signup';
import Chat from './components/Chat';
import Main from './components/Main';
import { Route, BrowserRouter as Router } from 'react-router-dom';

const routing = (
    <Router>
        <div>
            <Route exact path="/" component = {Homepage} />
            <Route path="/signup" component = {SignupPage} />
            <Route path="/chat" component = {Chat} />
            <Route path="/main" component = {Main} />
        </div>
    </Router>
);

function Homepage(){
	return(
		<App>
			<Login />
		</App>
	);
}

function SignupPage(){
    return(
        <App>
            <Signup />
        </App>
    )
}
ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
