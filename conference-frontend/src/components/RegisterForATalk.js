import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';
import DataTable from "react-data-table-component";
import axios from 'axios';

const mockData = [{ "title": "Talk1", "domain": "ML", "author": "Eu Eu" }]

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

class RegisterForATalk extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registeredTalks: [],
            availableTaks:[],
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
            axios.get('http://localhost:8080/conference/talks/attendee/'+this.state.userId,{
                headers: {
                  Authorization: `Bearer ${this.state.token}` 
                }
                }),
            axios.get('http://localhost:8080/conference/talks/available',{
                params:{
                    "userId":this.state.userId
                },
                headers: {
                    Authorization: `Bearer ${this.state.token}` 
                }
            })

        ])
        .then(axios.spread((talksResponse,availableResponse) => {
           
            this.setState({registeredTalks:talksResponse.data});
            this.setState({availableTaks:availableResponse.data});
            this.setState({ok:true});
           
          }))
        
    }

    unregister = (value) => {
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
                                    cell: cellInfo  => (
                                            
                                            <button style={{color:"blue"}} onClick={(e) => this.unregister(cellInfo)}>unregister</button>
                                        )
                                    
                                }
                            ]}
                            fixedHeader
                            fixedHeaderScrollHeight="300px"
                            customStyles = {customStyles}

                        />
                    }
                 

                    {this.state && this.state.availableTaks &&

                        <DataTable
                            title="Other Talks"
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
                                },
                                {
                                    name: "Register",
                                    cell: cellInfo => 
                                         (
                                            <input
                                                type="checkbox"
                                                className="checkbox"
                                                onChange = {(e)=>this.unregister(cellInfo)}
                                            />
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
export default withRouter(RegisterForATalk);