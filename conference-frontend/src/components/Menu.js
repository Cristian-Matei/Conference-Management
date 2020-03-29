import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
           user: "aaa"
        }
    }

    redirectFilter = () => {
        
        this.props.history.push( {
            pathname: '/filter',
            state: {
                
            }
        });
    }

    redirectUpload = () => {
        
        this.props.history.push( {
            pathname: '/upload',
            state: {
                
            }
        });
    }

    render() {
        return (

            <div className="centered">
                
            <div className="demo-card-wide mdl-card mdl-shadow--2dp">
                <div className="mdl-card__title">
                    <h2 className="mdl-card__title-text">Menu</h2>
                </div>
                <div className="mdl-card__supporting-text">
                <button style={{width:'250px'}} className="mdl-button mdl-js-button mdl-button--raised" onClick={ this.redirectFilter}>Filter Articles</button>
                </div>
                <div className="mdl-card__supporting-text">
                    <button style={{width:'250px'}} className="mdl-button mdl-js-button mdl-button--raised" onClick={this.redirectUpload}>Upload Articles</button>
                </div>
                <div className="mdl-card__supporting-text">
                    <button style={{width:'250px'}} className="mdl-button mdl-js-button mdl-button--raised">Register for a talk</button>
                </div>
                <div className="mdl-card__supporting-text">
                    <button style={{width:'250px'}} className="mdl-button mdl-js-button mdl-button--raised">Manage rooms</button>
                </div>
            </div>
        </div>
        
        );
    }
};
export default withRouter(Menu);