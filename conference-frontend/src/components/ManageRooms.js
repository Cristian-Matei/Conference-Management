import React, { Component } from 'react';


import { withRouter } from 'react-router-dom';
import DataTable from "react-data-table-component";
import axios from 'axios';
import ReactModal from 'react-modal';
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
            talks: [],
            articles: [],
            ok: false,
            clicked: false,
            userId: this.props.location.state.userId,
            email: this.props.location.state.email,
            token: this.props.location.state.token,
            roles: this.props.location.state.roles,
            showModal:false,

        }
        console.log("am ajuns aici");
    }
    componenDidMount() {
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
        ])
            .then(axios.spread((talksResponse, articlesRegistered) => {
                this.setState({ talks: talksResponse.data });
                this.setState({ articles: articlesRegistered.data });
                this.setState({ ok: true });
            }))
    }

    
    add = (value) => {
        this.setState({ clicked: true });
        this.setState({showModal:true});

    }
    close =() =>{
        this.setState({showModal:false});
        console.log("Modal CLosed");
    }
    render() {

        return (

            <div className="centered">

                <div style={{ height: '700px' }} className="demo-card-wide mdl-card mdl-shadow--5dp">
                    <div className="mdl-card__title">
                        <h2 className="mdl-card__title-text">Manage Talks</h2>
                    </div>

                    

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
                    {
                        this.state.clicked &&
                        <ReactModal
                        isOpen = {this.state.showModal}
                        >
                            <label htmlFor="date">Date</label>
                            <input type="text" id="date" ref="date"/>
                            <label htmlFor="time">Time</label>
                            <input type="text" id="time" ref="time"/>
                            <button onclicl={this.close}>Send</button>
                        </ReactModal>
                    }


                    <div className="mdl-card__title">
                        <h2 className="mdl-card__title-text">Talks</h2>
                    </div>


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
            

        );
    }

};
export default withRouter(ManageRooms);