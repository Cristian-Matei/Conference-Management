import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './components/Login';
import Signup from './components/Signup';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import FilterArticles from './components/FilterArticles';
import UploadArticles from './components/UploadArticles';
import Menu from './components/Menu';
import RegisterForATalk from './components/RegisterForATalk';

const routing = (
    <Router>
        <div>
            <Route exact path="/" component = {Homepage} />
            <Route path="/signup" component = {SignupPage} />
            <Route path="/filter" component = {FilterArticlesPage} />
            <Route path="/upload" component = {UploadArticlePage} />
            <Route path="/menu" component = {MenuPage} />
            <Route path="/talk" component = {RegisterForTalksPage} />
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

function FilterArticlesPage(){
    return(
        <App>
            <FilterArticles />
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

function MenuPage(){
    return(
        <App>
            <Menu />
        </App>
    )
}

function RegisterForTalksPage(){
    return(
        <App>
            <RegisterForATalk />
        </App>
    )
}

ReactDOM.render(routing, document.getElementById('root'));