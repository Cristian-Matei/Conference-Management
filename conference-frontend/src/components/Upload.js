import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }
    }

    uploadArticle = () => {
   
        let title = this.refs.title.value;
        let article = this.refs.article.vlue;
        let firstName = this.refs.firstName.value;
        let lastName = this.refs.lastName.value;
        let domain = this.refs.domain.value;
        let abstract = this.refs.abstract.value;

        
    }

    render() {
        return (

            <div className="centered">

                <div className="demo-card-wide mdl-card mdl-shadow--2dp">
                    <div className="mdl-card__title">
                        <h2 className="mdl-card__title-text">Upload Article & Abstract</h2>
                    </div>
                    <div>
                        <div >
                            <div >
                                <label className="mdl-text-field" htmlFor="title">Title   </label>
                                <input style={{ width: '200px' }} className="mdl-text-field__input" type="text" id="title" ref="title" />
                            </div>
                            <div>
                                <label className="mdl-text-field" htmlFor="article">D.O.I</label>
                                <input style={{ width: '200px' }} className="mdl-text-field__input" type="text" id="article" ref="article" /></div><div>
                                <label className="mdl-text-field" htmlFor="firstName">Author First Name   </label>
                                <input style={{ width: '200px' }} className="mdl-text-field__input" type="text" id="firstName" ef="firstName" /></div><div>
                                <label className="mdl-text-field" htmlFor="lastName">Author Last Name   </label>
                                <input style={{ width: '200px' }} className="mdl-text-field__input" type="text" id="lastName"  ref="lastName"/>  </div>
                            <label className="mdl-text-field" htmlFor="domain">Domain   </label>
                            <input style={{ width: '200px' }} className="mdl-text-field__input" type="text" id="domain" ref="domain"/>

                        </div>
                        <h5 style={{ padding: '20px' }}>Abstract</h5>
                        <div class="mdl-textfield mdl-js-textfield">
                            <textarea className="mdl-textfield__input" type="text" rows="10" id="description" ref="abstract"></textarea>
                            <label className="mdl-textfield__label" htmlFor="abstract">Write your abstract here...</label>
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