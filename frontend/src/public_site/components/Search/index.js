import React, { Component } from "react";
import { Link } from "react-router-dom";
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
  };
  handleChange = ({ value }) => {
    this.setState({ searchTerm: value }, () => this.searchBrands());
  };

  // filteredBrands = ({ searchTerm, brands }) => {
  //   return brands.filter(brand => {
  //     return (
  //       brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       brand.description.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //   });
  // };

  searchBrands = async () => {
    const response = await strapi.request("POST", "/graphql", {
      data: {
        query: `query {
            cards( where: { title_contains: "Password" }) {
              id
              title
              content
            }
            articles (where: { title_contains: "password" }) {
              id
              title
              content
            }
          }`,
      }
    });
    // console.log(this.state.searchTerm, response.data.brands);
    this.setState({
      cards: response.data.cards,
      articles: response.data.articles,
      loadingBrands: false,
    });
  };

  render() {
    const { searchTerm, loadingBrands, cards, articles } = this.state;

    return (
      <div className="container">
        {/* Brands Search Field */}
        <div>
          <input
            id="searchField"
            className="form-control"
            onChange={this.handleChange}
            value={searchTerm}
            placeholder="Search..."
          />
        </div>
        {/* Brands Section */}
        <div className="row">
          {/* Brands Header */}
          <h2>
            Card
          </h2>
        </div>
        {/* Brands */}
        {cards.map((card) => (
          <div key={card._id}>
            <div>
              <div
                class="uk-grid-small uk-child-width-expand@s uk-text-center"
                uk-grid
              >
                <div>
                  <div class="uk-card uk-card-default uk-card-body">
            {card.title}
            <p>{card.content}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* <Spinner show={loadingBrands} accessibilityLabel="Loading Spinner" /> */}
        {/* Brands Section */}
        <div className="row">
          {/* Brands Header */}
          <h2>
            Article
          </h2>
        </div>
        {/* Brands */}
        {articles.map((article) => (
          <div key={article._id}>
            <div>
              <div
                class="uk-grid-small uk-child-width-expand@s uk-text-center"
                uk-grid
              >
                <div>
                  <div class="uk-card uk-card-default uk-card-body">
                    {article.title}
                <p>{article.content}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* <Spinner show={loadingBrands} accessibilityLabel="Loading Spinner" /> */}
      </div>
    );
  }
}

export default Search;
