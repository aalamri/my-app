import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { ROLES_QUERY, DELETE_USER_QUERY, USERS_QUERY, UPDATE_USER_QUERY } from "./queries";
import Query from "../Query";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import { Mutation } from 'react-apollo';
import swal from 'sweetalert';
import Axios from "axios";

class UsersTable extends React.Component {

  // const [currentUsers, getUsers] = useState(users);
  // const [deleteModal, deleteModalShow] = useState(false);
  // const [deleteId, deleteIdSet] = useState(undefined);
  // const [updateUser, updateUserSet] = useState({});

  // const [getCurrentUsers] = useLazyQuery(USERS_QUERY, { onCompleted: e => { console.log('here') } });

  state = {
    currentUsers: [],
    deleteModalShow: false,
    deleteId: "",
    updateUser: {}
  }

  componentDidMount() {
    this.fetchUsers()
  }

  fetchUsers() {
    this.setState({ currentUsers: [] });
    Axios.get(process.env.REACT_APP_BACKEND_URL + '/users').then(response => {
      this.setState({ currentUsers: response.data })
    })
  }

  getRoles = (user) => {
    return <Query query={ROLES_QUERY}>
      {({ data: { roles } }) => {
        return <select
          className={"form-control"}
          defaultValue={user.role.type}
          onChange={(e) => { var temp = { id: user.id, data: {} }; temp.data.role = roles[e.target.selectedIndex].id; this.setState({ updateUser: temp }) }}>
          {roles.map((role) => {
            return <option value={role.type} key={role.id} >{role.name}</option>
          })}
        </select>
      }}
    </Query>;
  };
  handleClose = () => {
    this.setState({ deleteModalShow: false })
  }
  handleShow = (id) => {
    this.setState({ deleteModalShow: true, deleteId: id })
  }

  render() {
    return (
      <div className="box" >

        <section className="content">

          <div className="card">

            <div className="card-body p-0">
              <table className="table table-striped projects">
                <thead>
                  <tr>
                    <th> Name</th>
                    <th> Email</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.currentUsers.map((user) => {
                    return (
                      <tr key={user.id}>
                        <td>{user.firstName + ' ' + user.lastName}</td>
                        <td>{user.email}</td>
                        <td>
                          {this.getRoles(user)}
                        </td>
                        <td>
                          <Mutation mutation={UPDATE_USER_QUERY} onCompleted={() => { swal("Success", "Send to Review!", "success"); }}>
                            {(update) => (
                              <Button className="view-btn-color btn-sm" onClick={() => { update({ variables: { id: this.state.updateUser.id, data: this.state.updateUser.data } }); }}>
                                Save
                              </Button>
                            )}
                          </Mutation>
                          <Button className="uk-button uk-button-default" onClick={() => this.handleShow(user.id)}>
                            <i className={"fa fa-trash"} />
                          </Button>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>

            </div>
          </div>
        </section>
        <Modal show={this.state.deleteModalShow} onHide={() => { this.handleClose() }}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Label >Are you sure you want to delete this user?</Form.Label>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => { this.handleClose() }}>
              Cancel
          </Button>
            <Mutation mutation={DELETE_USER_QUERY} onCompleted={(data) => { swal("Success", "Send to Review!", "success"); this.handleClose(); this.fetchUsers() }}>
              {(deleteUser) => (
                <Button variant="secondary" onClick={() => { deleteUser({ variables: { id: this.state.deleteId } }) }}>
                  Delete
                </Button>
              )}
            </Mutation>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
};

export default UsersTable;
