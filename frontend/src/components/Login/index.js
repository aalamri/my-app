import React from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

const loginMutation = gql`
  mutation Login($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      jwt
      user {
        username
        email
        role {
          name
        }
      }
    }
  }
`;
export class Login extends React.PureComponent {
  state = {
    identifier: "",
    password: "",
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { password, identifier } = this.state;
    return (
      <Mutation mutation={loginMutation}>
        {(mutate) => (
          <div>
            <div className="uk-child-width-expand@s uk-text-center">
              <form className="uk-grid-small">
                <fieldset className="uk-fieldset">
                  <legend className="uk-legend">Login</legend>
                  <div className="uk-margin">
                    <input
                      className="uk-input uk-form-width-medium"
                      type="email"
                      name="identifier"
                      placeholder="Email"
                      value={identifier}
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
                </fieldset>
                <button
                  onClick={async () => {
                    const response = await mutate({
                      variables: this.state,
                    });
                    console.log(response);
                    this.props.history.push("/Dashboard");
                  }}
                  className="uk-button uk-button-primary"
                  type="submit"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Login;
