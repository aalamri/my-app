import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import Axios from "axios";

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
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
      <Link to={`/articles/${cell}`}>
        <button className="view-btn-color btn-sm">
          View
        </button>
      </Link>
      <Link
        to={`/dashboard/articles/edit/${cell}`}
        className="uk-link-reset"
      >
        <button className="view-btn-color btn-sm">
          Edit
      </button>
      </Link>
      <Link
        to={`/dashboard/reviews/articles/review/${cell}`}
        className="uk-link-reset"
      >
        <button className="view-btn-color btn-sm">
          Review
        </button>
      </Link>
    </div>
  )
},];
class ArticlesTable extends React.Component {
  state = {
    articles: [],
    total: 0,
    start: 0,
    pageSize: 10
  }

  componentDidMount() {
    this.fetchArticles(1);
    Axios.get(process.env.REACT_APP_BACKEND_URL + '/articles/count').then(response => {
      this.setState({ total: response.data });
      console.log(this.state.total)
    })
  }

  fetchArticles(i) {
    Axios.get(process.env.REACT_APP_BACKEND_URL + '/articles?_limit=' + this.state.pageSize + "&_start=" + (i - 1) * this.state.pageSize).then(response => {
      this.setState({ articles: response.data });
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
                <Link to="/dashboard/create-article">
                  <ol className="breadcrumb float-sm-right">
                    <button type="button" className="btn btn-outline-secondary">  <i className="fa fa-plus plus-size pr-2"></i>New Article</button>
                  </ol>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="content">

          <div className="card">
            <div className="card-body p-0">
              <BootstrapTable keyField={'id'} data={this.state.articles} columns={columns} remote={true} onTableChange={(i) => { console.log('here', i) }}
                pagination={paginationFactory({
                  withFirstAndLast: true,
                  hideSizePerPage: true,
                  showTotal: true,
                  totalSize: this.state.total,
                  paginationSize: 9,
                  onPageChange: (i) => { this.fetchArticles(i) }
                })} />
            </div>
          </div>
        </section>

      </div>
    );
  }
};

export default ArticlesTable;
