import React from "react";
import Strapi from "strapi-sdk-javascript/build/main";

const apiUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:1337';
const strapi = new Strapi(apiUrl);

class Dashboard extends React.Component {

  state = {
    cards: []
  }
  async componentDidMount() {
    try {
      const response = await strapi.request('POST','/graphql', {
        data: {
          query: `query {
            cards {
              id
              title
              tags {
                id
                Subject
              }
              image {
                url
              }
              meta
            }
         }`
        }
      });
      console.log(response);
      this.setState({cards: response.data.cards});
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div>
        
      </div>
    );
  }
}
export default Dashboard;
