import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { ROLES_QUERY, DELETE_USER_QUERY, USERS_QUERY } from "./queries";
import Query from "../Query";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import { Mutation } from 'react-apollo'
const UsersTable = ({ users }) => {


  const [currentUsers, getUsers] = useState(users);
  const [deleteModal, deleteModalShow] = useState(false);
  const [deleteId, deleteIdSet] = useState(undefined);

  // const [deleteUserMutation] = useMutation(DELETE_USER_QUERY);
  // const [getUsersQuery, { loading, data }] = useLazyQuery(USERS_QUERY, {
  //   onCompleted: data => {
  //     console.log('data ', data);
  //     getUsers(data.users); // multiple times
  //   }
  // });


  const getRoles = (type) => {
    return <Query query={ROLES_QUERY}>
      {({ data: { roles } }) => {
        return <select
          className={"form-control"}
          name={"value"}
          onChange={(e) => { }}>
          {roles.map((role) => {
            return <option value={role.type} key={role.id} selected={role.type === type}>{role.name}</option>
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
  // const deleteUser = async () => {
  //   await deleteUserMutation({ variables: { id: deleteId } });
  //   deleteModalShow(false);
  //   getUsersQuery();
  //   // getUsers(data.users);

  //   // console.log(data.users);
  // }
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
                        {getRoles(user.role.type)}
                      </td>
                      <td>
                        <Button className="view-btn-color btn-sm">
                          Save
                          </Button>

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
          <Mutation mutation={DELETE_USER_QUERY} refetchQueries={[{ query: USERS_QUERY, }]} update={(cache, { data: data }) => {console.log(data, cache); handleClose();}}>
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
