import React from "react";
import axios from "axios";
import { setToken } from "../../../utils/index";
import Strapi from "strapi-sdk-javascript/build/main";

const emailUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:1337";
const url = process.env.REACT_APP_BACKEND_URL + "/auth/local/register";
const strapi = new Strapi(emailUrl);

class Signup extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    loading: false,
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { username, email, password } = this.state;

    const data = {
      username,
      email,
      password,
    };
    if (this.isFormEmpty(this.state)) {
      console.log("Signup.handleSubmit");
    }

    try {
      this.setState({ loading: true });
      const response = await axios({
        method: "POST",
        url,
        data,
      });
      await strapi.request('POST', '/email', {
        data: {
          to: email,
          subject: `Request New User - Modrek ${new Date(Date.now())}`,
          text: "Your reuqest has been processed",
          html: "<bold>Expect your request to approve 1-2 days</bold>"
        }
      });
      this.setState({ loading: false });
      setToken(response.data.jwt);
      this.redirectUser("/");
    } catch (err) {
      this.setState({ loading: false });
    }
  };

  redirectUser = (path) => this.props.history.push(path);

  isFormEmpty({ username, email, password }) {
    return !username || !email || !password;
  }

  render() {
    const { loading } = this.state;
    return (
      <div className="uk-child-width-expand@s uk-text-center">
        <legend className="uk-legend">Join us Content</legend>
        <br></br>
        <form className="uk-grid-small" onSubmit={this.handleSubmit}>
          <fieldset className="uk-fieldset">
            <div className="uk-margin">
              <input
                className="uk-input uk-form-width-medium"
                id="username"
                name="username"
                placeholder="Name"
                onChange={this.handleChange}
              />
            </div>
            <div className="uk-margin">
              <input
                className="uk-input uk-form-width-medium"
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                onChange={this.handleChange}
              />
            </div>
            <div className="uk-margin">
              <input
                className="uk-input uk-form-width-medium"
                id="password"
                type="password"
                name="password"
                placeholder="password"
                onChange={this.handleChange}
              />
            </div>
          </fieldset>
          <button
            className="uk-button uk-button-primary"
            disabled={loading}
            type="submit"
          >
            Apply
          </button>
        </form>
      </div>
    );
  }
}

export default Signup;
