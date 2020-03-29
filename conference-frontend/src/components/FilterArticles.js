import React, { Component } from 'react';

import Select from 'react-select';
import { withRouter } from 'react-router-dom';
import DataTable from "react-data-table-component";
import axios from 'axios';
 
const mockData = [
  { 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },{ 'author': 'Ana', 'domain': 'Ma', 'title': 'aaa', },
  { 'author': 'Annnnna', 'domain': 'Mamm', 'tile': 'aahhgha' }];
const options = [
  { value: 'firstName', label: 'First Name' },
  { value: 'lastName', label: 'Last Name' },
  { value: 'domain', label: 'Domain' },
  { value: 'title', label: 'Title' }]
class FilterArticles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data : [],
      selectedOption: null,
      ok: false,
    }

  }
  componentDidMount() {
    axios.get('http://localhost:8080/conference/articles/')
      .then(res => {
        console.log(res);
        const articles = res.data;

        this.setState({ data: articles });

      })
    console.log("Prima data intru aici");
  }

  handleFilter = () => {
    //var param = this.selectedOption.label;
    axios.get('http://localhost:8080/conference/articles/',
    {
      
    })
      .then(res => {
        console.log(res);
        const articles = res.data;

        this.setState({ data: articles });
        this.state.ok = true;
      })
  }

  // sendData = () => {

  //     };

  //     // axios.post(apiLoginUrl, payload).then((response) => {
  //     //     // TODO 
  //     //     alert(response.status);
  //     // });
  // }

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
                this.setState({ selectedOption: value }, () => {
                  this.handleFilter();
                })
              }}
            />
          </div>




          <DataTable
          title="Articles"
            data={mockData}
            columns={[
              {
                name: "Author",
                selector: "author",
                sortable: true,
              },
              {
                name: "Domain",
                selector: "domain",
                sortable: true,
              },
              {
                name: "Abstract",
                selector: "abstract",
                sortable: true,
              },
              {
                name: "Title",
                selector: "title",
                sortable: true,
              }
            ]}
            fixedHeader
            fixedHeaderScrollHeight="300px"

          />

        </div>
      </div>

    );
  }
};
export default FilterArticles;