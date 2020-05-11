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
      <section className="contact-us-section ptb-100">
        <div className="container signup">
          <div className="row">
            <div className="col-md-9 col-lg-9">
              <div className="section-heading mb-4">
                <h2>Join us a Content Creator</h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-between align-items-center">
            <div className="col-md-6">
              <form className="contact-us-form" onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="col-sm-6 col-12">
                    <div className="form-group">
                      <input
                        id="username"
                        name="username"
                        placeholder="First Name"
                        onChange={this.handleChange}
                        type="text"
                        className="form-control"
                        required="required"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6 col-12">
                    <div className="form-group">
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        placeholder="Last Name"
                        onChange={this.handleChange}
                        size="40"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <input
                        id="email"
                        name="email"
                        placeholder="Email"
                        onChange={this.handleChange}
                        type="email"
                        cols="25"
                        className="form-control"
                        required="required"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <textarea
                        onChange={this.handleChange}
                        name="message"
                        id="message"
                        className="form-control"
                        rows="7"
                        cols="25"
                        placeholder="Message"
                      ></textarea>
                    </div>
                  </div>
                </div>
                {/* <div className="uk-margin">
                  <input
                    className="uk-input uk-form-width-medium"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="password"
                    onChange={this.handleChange}
                  />
                </div> */}
                <div className="row">
                    <div className="col-sm-12 mt-3">
                      <button
                        type="submit"
                        className="btn solid-btn signupBtn"
                        disabled={loading}
                      >
                       Apply
                      </button>
                    </div>
                  </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Signup;
