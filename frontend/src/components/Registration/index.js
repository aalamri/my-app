import React from "react";
import axios from "axios";

export class Registration extends React.Component {
  state = {
    email: "",
    password: "",
    applying_about_me: ""
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState(
      {
        [name]: value
      }
    );
  };

  handleSubmit = async (event) => {
    event.preventDefault()
    // console.log("Registration.handleSubmit")
    const {email,password,applying_about_me} = this.state

    const data = {
      email,
      password,
      applying_about_me,
      username: email
    }

    const userCreationRes = await axios ({
      method: 'POST',
      url: process.env.REACT_APP_BACKEND_URL + '/auth/local/register',
      data
    })
    // console.log("Registration.handleSubmit userCreationRes", userCreationRes)

    if(this.props.updateUser && typeof this.props.updateUser === 'function'){
      this.props.updateUser(userCreationRes.data)

    }
  }
  render() {
    const { email, password, applying_about_me} = this.state;
    return (
      <div className="uk-child-width-expand@s uk-text-center">
        <legend className="uk-legend">Join As Content Creator</legend>
        <br></br>
        <form className="uk-grid-small" onSubmit={this.handleSubmit}>
          <fieldset className="uk-fieldset">
            <div className="uk-margin">
              <input
                className="uk-input uk-form-width-medium"
                id="email"
                name="email"
                value={email}
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
                value={password}
                placeholder="password"
                onChange={this.handleChange}
              />
            </div>
            <div className="uk-margin">
              <textarea
                className="uk-form-width-large"
                rows="5"
                id="applying_about_me"
                type="text"
                name="applying_about_me"
                value={applying_about_me}
                placeholder="Tell us about you"
                onChange={this.handleChange}
              />
            </div>
          </fieldset>
          <button type="submit">Apply</button>
        </form>
      </div>
    );
  }

}
export default Registration;
