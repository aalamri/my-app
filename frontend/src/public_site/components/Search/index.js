import React, { Component } from "react";
import { Link, useLocation } from "react-router-dom";

const url = process.env.REACT_APP_BACKEND_URL;

class Search extends Component {
  state = {
    cards: [],
    articles: [],
    tests: [],
    searchTerm: "",
    loadingBrands: true,
    category: "all",
  };

  componentDidMount() {
    let { searchTerm, category } = this.props.location.state
      ? this.props.location.state
      : { searchTerm: "", category: "all" };
    this.setState({ searchTerm, category }, () => this.searchBrands());
  }

  handleChange = (value) => {
    this.setState({ searchTerm: value });
  };
  searchBrands = async () => {
    fetch(url + "/articles?title_contains=" + this.state.searchTerm).then(
      (res) =>
        res.json().then((response) => {
          this.setState({ articles: response });
        })
    );
    fetch(url + "/cards?title_contains=" + this.state.searchTerm).then((res) =>
      res.json().then((response) => {
        this.setState({ cards: response });
      })
    );
    fetch(url + "/tests?title_contains=" + this.state.searchTerm).then((res) =>
      res.json().then((response) => {
        this.setState({ tests: response });
      })
    );
  };

  selectCategory(category) {
    this.setState({ category });
  }

  onSearch() {}

  render() {
    const { searchTerm, loadingBrands, cards, articles, tests } = this.state;

    return (
      <div className="main-content-wrap">
        <div className="container">
          <div class="form-inline d-flex justify-content-center md-form form-sm active-pink-2 mt-5">
            <input
              class="form-control form-control-sm mr-3 w-75 search-input search-box-font purple"
              type="text"
              aria-label="Search"
              onChange={(e) => {
                this.handleChange(e.target.value);
              }}
              value={this.state.searchTerm}
              id="searchField"
              placeholder="Search..."
            />
            <i
              class="fa fa-search search-icon-modal search-icon-lg"
              aria-hidden="true"
              onClick={() => {
                this.searchBrands();
              }}
            ></i>
          </div>
          <div class="row justify-content-center">
            <div class="post-footer text-right pt-5">
              <button
                className={
                  "search-btn search-all mx-2 " +
                  (this.state.category === "all" ? "selected" : "")
                }
                onClick={() => {
                  this.selectCategory("all");
                }}
              >
                All
              </button>
              <button
                className={
                  "search-btn search-article mx-2 " +
                  (this.state.category === "articles" ? "selected" : "")
                }
                onClick={() => {
                  this.selectCategory("articles");
                }}
              >
                Article
              </button>
              <button
                className={
                  "search-btn search-cards mx-2 " +
                  (this.state.category === "cards" ? "selected" : "")
                }
                onClick={() => {
                  this.selectCategory("cards");
                }}
              >
                Cards
              </button>
              <button
                className={
                  "search-btn search-tests mx-2 " +
                  (this.state.category === "tests" ? "selected" : "")
                }
                onClick={() => {
                  this.selectCategory("tests");
                }}
              >
                Tests
              </button>
            </div>
          </div>
          {/* Brands Section */}

          {/* Brands */}
          <div class="row">
            {cards.length < 1 &&
              articles.length < 1 &&
              tests.length < 1 &&
              searchTerm.trim() != "" &&
              this.state.category === "all" && (
                <div className="mx-auto">
                  <h3 className="purple py-5">No result found</h3>
                </div>
              )}
            {this.state.category === "cards" && cards.length === 0 && (
              <div className="mx-auto">
                <h3 className="purple py-5">No cards found</h3>
              </div>
            )}
            {(this.state.category === "all" ||
              this.state.category === "cards") &&
              cards.map((card) => (
                <div class="col-lg-4 pt-4" key={card._id}>
                  <div class="card search-tag-cards">
                    <div
                      class="card-header py-4"
                      id="heading-1-1"
                      data-toggle="collapse"
                      role="button"
                      data-target="#collapse-1-1"
                      aria-expanded="false"
                      aria-controls="collapse-1-1"
                    >
                      <Link class="mb-0" key={card.id} to={`/cards/${card.id}`}>
                        <h6 class="mb-0 search-title-box">{card.title}</h6>
                      </Link>
                      <ul class="article-info">
                        <li>{card.createdAt}</li>
                        <li>
                          {card.author.firstName} {card.author.lastName}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            {this.state.category === "articles" && articles.length === 0 && (
              <div className="mx-auto">
                <h3 className="purple py-5">No articles found</h3>
              </div>
            )}

            {(this.state.category === "all" ||
              this.state.category === "articles") &&
              articles.map((article) => (
                <div class="col-lg-4 pt-4" key={article._id}>
                  <div class="card search-tag-articles">
                    <div
                      class="card-header py-4"
                      id="heading-1-1"
                      data-toggle="collapse"
                      role="button"
                      data-target="#collapse-1-1"
                      aria-expanded="false"
                      aria-controls="collapse-1-1"
                    >
                      <Link key={article.id} to={`/article/${article.id}`}>
                        <h6 class="mb-0 search-title-box">{article.title}</h6>
                      </Link>
                      <ul class="article-info">
                        <li>{article.createdAt}</li>
                        <li>
                          {article.author.firstName} {article.author.lastName}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            {this.state.category === "tests" && tests.length === 0 && (
              <div className="mx-auto">
                <h3 className="purple py-5">No tests found</h3>
              </div>
            )}
            {(this.state.category === "all" ||
              this.state.category === "tests") &&
              tests.map((test) => (
                <div class="col-lg-4 pt-4" key={test._id}>
                  <div class="card search-tag-tests">
                    <div
                      class="card-header py-4"
                      id="heading-1-1"
                      data-toggle="collapse"
                      role="button"
                      data-target="#collapse-1-1"
                      aria-expanded="false"
                      aria-controls="collapse-1-1"
                    >
                      <Link class="mb-0 " key={test.id} to={`/test/${test.id}`}>
                        <h6 class="mb-0 search-title-box">{test.title}</h6>
                      </Link>
                      <ul class="article-info">
                        <li>{test.createdAt}</li>
                        {/* <li>{test.author.firstName} {test.author.lastName}</li> */}
                        <li>Nora Ahmad</li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
