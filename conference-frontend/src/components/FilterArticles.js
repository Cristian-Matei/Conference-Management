import React, { Component } from 'react';

import Select from 'react-select';
import { withRouter } from 'react-router-dom';
import DataTable from "react-data-table-component";
import axios from 'axios';
 
const options = [
  { value: 'author', label: 'Author(First Name + Last Name)' },
  { value: 'domain', label: 'Domain' },
  { value: 'title', label: 'Title' }]
const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNTg1NTY0MDkxLCJleHAiOjE1ODY0MjgwOTF9.BpOcah-IirZu4dhu4NLt5ROfQj3NLo_WB6sM_4uzy5zeV5or6lkvbPvnri4xa_jqsLZ7vL5KIkgRu-U133zdvQ"


class FilterArticles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data : [],
      selectedOption: null,
      ok: false,
    }

  }
  componentWillMount() {
    axios.get('http://localhost:8080/conference/articles/',{
      headers: {
        Authorization: `Bearer ${token}` 
      }
    })
      .then(res => {
        console.log(res.data);
        // const articles = res.data;
        this.setState({data:res.data});
        this.setState({ok:true});
        console.log(this.state.data);
      })
    console.log("Prima data intru aici");
  }

  handleFilter = () => {
    if(this.state.selectedOption.label === "Domain" )
    {
      axios.get('http://localhost:8080/conference/articles/domain/'+this.refs.filter_input.value, 
      {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      })
        .then(res => {
          console.log(res);
          this.setState({ data: res.data });
          this.state.ok = true;
        })
    }
    if(this.state.selectedOption.value === "author") {
      var firstName = this.refs.filter_input.value.split(" ")[0];
      console.log(firstName + firstName.length);
      
      var lastName = this.refs.filter_input.value.split(" ")[1];
      console.log(lastName + lastName.length);
      axios.get('http://localhost:8080/conference/articles/author',
      {
        params:{
        "firstName" : firstName,
        "lastName" : lastName
        },
        headers: {
           Authorization: `Bearer ${token}` 
        }
      })
        .then(res => {
          console.log(res);
          this.setState({ data: res.data });
          this.state.ok = true;
        })
    }
  }

  render() {

    return (
      
      <div className="centered">
      
        <div style={{ height: '700px' }} className="demo-card-wide mdl-card mdl-shadow--5dp">
          <div className="mdl-card__title">
            <h2 className="mdl-card__title-text">Filter Articles</h2>
          </div>
          <div style={{ width: '200px' }}>
            <Select
              className="basic-single"
              options={options}
              onChange={(value) => {
                this.setState({ selectedOption: value })
              }}
            />
         
          
          <input style={{ width: '200px' }} className="mdl-text-field__input" type="text" id="filter_input" ref="filter_input" />
          <button className="mdl-button mdl-js-button mdl-button--raised" onClick={this.handleFilter}>Filter</button>
          </div>


          { this.state && this.state.data &&

          <DataTable
          title="Articles"
            data={this.state.data}
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
                name:"First Name",
                selector: "author",
                cell: d => d.author.firstName 
              },
              {
                name:"Last Name",
                selector: "author",
                cell: d => d.author.lastName
              }
            ]}
            fixedHeader
            fixedHeaderScrollHeight="300px"

          />
          }
        </div>
      
      </div>
          
          
    );
    }

};
export default FilterArticles;