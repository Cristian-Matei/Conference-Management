import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';
import DataTable from "react-data-table-component";
import axios from 'axios';

const customStyles = {
    rows: {
        style: {
            fontSize: '14px',

            minHeight: '72px', // override the row height
        }
    },
    headCells: {
        style: {

            fontSize: '14px',
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
        },
    },
    cells: {
        style: {
            fontSize: '14px',
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '8px',
        },
    },
};

class ManageRooms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registeredTalks: [],
            availableTaks: [],
            selectedOption: null,
            ok: false,
            userId: this.props.location.state.userId,
            email: this.props.location.state.email,
            token: this.props.location.state.token,
            roles: this.props.location.state.roles,
        }

    }

    componentDidMount() {
        axios.all([
            axios.get('http://localhost:8080/conference/talks/attendee/' + this.state.userId, {
                headers: {
                    Authorization: `Bearer ${this.state.token}`
                }
            }),
            axios.get('http://localhost:8080/conference/talks/available', {
                params: {
                    "userId": this.state.userId
                },
                headers: {
                    Authorization: `Bearer ${this.state.token}`
                }
            })

        ])
            .then(axios.spread((talksResponse, availableResponse) => {

                this.setState({ registeredTalks: talksResponse.data });
                this.setState({ availableTaks: availableResponse.data });
                this.setState({ ok: true });

            }))

    }

    unregister = (value) => {
        console.log(value);
       
            axios.post('http://localhost:8080/conference/talks/unregister',
                
                     {
                        "userId": this.state.userId,
                        "talkId": value.id
                    },
                    {headers: {
                        Authorization: `Bearer ${this.state.token}`
                    }}
            )
            .then(resp2 => {

                this.setState({ registeredTalks: talksResponse.data });
                this.setState({ availableTaks: availableResponse.data });
                this.setState({ ok: true });

            })
    }
    register = (value) => {

        axios.post('http://localhost:8080/conference/talks/register',
            
                {
                    "userId": this.state.userId,
                    "talkId": value.id
                },
                {headers: {
                    Authorization: `Bearer ${this.state.token}`
                }}
            ).then(response => {
                    console.log("Post a mers");
                axios.get('http://localhost:8080/conference/talks/attendee/' + this.state.userId, {
                    headers: {
                        Authorization: `Bearer ${this.state.token}`
                    }
                }).then(talksResponse => {
                    console.log("primul get a mers");
                    this.setState({ registeredTalks: talksResponse.data });
                    axios.get('http://localhost:8080/conference/talks/available', {
                        params: {
                            "userId": this.state.userId
                        },
                        headers: {
                            Authorization: `Bearer ${this.state.token}`
                        }
                    }).then(availableResponse => {
                        console.log("Ultimul get");
                        this.setState({ availableTaks: availableResponse.data });
                        this.setState({ ok: true });
                    })

                })

            })

    }
    render() {

        return (

            <div className="centered">

                <div style={{ height: '700px' }} className="demo-card-wide mdl-card mdl-shadow--5dp">
                    <div className="mdl-card__title">
                        <h2 className="mdl-card__title-text">Register for a talk</h2>
                    </div>

                    {this.state && this.state.registeredTalks &&

                        <DataTable
                            title="Already registered"
                            data={this.state.registeredTalks}
                            columns={[
                                {
                                    name: "Tile",
                                    selector: "title",
                                    sortable: true,
                                },
                                {
                                    name: "Domain",
                                    selector: "domain",
                                    sortable: true,
                                },
                                {
                                    name: "Author",
                                    selector: "author",
                                    sortable: true,
                                    cell: cellInfo => cellInfo.author.firstName + " " + cellInfo.author.lastName
                                },
                                {
                                    name: "Registered",
                                    cell: cellInfo => (

                                        <button className="button2" onClick={(e) => this.unregister(cellInfo)}>unregister</button>
                                    )

                                }
                            ]}
                            fixedHeader
                            fixedHeaderScrollHeight="300px"
                            customStyles={customStyles}

                        />
                    }


                    {this.state && this.state.availableTaks &&

                        <DataTable
                            title="Other Talks"
                            data={this.state.availableTaks}
                            columns={[
                                {
                                    name: "Tile",
                                    selector: "title",
                                    sortable: true,
                                },
                                {
                                    name: "Domain",
                                    selector: "domain",
                                    sortable: true,
                                },
                                {
                                    name: "Author",
                                    selector: "author",
                                    sortable: true,
                                    cell: cellInfo => cellInfo.author.firstName + " " + cellInfo.author.lastName
                                },
                                {
                                    name: "Register",
                                    cell: cellInfo =>
                                        (
                                            <button
                                                className="button"
                                                onClick={(e) => this.register(cellInfo)}
                                            >Checkin</button>
                                        )

                                }
                            ]}
                            fixedHeader
                            fixedHeaderScrollHeight="300px"
                            customStyles={customStyles}

                        />
                    }
                </div>

            </div>


        );
    }

};
export default withRouter(ManageRooms);