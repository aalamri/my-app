import React from "react";
import { Mutation } from "react-apollo";
import { gql }  from "apollo-boost";

const registerMutation = gql`
mutation Register ($email: String!,$username: String!, $password: String!, $applying_about_me: String!) {
   register(input: {
    email: $email,
    username: $username,
    password: $password,
    applying_about_me: $applying_about_me
   })
  {
    jwt
    user { id email }
  }
}
`;

export class Registration extends React.PureComponent {

  state = {
    email: '',
    username: '',
    password: '',
    applying_about_me: ''
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState( 
      {
        [name]: value
      }
    );
  };

  handleSubmit = (e) => {
  if(!this.isFormEmpty(this.state)) {
    console.log("submitted");
  }
  };

  isFormEmpty = ({ username,email, password, applying_about_me}) => {
  return !username || !email || !password || !applying_about_me;
  }
  
  showToast = toastMessage => {

  }
  render() {
    const {password, email, username, applying_about_me} = this.state;
    return (
    <Mutation mutation={registerMutation}>
      {mutate => (
        <div>
      <div className="uk-child-width-expand@s uk-text-center">
        <form className="uk-grid-small">
          <fieldset className="uk-fieldset">
            <legend className="uk-legend">Join As Content Creator</legend>
            <div className="uk-margin">
              <input
                className="uk-input uk-form-width-medium"
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={this.handleChange}
              ></input>
            </div>
            <div className="uk-margin">
              <input
                className="uk-input uk-form-width-medium"
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={this.handleChange}
              ></input>
            </div>
            <div className="uk-margin">
              <div className="uk-inline">
                <span
                  className="uk-form-icon uk-form-icon-flip"
                  uk-icon="icon: lock"
                ></span>
                <input
                  className="uk-input uk-form-width-medium"
                  type="password"
                  name="password"
                  placeholder="password"
                  value={password}
                  onChange={this.handleChange}
                ></input>
              </div>
            </div>
            <div className="uk-margin">
              <textarea
                className="uk-form-width-large"
                rows="5"
                name="applying_about_me"
                value={applying_about_me}
                onChange={this.handleChange}
                placeholder="Tell us about you"
              ></textarea>
            </div>
          </fieldset>
          <button onSubmit={this.handleSubmit} onClick={async () => {
            const response = await mutate({
              variables: this.state
            });
            console.log(response);
            this.props.history.push("/Dashboard");
          }} className="uk-button uk-button-primary" type="submit">Apply</button>
        </form>
      </div>
    </div>
    )}</Mutation>
    );
  }
}

export default Registration;
