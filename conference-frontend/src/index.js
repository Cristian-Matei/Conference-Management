import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './components/Login';
import Signup from './components/Signup';
import FilterArticles from './components/FilterArticles';
import Menu from './components/Menu';
import Upload from './components/Upload';
import { Route, BrowserRouter as Router } from 'react-router-dom';


const routing = (
    <Router>
        <div>
            <Route exact path="/" component = {Homepage} />
            <Route path="/signup" component = {SignupPage} />
            <Route path="/menu" component = {MenuPage} />
            <Route path="/filter" component = {FilterArticlesPage} />
            <Route path="/upload" component = {UploadPage} />
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
    );
}

function MenuPage(){
    return(
        <App>
            <Menu />
        </App>
    );
}

function FilterArticlesPage(){
    return(
        <App>
            <FilterArticles />
        </App>
    );
}

function UploadPage(){
    return(
        <App>
            <Upload />
        </App>
    );
}

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
