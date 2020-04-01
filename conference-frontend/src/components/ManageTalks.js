import React, { Component } from 'react';


import { withRouter } from 'react-router-dom';
import DataTable from "react-data-table-component";
import axios from 'axios';
import Modal from 'react-modal';
const customStyles = {
    rows: {
        style: {
            position: 'relative',
            fontSize: '14px',
            minHeight: '72px', // override the row height
        }
    },
    headCells: {
        style: {
            position: 'relative',
            fontSize: '14px',
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
        },
    },
    cells: {
        style: {
            position: 'relative',
            zIndex: '0',
            fontSize: '14px',
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '8px',
        },
    },
};


class ManageTalks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            talks: [],
            articles: [],
            ok: false,
            clicked: false,
            userId: this.props.location.state.userId,
            email: this.props.location.state.email,
            token: this.props.location.state.token,
            roles: this.props.location.state.roles,
            showModal: false,
            articleId: 0,

        }
        console.log("am ajuns aici");
    }
    componentDidMount() {
        axios.all([
            axios.get('http://localhost:8080/conference/talks/', {
                headers: {
                    Authorization: `Bearer ${this.state.token}`
                }
            }),
            axios.get('http://localhost:8080/conference/articles/registered/', {
                headers: {
                    Authorization: `Bearer ${this.state.token}`
                }
            })
        ]).then(axios.spread((talksResponse, articlesResponse) => {
            console.log(talksResponse);
            console.log(articlesResponse);
            this.setState({ talks: talksResponse.data });
            this.setState({ articles: articlesResponse.data });
            this.setState({ ok: true });
        }))
    }

    add = (value) => {
        this.setState({ clicked: true });
        this.setState({ showModal: true });
        this.setState({ articleId: value.id });
    }
    close = () => {
        this.setState({ showModal: false });
        var d = new Date(this.refs.date.value + " " + this.refs.startTime.value);
        var dd = new Date(this.refs.date .value+ " " + this.refs.endTime.value);

        axios.post("http://localhost:8080/conference/talks/", {
            "startTime":Math.round(d.getTime()/1000),
            "endTime": Math.round(dd.getTime()/1000),
            "articleId": 4,
        }, {
            headers: {
                Authorization: `Bearer ${this.state.token}`
            }
        }).then(response => {
            console.log(response);
            alert("The room " + response.data.name + "is set for the talk");
            axios.get('http://localhost:8080/conference/talks/', {
                headers: {
                    Authorization: `Bearer ${this.state.token}`
                }
            }).then(response => {
                this.setState({ talks: response.data });
                axios.get('http://localhost:8080/conference/articles/registered/', {
                    headers: {
                        Authorization: `Bearer ${this.state.token}`
                    }
                }).then(resp => {
                    
                    this.setState({ articles: resp.data });
                })

            })

        }).catch(error => {
            alert("something went wrong! Please try again");
        })
    }
    render() {

        return (

            <div className="centered" >





                <div style={{ height: '700px' }} className="demo-card-wide mdl-card mdl-shadow--5dp">
                    <div className="mdl-card__title">
                        <h2 className="mdl-card__title-text">Manage Talks</h2>
                    </div>


                    <div>
                    {this.state && this.state.articles &&

                        <DataTable
                            title="Available Articles"
                            data={this.state.articles}
                            columns={[
                                {
                                    name: "Title",
                                    selector: "title",
                                    sortable: true,
                                },
                                {
                                    name: "Domain",
                                    selector: "domain",
                                    sortable: true,
                                },
                                {
                                    name: "Description",
                                    selector: "description",
                                    sortable: true,
                                },
                                {
                                    name: "Author",
                                    selector: "author",
                                    sortable: true,
                                    cell: cellInfo => cellInfo.author.firstName + " " + cellInfo.author.lastName
                                },
                                {
                                    name: "Add talk",
                                    cell: cellInfo => (

                                        <button className="button" onClick={(e) => this.add(cellInfo)}>add</button>
                                    )
                                }

                            ]}
                            fixedHeader
                            fixedHeaderScrollHeight="300px"
                            customStyles={customStyles}

                        />
                    }
                    </div>

                    {this.state.clicked &&
                        <div className="modal">


                            <Modal
                                isOpen={this.state.showModal}
                                ariaHideApp={false}
                                style={{
                                    overlay: {
                                        'z-index': '1000',
                                        position: 'fixed',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 300,
                                        backgroundColor: 'rgba(255, 255, 255, 0.75)'
                                    },
                                    content: {
                                        position: 'absolute',
                                        top: '70px',
                                        left: '40px',
                                        right: '40px',
                                        bottom: '100px',
                                        border: '1px solid #ccc',
                                        background: '#fff',
                                        overflow: 'auto',
                                        WebkitOverflowScrolling: 'touch',
                                        borderRadius: '4px',
                                        outline: 'none',
                                        padding: '20px'
                                    }
                                }}
                            >
                                <h4> Please introduce date and time for the talk</h4>
                                <div>
                                    <label htmlFor="date">Date:dd-mm-yyyy</label>
                                    <input type="text" id="date" ref="date" />
                                </div>
                                <div>
                                    <label htmlFor="stratTime">Start Time: hh:mm</label>
                                    <input type="text" id="startTime" ref="endTime" />
                                </div>
                                <div>
                                    <label htmlFor="endTime">End Time: hh:mm</label>
                                    <input type="text" id="endTime" ref="startTime" />
                                </div>
                                <div>
                                    <button onClick={this.close}>Send</button>
                                </div>
                            </Modal>

                        </div>}

                        <div>
                    <DataTable
                        title="Talks"
                        data={this.state.talks}
                        columns={[
                            {
                                name: "Title",
                                selector: "title",
                                sortable: true,
                            },
                            {
                                name: "Room Name",
                                selector: "room",
                                sortable: true,
                                cell: cellInfo => cellInfo.room.name
                            },
                            {
                                name: "Capacity",
                                selector: "room",
                                sortable: true,
                                cell: cellInfo => cellInfo.room.places
                            },
                            {
                                name: "Start Time",
                                selector: "startTime",
                                sortable: true,
                            },
                            {
                                name: "End Time",
                                selector: "endTime",
                                sortable: true
                            },

                        ]}
                        fixedHeader
                        fixedHeaderScrollHeight="300px"
                        customStyles={customStyles}

                    />
                    </div>
                </div>



            </div>


        );
    }

};
export default withRouter(ManageTalks);