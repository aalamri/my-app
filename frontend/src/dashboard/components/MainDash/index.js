import React from "react";

const Dashboard = () => {
  return (
    <div>
      <div className="uk-child-width-1-2" data-uk-grid dir="auto">
        <h3>Welcome to Modrek</h3>
      </div>
      <div class="uk-width-1-2@s uk-width-2-5@m">
        <ul class="uk-nav uk-nav-default">
          <li class="uk-nav-header">Menu</li>
          <li>
            <a href="/articles">
              <span
                class="uk-margin-small-right"
                uk-icon="icon: file-text"
              ></span>{" "}
              Article
            </a>
          </li>
          <li>
            <a href="/cards">
              <span class="uk-margin-small-right" uk-icon="icon: album"></span>{" "}
              Card
            </a>
          </li>
          <li>
            <a href="/tests">
              <span
                class="uk-margin-small-right"
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
