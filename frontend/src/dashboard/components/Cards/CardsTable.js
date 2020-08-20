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
    myCards: [],
    total: 0,
    mytotal: 0,
    start: 0,
    mystart: 0,
    pageSize: 10,
    user: JSON.parse(localStorage.getItem('user'))
  }

  componentDidMount() {
    this.fetchCards(1);
    this.fetchMyCards(1)
    Axios.get(process.env.REACT_APP_BACKEND_URL + '/cards/count').then(response => {
      this.setState({ total: response.data });
    })
    Axios.get(process.env.REACT_APP_BACKEND_URL + '/cards/count?author_id=' + this.state.user.id).then(response => {
      this.setState({ mytotal: response.data });
    })
  }

  fetchCards(i) {
    Axios.get(process.env.REACT_APP_BACKEND_URL + '/cards?_limit=' + this.state.pageSize + "&_start=" + (i - 1) * this.state.pageSize).then(response => {
      this.setState({ cards: response.data });
      console.log(response.data)
    })
  }

  fetchMyCards(i) {
    Axios.get(process.env.REACT_APP_BACKEND_URL + '/cards?author_id=' + this.state.user.id + '&_limit=' + this.state.pageSize + "&_start=" + (i - 1) * this.state.pageSize).then(response => {
      this.setState({ myCards: response.data });
      console.log('here', response.data)
    })
  }
  render() {
    return (
      <div className="box">
        <div className="box-header">
        </div>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-6">
                <Link to="/dashboard/create-card">
                  <ol className="breadcrumb float-sm-right">
                    <button type="button" className="btn btn-outline-secondary">  <i className="fa fa-plus plus-size pr-2"></i>New Card</button>
                  </ol>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <Tabs defaultActiveKey="all" transition={false} id="noanim-tab-example">
            <Tab eventKey="all" title="All Cards">
              <div className="card" style={{ marginTop: 10 }}>
                <div className="card-body p-0">
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
              <div className="card" style={{ marginTop: 10 }}>
                <div className="card-body p-0">
                  <BootstrapTable keyField={'id'} data={this.state.myCards} columns={columns} remote={true} onTableChange={(i) => { console.log('here', i) }}
                    pagination={paginationFactory({
                      withFirstAndLast: true,
                      hideSizePerPage: true,
                      showTotal: true,
                      totalSize: this.state.mytotal,
                      paginationSize: 9,
                      onPageChange: (i) => { this.fetchMyCards(i) }
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
