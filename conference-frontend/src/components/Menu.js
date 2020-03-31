import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


class Menu extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            userId: this.props.location.state.userId,
            email: this.props.location.state.email,
            token: this.props.location.state.token,
            roles: this.props.location.state.roles,
        }

    }


    redirect = (value) => {
        let path;
        if (value === 1)
            path = '/filter'
        if (value === 2)
            path = '/upload'
        if (value === 3)
            path = '/talk'
        if (value === 4)
            path = '/manage'

        this.props.history.push({
            pathname: path,
            state: {
                email: this.state.email,
                token: this.state.token,
                roles: this.state.received_roles,
                userId: this.state.userId
            }
        });

    }

    render() {
        return (

            <div className="centered">

                <div className="demo-card-wide mdl-card mdl-shadow--2dp">
                    <div className="mdl-card__title">
                        <h2 className="mdl-card__title-text">Menu </h2>
                    </div>
                    <h1>                 </h1>
                    <div class="mdl-textfield mdl-js-textfield">
                    <button style={{ width: '200px' }} className="mdl-button mdl-js-button mdl-button--raised" onClick={(e) => { this.redirect(1) }}>Filter Articles</button>
                    </div>
                    <div class="mdl-textfield mdl-js-textfield">
                        <button style={{ width: '200px' }} className="mdl-button mdl-js-button mdl-button--raised" onClick={(e) => { this.redirect(2) }}>Upload Articles</button>
                    </div>
                    <div class="mdl-textfield mdl-js-textfield">
                        <button style={{ width: '200px' }} className="mdl-button mdl-js-button mdl-button--raised" onClick={(e) => { this.redirect(3) }}>Register for a talk</button>
                    </div>
                    <div class="mdl-textfield mdl-js-textfield">
                        <button style={{ width: '200px' }} className="mdl-button mdl-js-button mdl-button--raised" onClick={(e) => { this.redirect(4) }}>Manage rooms</button>
                    </div>
                </div>
            </div>

        );
    }
};
export default withRouter(Menu);