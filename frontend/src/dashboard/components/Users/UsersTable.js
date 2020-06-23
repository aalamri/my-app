import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { ROLES_QUERY, DELETE_USER_QUERY, USERS_QUERY, UPDATE_USER_QUERY } from "./queries";
import Query from "../Query";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import { Mutation } from 'react-apollo'
const UsersTable = ({ users }) => {

  const [currentUsers, getUsers] = useState(users);
  const [deleteModal, deleteModalShow] = useState(false);
  const [deleteId, deleteIdSet] = useState(undefined);
  const [updateUser, updateUserSet] = useState({});

  const [getCurrentUsers] = useLazyQuery(USERS_QUERY, { onCompleted: e => { console.log('here') } });

  const getRoles = (user) => {
    return <Query query={ROLES_QUERY}>
      {({ data: { roles } }) => {
        return <select
          className={"form-control"}
          defaultValue={user.role.type}
          onChange={(e) => { var temp = { id: user.id, data: {} }; temp.data.role = roles[e.target.selectedIndex].id; updateUserSet(temp); }}>
          {roles.map((role) => {
            return <option value={role.type} key={role.id} >{role.name}</option>
          })}
        </select>
      }}
    </Query>;
  };
  const handleClose = () => {
    deleteModalShow(false)
  }
  const handleShow = (id) => {
    deleteModalShow(true);
    deleteIdSet(id);
  }

  return (
    <div class="box">

      <section class="content">

        <div class="card">

          <div class="card-body p-0">
            <table class="table table-striped projects">
              <thead>
                <tr>
                  <th> Name</th>
                  <th> Email</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => {
                  return (
                    <tr key={user.id}>
                      <td>{user.firstName + ' ' + user.lastName}</td>
                      <td>{user.email}</td>
                      <td>
                        {getRoles(user)}
                      </td>
                      <td>
                        <Mutation mutation={UPDATE_USER_QUERY} >
                          {(update) => (
                            <Button className="view-btn-color btn-sm" onClick={() => { update({ variables: { id: updateUser.id, data: updateUser.data } }); }}>
                              Save
                            </Button>
                          )}
                        </Mutation>
                        <Button className="uk-button uk-button-default" onClick={() => handleShow(user.id)}>
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
      <Modal show={deleteModal} onHide={() => { handleClose() }}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label >Are you sure you want to delete this user?</Form.Label>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { handleClose() }}>
            Cancel
          </Button>
          <Mutation mutation={DELETE_USER_QUERY} onCompleted={(data) => { console.log(data); getCurrentUsers(); handleClose(); }}>
            {(deleteUser, { data }) => (
              <Button variant="secondary" onClick={() => { deleteUser({ variables: { id: deleteId } }) }}>
                Delete
              </Button>
            )}
          </Mutation>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UsersTable;
