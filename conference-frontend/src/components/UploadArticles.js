import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.location.state.userId,
            email: this.props.location.state.email,
            token: this.props.location.state.token,
            roles: this.props.location.state.roles,
        }
    }

    
    uploadArticle = () => {

        axios.post('http://localhost:8080/conference/articles/',
            {
            "title":this.refs.title.value,
            "author" : {"id":this.state.userId},
            "domain":this.refs.domain.value,
            "description":this.refs.abstract.value,
            "link": this.refs.link.value
            },{
            headers:{
                Authorization: `Bearer ${this.state.token}` }
            }
        ).then((response)=>{
            if(response.status === 200)
                alert('Added with success')
            else
                alert('A problem occured, please try again!');
        });
        
        
    }

    goBack = () => {
        this.props.history.push({
            pathname: '/menu',
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
                        <h2 className="mdl-card__title-text">Upload Article </h2>
                    </div>
                    <div>
                        <div >
                            <div >
                                <label className="mdl-text-field" htmlFor="title">Title   </label>
                                <input style={{ width: '200px' }} className="mdl-text-field__input" type="text" id="title" ref="title" />
                            </div>
                            <div>
                            <label className="mdl-text-field" htmlFor="link">Link</label>
                            <input style={{ width: '200px' }} className="mdl-text-field__input" type="text" id="link" ref="link" /></div><div>
                            <label className="mdl-text-field" htmlFor="domain">Domain   </label>
                            <input style={{ width: '200px' }} className="mdl-text-field__input" type="text" id="domain" ref="domain"/>
                            </div>
                        </div>
                        <h5 style={{ padding: '20px' }}>Description</h5>
                        <div class="mdl-textfield mdl-js-textfield">
                            <textarea className="mdl-textfield__input" type="text" rows="10" id="description" ref="abstract"></textarea>
                            <label className="mdl-textfield__label" htmlFor="abstract">Write your description here...</label>
                        </div>
                        <div class="mdl-textfield mdl-js-textfield">
                            <button className="mdl-button mdl-js-button mdl-button--raised" onClick={this.uploadArticle}>Submit</button>
                        </div>
                       
                    </div>
                </div>
            </div>
        );
    }
};
export default withRouter(Upload);