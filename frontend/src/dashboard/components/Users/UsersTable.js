import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { Button } from "react-bootstrap";
import { ROLES_QUERY } from "./queries";
import Query from "../Query";

const UsersTable = ({ users }) => {
  const getRoles = () => {
    return <Query query={ROLES_QUERY}>
      {({ data: { roles } }) => {
        return <select
          required
          className={"form-control"}
          name={"value"}
          onChange={(e) => { }}>
            {roles.map((role)=>{
              return <option value={role.type}>{role.name}</option>
            })}
        </select>
      }}
    </Query>;
  };
  return (
    <div class="box">
      <section class="content-header">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-6">
              <Link to="/dashboard/create-card">
                <ol class="breadcrumb float-sm-right">
                  <button type="button" class="btn btn-outline-secondary">  <i className="fa fa-plus plus-size pr-2"></i>New Card</button>
                </ol>
              </Link>
            </div>
          </div>
        </div>
      </section>
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
                {users.map((user) => {
                  return (
                    <tr key={user.id}>
                      <td>{user.firstName + ' ' + user.lastName}</td>
                      <td>{user.email}</td>
                      <td>
                        {getRoles()}
                      </td>
                      <td>
                        <Button className="view-btn-color btn-sm">
                          Save
                          </Button>
                        <Button className="uk-button uk-button-default">
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

    </div>
  );
};

export default UsersTable;
