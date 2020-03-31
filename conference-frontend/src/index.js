import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './components/Login';
import Signup from './components/Signup';
import Chat from './components/Chat';
import Filter from './components/FilterArticles';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import FilterArticles from './components/FilterArticles';
import UploadArticles from './components/UploadArticles';
import Menu from './components/Menu';

const routing = (
    <Router>
        <div>
            <Route exact path="/" component = {Homepage} />
            <Route path="/signup" component = {SignupPage} />
            <Route path="/chat" component = {Chat} />
            <Route path="/filter" component = {FilterArticlesPage} />
            <Route path="/upload" component = {UploadArticlePage} />
            <Route path="/menu" component = {Menu} />
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

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
