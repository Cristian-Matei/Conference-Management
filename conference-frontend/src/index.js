import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './components/Login';
import Signup from './components/Signup';

import { Route, BrowserRouter as Router } from 'react-router-dom';

import UploadArticles from './components/UploadArticles';
import RegisterForATalk from './components/RegisterForATalk';
import ManageRooms from './components/ManageRooms';
const routing = (
    <Router>
        <div>
            <Route exact path="/" component = {Homepage} />
            <Route path="/signup" component = {SignupPage} />
         
            <Route path="/upload" component = {UploadArticlePage} />
            <Route path="/talk" component = {RegisterForATalkPage} />
            <Route path="/manage" component = {ManageRoomsPage}/>
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









function UploadArticlePage() {
    return(
        <App>
            <UploadArticles />
        </App>
    )
}

function RegisterForATalkPage(){
    return(
        <App>
            <RegisterForATalk />
        </App>
    )
}

function ManageRoomsPage(){
    return(
        <App>
            <ManageRooms />
        </App>
    )
}

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
