import React from "react";
import {handleChange} from "../../utils/inputs";
class Profile extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      email: "t"
    }
    this.handleChange = handleChange.bind(this)
  }

componentDidMount() {
    console.log("Profile.componentDidMount")
    // if(this.props.user && this.props.user.user){
    const {email} = this.props.user.user
    this.setState({email})
//    }

}
render () {
  const {email} = this.state
  return (
    <div>
      <div className="uk-child-width-1-2" data-uk-grid dir="auto">
       Your Profile
      </div>
      <div>
          <label htmlFor="email">Email</label>
          <input type= "text" name="email" id="email" value={email} onChange={this.handleChange}></input>
      </div>
    </div>
  );
};
}
export default Profile;
