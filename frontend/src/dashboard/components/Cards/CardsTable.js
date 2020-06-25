import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import Axios from "axios";

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Tabs, Tab } from "react-bootstrap";


const columns = [{
  dataField: 'title',
  text: 'Title'
}, {
  dataField: 'status',
  text: 'Status'
}, {
  dataField: 'published_at',
  text: 'Published_at',
  formatter: (cell, row, rowIndex) => (
    <Moment format="MMM Do YYYY">{cell}</Moment>
  )
}, {
  dataField: 'language',
  text: 'Language'
}, {
  dataField: 'id',
  text: 'Action',
  formatter: (cell, row, rowIndex) => (
    <div style={{ display: 'flex' }}>
      <Link to={`/cards/${cell}`}>
        <button className="view-btn-color btn-sm">
          View
        </button>
      </Link>
      <Link
        to={`/dashboard/cards/edit/${cell}`}
        className="uk-link-reset"
      >
        <button className="view-btn-color btn-sm">
          Edit
      </button>
      </Link>
      <Link
        to={`/dashboard/reviews/cards/review/${cell}`}
        className="uk-link-reset"
      >
        <button className="view-btn-color btn-sm">
          Review
        </button>
      </Link>
    </div>
  )
},];
class CardsTable extends React.Component {

  state = {
    cards: [],
    total: 0,
    start: 0,
    pageSize: 10
  }

  componentDidMount() {
    this.fetchCards(1);
    Axios.get(process.env.REACT_APP_BACKEND_URL + '/cards/count').then(response => {
      this.setState({ total: response.data });
    })
  }

  fetchCards(i) {
    Axios.get(process.env.REACT_APP_BACKEND_URL + '/cards?_limit=' + this.state.pageSize + "&_start=" + (i - 1) * this.state.pageSize).then(response => {
      this.setState({ cards: response.data });
      console.log(response.data)
    })
  }

  fetchMyCard(i) {
    Axios.get(process.env.REACT_APP_BACKEND_URL + '/cards?_limit=' + this.state.pageSize + "&_start=" + (i - 1) * this.state.pageSize).then(response => {
      this.setState({ cards: response.data });
      console.log(response.data)
    })
  }
  render() {
    return (
      <div class="box">
        <div class="box-header">
        </div>
        <section class="content-header">
          <div class="container-fluid">
            <div class="row">
              <div class="col-sm-6">
                <Link to="/dashboard/create-card">
                  <ol class="breadcrumb float-sm-right">
                    <button type="button" class="btn btn-outline-secondary">  <i className="fa fa-plus plus-size pr-2"></i>New Card</button>
                  </ol>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section class="content">
          <Tabs defaultActiveKey="all" transition={false} id="noanim-tab-example">
            <Tab eventKey="all" title="All Cards">
              <div class="card" style={{marginTop:10}}>
                <div class="card-body p-0">
                  <BootstrapTable keyField={'id'} data={this.state.cards} columns={columns} remote={true} onTableChange={(i) => { console.log('here', i) }}
                    pagination={paginationFactory({
                      withFirstAndLast: true,
                      hideSizePerPage: true,
                      showTotal: true,
                      totalSize: this.state.total,
                      paginationSize: 9,
                      onPageChange: (i) => { this.fetchCards(i) }
                    })} />
                </div>
              </div>
            </Tab>
            <Tab eventKey="mine" title="My Cards">
              <div class="card" style={{marginTop:10}}>
                <div class="card-body p-0">
                  <BootstrapTable keyField={'id'} data={this.state.cards} columns={columns} remote={true} onTableChange={(i) => { console.log('here', i) }}
                    pagination={paginationFactory({
                      withFirstAndLast: true,
                      hideSizePerPage: true,
                      showTotal: true,
                      totalSize: this.state.total,
                      paginationSize: 9,
                      onPageChange: (i) => { this.fetchCards(i) }
                    })} />
                </div>
              </div>
            </Tab>

          </Tabs>


        </section>

      </div>
    );
  }
};

export default CardsTable;  
