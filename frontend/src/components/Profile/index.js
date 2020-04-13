import React from "react";

class Profile extends React.Component {

componentDidMount() {
    console.log("Profile.componentDidMount")
}
render () {
  return (
    <div>
      <div className="uk-child-width-1-2" data-uk-grid dir="auto">
       Your Profile
      </div>
      <div>
          <label htmlFor="username">Username</label>
          <input type= "text" name="username" id="username"></input>
      </div>
      <div>
          <label htmlFor="email">Email</label>
          <input type= "email" name="email" id="email"></input>
      </div>
    </div>
  );
};
}
export default Profile;
