import React from "react";

import { Modal, Button, Form } from 'react-bootstrap'
import { handleChange } from "../../../utils/inputs";

import "./style.css"
class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},

            passwordModal: false
        };
        this.handleChange = handleChange.bind(this);
    }

    componentDidMount() {
        console.log("Profile.componentDidMount");
        const user = JSON.parse(localStorage.getItem('user'));
        this.setState({ user })
        // if(this.props.user && this.props.user.user){
        // const { email } = this.props.user.user;
        // this.setState({ email });
        //    }
    }

    changePassword() {
        this.setState({ passwordModal: true });
    }

    deleteAccount() {

    }

    handleClose() {
        this.setState({ passwordModal: false })
    }
    render() {
        const { email, lastName, firstName } = this.state;
        return (
            <div className="dashboard-profile">
            <div className={"row action-row"}>
            <Button variant="warning" className={"change-password"} onClick={() => { this.changePassword() }}>Change Password</Button>
            <Button variant="secondary" onClick={() => { this.deleteAccount() }}>Delete Account</Button>
             </div>
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
                <Modal show={this.state.passwordModal} onHide={() => { this.handleClose() }}>
                    <Modal.Header closeButton>
                        <Modal.Title>Change Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Label >Current Password</Form.Label>
                        <Form.Control />
                        <Form.Label >New Password</Form.Label>
                        <Form.Control />
                        <Form.Label >Confirm New Password</Form.Label>
                        <Form.Control />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => { this.handleClose() }}>
                            Cancel
                        </Button>
                        <Button variant="secondary" onClick={() => { this.handleClose() }}>
                            Change
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
export default Profile;
