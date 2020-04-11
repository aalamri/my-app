import React from "react";
import { Mutation } from "react-apollo";
import { gql }  from "apollo-boost";

const registerMutation = gql`
mutation Register ($email: String!,$username: String!, $password: String!) {
   register(input: {
    email: $email,
    username: $username,
    password: $password
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
    password: ''
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState( 
      {
        [name]: value
      }
    );
  };

  render() {
    const {password, email, username} = this.state;
    return (
    <Mutation mutation={registerMutation}>
      {mutate => (
        <div>
      <div class="uk-child-width-expand@s uk-text-center">
        <from class="uk-grid-small">
          <fieldset class="uk-fieldset">
            <legend class="uk-legend">Join As Content Creator</legend>
            <div class="uk-margin">
              <input
                class="uk-input uk-form-width-medium"
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={this.handleChange}
              ></input>
            </div>
            <div class="uk-margin">
              <input
                class="uk-input uk-form-width-medium"
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={this.handleChange}
              ></input>
            </div>
            <div class="uk-margin">
              <div class="uk-inline">
                <span
                  class="uk-form-icon uk-form-icon-flip"
                  uk-icon="icon: lock"
                ></span>
                <input
                  class="uk-input uk-form-width-medium"
                  type="password"
                  name="password"
                  placeholder="password"
                  value={password}
                  onChange={this.handleChange}
                ></input>
              </div>
            </div>
            {/* <div class="uk-margin">
              <textarea
                class="uk-form-width-large"
                rows="5"
                placeholder="Tell us about you"
              ></textarea>
            </div> */}
          </fieldset>
          <button onClick={async () => {
            const response = await mutate({
              variables: this.state
            });
            console.log(response);
            this.props.history.push("/");
          }} class="uk-button uk-button-primary" type="submit">Apply</button>
        </from>
      </div>
    </div>
    )}</Mutation>
    );
  }
}

export default Registration;
