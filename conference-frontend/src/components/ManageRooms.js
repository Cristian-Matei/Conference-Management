import React, { Component } from 'react';

import Select from 'react-select';
import { withRouter } from 'react-router-dom';
import DataTable from "react-data-table-component";
import axios from 'axios';

const mockData = [{ "rn": "Socrate", "title": "ML", "participants": "25", "data": "20-03-2019" }]

const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNTg1NTY0MDkxLCJleHAiOjE1ODY0MjgwOTF9.BpOcah-IirZu4dhu4NLt5ROfQj3NLo_WB6sM_4uzy5zeV5or6lkvbPvnri4xa_jqsLZ7vL5KIkgRu-U133zdvQ"
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
            roomsAndTalksList: mockData,
            selectedOption: null,
            ok: false,
            clicked: false
        }

    }
    componenDidMount() {
        // axios.get('http://localhost:8080/conference/8',{
        //   headers: {
        //     Authorization: `Bearer ${token}` 
        //   }
        // })
        //   .then(res => {
        //     console.log(res.data);
        //     // const articles = res.data;
        //     this.setState({registeredTalks:res.data});
        //     this.setState({ok:true});
        //     console.log(this.state.registeredTalks);
        //   })
        // console.log("Prima data intru aici");
    }

    modify = (value) => {
        console.log(value);
        
        //   axios.get('http://localhost:8080/conference/articles/domain/'+this.refs.filter_input.value, 
        //   {
        //     headers: {
        //       Authorization: `Bearer ${token}` 
        //     }
        //   })
        //     .then(res => {
        //       console.log(res);
        //       this.setState({ data: res.data });
        //       this.state.ok = true;
        //     })


    }
    add = () => {
        console.log("hghhhh");
        this.setState({clicked:true});
    }
    render() {

        return (

            <div className="centered">

                <div style={{ height: '700px' }} className="demo-card-wide mdl-card mdl-shadow--5dp">
                    <div className="mdl-card__title">
                        <h2 className="mdl-card__title-text">Register for a talk</h2>
                    </div>

                    {this.state && this.state.roomsAndTalksList &&

                        <DataTable
                            title="Rooms booked"
                            data={this.state.roomsAndTalksList}
                            columns={[
                                {
                                    name: "Room Name",
                                    selector: "rn",
                                    sortable: true,
                                },
                                {
                                    name: "Talk Title",
                                    selector: "title",
                                    sortable: true,
                                },
                                {
                                    name: "Participants",
                                    selector: "participants",
                                    sortable: true,
                                },
                                {
                                    name: "Date Time",
                                    selector: "data",
                                    sortable: true,
                                },
                                {
                                    name: "Modify",
                                    cell: cellInfo => (

                                        <button style={{ color: "blue" }} onClick={(e) => this.modify(cellInfo)}>modify</button>
                                    )

                                }
                            ]}
                            fixedHeader
                            fixedHeaderScrollHeight="300px"
                            customStyles={customStyles}

                        />
                    }

                    <button class="mdl-button mdl-js-button mdl-button--raised" onClick={this.add}>Set room for a new talkk</button>
                    


                </div>
                {
                 this.state.clicked===true &&
                <div style={{ height: '700px' }} className="demo-card-wide mdl-card mdl-shadow--5dp">
            <div className="mdl-card__title">
                <h2 className="mdl-card__title-text">Add a new talk</h2>
            </div>
            </div>
        }
            </div>
            

        );
    }

};
export default ManageRooms;