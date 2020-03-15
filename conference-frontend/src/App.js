import React from 'react';
import './App.css';
import Toolbar from './components/Toolbar';

function App(props) {
	return (
		<div>
			<Toolbar>
				<a className="mdl-navigation__link" href="/">About</a>
				<a className="mdl-navigation__link" href="/">View statistics</a>
			</Toolbar>
			{props.children}
		</div>
	);
}

export default App;
