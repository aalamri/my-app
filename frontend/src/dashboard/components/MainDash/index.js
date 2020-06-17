import React from "react";

const Dashboard = () => {
  return (
    <div>
      <div className="uk-child-width-1-2" data-uk-grid dir="auto">
        <h3>Welcome to Modrek</h3>
      </div>
      <div className="uk-width-1-2@s uk-width-2-5@m">
        <ul className="uk-nav uk-nav-default">
          <li className="uk-nav-header">Menu</li>
          <li>
            <a href="/dashboard/articles">
              <span
                className="uk-margin-small-right"
                uk-icon="icon: file-text"
              ></span>{" "}
              Article
            </a>
          </li>
          <li>
            <a href="/dashboard/cards">
              <span
                className="uk-margin-small-right"
                uk-icon="icon: album"
              ></span>{" "}
              Card
            </a>
          </li>
          <li>
            <a href="/dashboard/tests">
              <span
                className="uk-margin-small-right"
                uk-icon="icon: file-edit"
              ></span>{" "}
              Test
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
