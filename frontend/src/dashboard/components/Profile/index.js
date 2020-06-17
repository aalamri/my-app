import React from "react";
import { handleChange } from "../../../utils/inputs";
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
    this.handleChange = handleChange.bind(this);
  }

  componentDidMount() {
    console.log("Profile.componentDidMount");
    const user = JSON.parse(localStorage.getItem('user'));
    this.setState({user})
    // if(this.props.user && this.props.user.user){
    // const { email } = this.props.user.user;
    // this.setState({ email });
    //    }
  }
  render() {
    const { email, lastName, firstName} = this.state;
    return (
      <div>
        <div className="uk-child-width-1-2" data-uk-grid dir="auto">
        First Name: {this.state.user.lastName}
      </div>
      <div className="uk-child-width-1-2" data-uk-grid dir="auto">
      Last Name: {this.state.user.firstName}
        </div>
        <div className="uk-child-width-1-2" data-uk-grid dir="auto">
          Email: {this.state.user.email}
        </div>
      </div>
    );
  }
}
export default Profile;
