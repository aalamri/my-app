import React from "react";
import axios from "axios";
import { setToken } from "../../../utils/index";
import { setUser } from "../../../utils/index";
import speakeasy  from "speakeasy";

const url = process.env.REACT_APP_BACKEND_URL + "/auth/local";

class Signin extends React.Component {
  state = {
    identifier: "",
    password: "",
    token: "",
    loading: false,
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleVerification = async(event) => {
    event.preventDefault();
  
    const {token} = this.state;
    const data = {
      token,
    };
    var verified = speakeasy.totp.verify({
      secret: '1bJ^i]*Ll{s.yGeB73@[&rB*@!!7wB(d',
      encoding: 'ascii',
      token: data
  })
  
  console.log(verified)
  
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    const { identifier, password, token } = this.state;

    const data = {
      identifier,
      password,
      token,
    };
    if (this.isFormEmpty(this.state)) {
      console.log("Signin.handleSubmit");
    }
    var verified = speakeasy.totp.verify({
      secret: '1bJ^i]*Ll{s.yGeB73@[&rB*@!!7wB(d',
      encoding: 'ascii',
      token: token
  })
  
  console.log(verified)
  if (verified == true) {
    try {
      this.setState({ loading: true });
      const response = await axios({
        method: "POST",
        url,
        data,
      });
      this.setState({ loading: false });
      setToken(response.data.jwt);
      setUser(response.data.user);
      this.redirectUser("/dashboard");
    } catch (err) {
      this.setState({ loading: false });
    }
  };
}

  redirectUser = (path) => this.props.history.push(path);

  isFormEmpty({ identifier, password }) {
    return !identifier || !password;
  }

  render() {
    const { loading } = this.state;
    return (
      <div className="uk-child-width-expand@s uk-text-center">
        <legend className="uk-legend">Login</legend>
        <br></br>
        <legend className="uk-legend">First time please scan</legend>
        <div width="10%">
        <img src="data:image/png;base64,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"></img>
        </div>
        <form className="uk-grid-small" onSubmit={this.handleSubmit}>
          <fieldset className="uk-fieldset">
            <div className="uk-margin">
              <input
                className="uk-input uk-form-width-medium"
                id="identifier"
                name="identifier"
                type="identifier"
                placeholder="Email"
                required="true"
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
                required="true"
                onChange={this.handleChange}
              />
            </div>
            <div className="uk-margin">
              <input
                className="uk-input uk-form-width-medium"
                id="token"
                type="token"
                name="token"
                placeholder="token"
                required="true"
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

export default Signin;
