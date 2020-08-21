import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import Axios from "axios";

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

const token = JSON.parse(localStorage.getItem('jwt'));

const columns = [{
  dataField: '',
  text: 'Title',
  formatter: (cell, row, rowIndex) => {
    if (row.card) {
      return <div>{row.card.title}</div>
    } else if (row.article) {
      return <div>{row.article.title}</div>
    }
  }
}, {
  dataField: 'author',
  text: 'Created by',
  formatter: (cell, row, rowIndex) => {
    return <div>{cell.firstName + ' ' + cell.lastName}</div>
  }
}, {
  dataField: 'published_at',
  text: 'Published_at',
  formatter: (cell, row, rowIndex) => (
    <Moment format="MMM Do YYYY">{cell}</Moment>
  )
}, {
  dataField: 'Type',
  text: 'Type'
}, {
  dataField: 'id',
  text: 'Action',
  formatter: (cell, row, rowIndex) => (
    <div style={{ display: 'flex' }}>
      <Link
        to={`/dashboard/reviews/${row.card ? 'cards' : row.article ? 'articles' : 'tests'}/review/${row.card ? row.card._id : row.article ? row.article._id : row.test._id}`}
        className="uk-link-reset"
      >
        <button className="view-btn-color btn-sm">
          Review
        </button>
      </Link>
    </div>
  )
},];

class Reviews extends React.Component {

  state = {
    reviews: [],
    myCards: [],
    total: 0,
    mytotal: 0,
    start: 0,
    mystart: 0,
    pageSize: 10,
    user: JSON.parse(localStorage.getItem('user'))
  }

  componentDidMount() {
    this.fetchReviews(1);
    // this.fetchMyCards(1)
    Axios.get(process.env.REACT_APP_BACKEND_URL + '/reviews/count', {
      headers: {
        Authorization: `Bearer ${token}`
      },
    }).then(response => {
      this.setState({ total: response.data });
    })
    // Axios.get(process.env.REACT_APP_BACKEND_URL + '/cards/count?author_id=' + this.state.user.id).then(response => {
    //   this.setState({ mytotal: response.data });
    // })
  }

  fetchReviews(i) {
    Axios.get(process.env.REACT_APP_BACKEND_URL + '/reviews?_limit=' + this.state.pageSize + "&_start=" + (i - 1) * this.state.pageSize, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    }).then(response => {
      this.setState({ reviews: response.data });
      console.log(response.data)
    })
  }

  // fetchMyCards(i) {
  //   Axios.get(process.env.REACT_APP_BACKEND_URL + '/cards?author_id=' + this.state.user.id + '&_limit=' + this.state.pageSize + "&_start=" + (i - 1) * this.state.pageSize).then(response => {
  //     this.setState({ myCards: response.data });
  //     console.log('here', response.data)
  //   })
  // }
  render() {
    return (
      <div className="box">
        <div className="box-header">
        </div>
        <section className="content">
          <BootstrapTable keyField={'id'} data={this.state.reviews} columns={columns} remote={true} onTableChange={(i) => { console.log('here', i) }}
            pagination={paginationFactory({
              withFirstAndLast: true,
              hideSizePerPage: true,
              showTotal: true,
              totalSize: this.state.total,
              paginationSize: 9,
              onPageChange: (i) => { this.fetchReviews(i) }
            })} />

        </section>
      </div>
    );
  }
};

export default Reviews;  
