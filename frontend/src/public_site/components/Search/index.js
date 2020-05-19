import React, { Component } from "react";
import { Link, useLocation } from "react-router-dom";
import Loader from "../Search/Loader";
import Strapi from "strapi-sdk-javascript/build/main";
const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);

class Search extends Component {


  state = {
    cards: [],
    articles: [],
    searchTerm: "",
    loadingBrands: true,
    category: 'all'
  };

  componentDidMount() {
    let { searchTerm, category } = this.props.location.state ? this.props.location.state : { searchTerm: "", category: "all" };
    this.setState({searchTerm, category}, ()=>this.searchBrands());
    
  }

  handleChange = (value) => {
    this.setState({ searchTerm: value }, () => this.searchBrands());
  };
  searchBrands = async () => {
    console.log(this.state.searchTerm);
    fetch('http://localhost:1337/articles?title_contains=' + this.state.searchTerm).then(res => res.json().then(response => { this.setState({ articles: response }) }));
    fetch('http://localhost:1337/cards?title_contains=' + this.state.searchTerm).then(res => res.json().then(response => { this.setState({ cards: response }) }));
  };

  selectCategory(category) {
    this.setState({ category });
  }

  onSearch() {

  }

  render() {
    const { searchTerm, loadingBrands, cards, articles } = this.state;

    return (
      <div className="container">
        <div class="form-inline d-flex justify-content-center md-form form-sm active-pink-2 mt-2">
          <input class="form-control form-control-sm mr-3 w-75 search-input" type="text" aria-label="Search" onChange={(e) => { this.handleChange(e.target.value) }} value={this.state.searchTerm} id="searchField" placeholder="Search..." />
          <i class="fa fa-search search-icon-modal" aria-hidden="true" onClick={() => { this.searchBrands() }}></i>
        </div>
        <div class="row justify-content-center">
          <div class="post-footer text-right pt-5">
            <button className={"search-btn search-all mx-2 " + (this.state.category === "all" ? "selected" : "")} onClick={() => { this.selectCategory('all') }}>All</button>
            <button className={"search-btn search-article mx-2 " + (this.state.category === "articles" ? "selected" : "")} onClick={() => { this.selectCategory('articles') }}>Article</button>
            <button className={"search-btn search-cards mx-2 " + (this.state.category === "cards" ? "selected" : "")} onClick={() => { this.selectCategory('cards') }}>Cards</button>
            <button className={"search-btn search-tests mx-2 " + (this.state.category === "tests" ? "selected" : "")} onClick={() => { this.selectCategory('tests') }}>Tests</button>
          </div>
        </div>
        {/* Brands Section */}

        {/* Brands */}
        <div class="row">
          {(this.state.category === 'all' || this.state.category === 'cards') && cards.map((card) => (
            <div class="col-lg-4 pt-4" key={card._id}>
              <div class="card search-tag-cards">
                <div class="card-header py-4" id="heading-1-1" data-toggle="collapse" role="button"
                  data-target="#collapse-1-1" aria-expanded="false" aria-controls="collapse-1-1">
                  <h6 class="mb-0">{card.title}</h6>
                  <ul class="article-info">
                    <li>{card.createdAt}</li>
                    <li>by Shane</li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
          {(this.state.category === 'all' || this.state.category === 'articles') && articles.map((article) => (
            <div class="col-lg-4 pt-4" key={article._id}>
              <div class="card search-tag-articles">
                <div class="card-header py-4" id="heading-1-1" data-toggle="collapse" role="button"
                  data-target="#collapse-1-1" aria-expanded="false" aria-controls="collapse-1-1">
                  <h6 class="mb-0">{article.title}</h6>
                  <ul class="article-info">
                    <li>{article.createdAt}</li>
                    <li>by Shane</li>
                  </ul>
                </div>
              </div>
            </div>))}
        </div>
      </div>


    );
  }
}

export default Search;
