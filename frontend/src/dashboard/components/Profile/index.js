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
      <div className="profile">
      <section className="max-width-880 mx-auto pt-100 mb-5">
      <div className="container">
        <div className="row">
        <div className="col-md-6">
        <div className="form-group tajawal">
             <label className="profile-label">First Name: </label>
      <p type="text">{this.state.user.lastName}</p>
      </div>
      </div>
      <div className="col-md-6">
      <div className="form-group tajawal">
      <label className="profile-label">Last Name: </label>
      <p>{this.state.user.firstName}</p>
        </div>
      </div>
      <div className="col-md-6">
      <div className="form-group tajawal">
      <label className="profile-label">Email: </label>
      <p>{this.state.user.email}</p>
        </div>
      </div>
      </div>
      </div>
      </section>
      </div>
    );
  }
}
export default Profile;
