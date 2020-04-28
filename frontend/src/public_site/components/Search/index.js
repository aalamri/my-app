import React, { Component } from "react";
import { Link } from "react-router-dom";
import Loader from "../Search/Loader";
import {
  Container,
  Box,
  Heading,
  Card,
  Image,
  Text,
  SearchField,
  Icon,
} from "gestalt";
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
                cards(where: {
                title_contains: "${this.state.searchTerm}"}) {
                id
                title
                content
            }
            articles(where: { 
                title_contains: "${this.state.searchTerm}"}) {
                id
                title
                content
            }
            }`,
      },
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
      <Container>
        {/* Brands Search Field */}
        <div>
          <SearchField
            id="searchField"
            classNames="test-class"
            onChange={this.handleChange}
            value={searchTerm}
            placeholder="Search..."
          />
        </div>
        {/* Brands Section */}
        <Box display="flex" justifyContent="center" marginBottom={2}>
          {/* Brands Header */}
          <Heading color="midnight" size="md">
            Card
          </Heading>
        </Box>
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
        <Loader show={loadingBrands} />
        {/* Brands Section */}
        <Box display="flex" justifyContent="center" marginBottom={2}>
          {/* Brands Header */}
          <Heading color="midnight" size="md">
            Article
          </Heading>
        </Box>
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
        <Loader show={loadingBrands} />
      </Container>
    );
  }
}

export default Search;
