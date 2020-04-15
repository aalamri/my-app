import React from 'react';
import axios from "axios";
import { setToken } from "../../../utils/index";

const url = process.env.REACT_APP_BACKEND_URL + '/auth/local';

class Signin extends React.Component {

    state = {
        identifier: '',
        password: '',
        loading: false
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
        event.preventDefault();
        const {identifier,password} = this.state

        const data = {
            identifier,
            password,
          }
        if(this.isFormEmpty(this.state)) {
        console.log("Signin.handleSubmit")
        }
    
    try {
        this.setState({loading: true});
        const response = await axios({
            method: 'POST',
            url,
            data
        });
          this.setState({loading: false});
          setToken(response.data.jwt);
          this.redirectUser('/dashboard');
    } catch (err) {
        this.setState({loading: false});

    }
};

    redirectUser = path => this.props.history.push(path);

    isFormEmpty ({identifier,password}) {
        return !identifier || !password;
    }

    render() {
        const {loading } = this.state;
        return (
        <div className="uk-child-width-expand@s uk-text-center">
        <legend className="uk-legend">Login</legend>
        <br></br>
        <form className="uk-grid-small" onSubmit={this.handleSubmit}>
          <fieldset className="uk-fieldset">
            <div className="uk-margin">
              <input
                className="uk-input uk-form-width-medium"
                id="identifier"
                name="identifier"
                type="identifier"
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
          <button class="uk-button uk-button-primary" disabled={loading} type="submit">Apply</button>
        </form>
        </div>
        );
    } 
}

export default Signin