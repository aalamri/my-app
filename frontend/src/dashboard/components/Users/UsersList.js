import React from "react";
import UsersTable from "./UsersTable";
import Query from "../Query";
import { USERS_QUERY } from "./queries";
import Dashboard from "../MainDash";

const Users = () => {
  return (
    <div>
      <div className="uk-container uk-container-medium">
        <Query query={USERS_QUERY}>
          {({ data: { users } }) => {
            return <UsersTable users={users} />;
          }}
        </Query>
      </div>
    </div>
  );
};

export default Users;
