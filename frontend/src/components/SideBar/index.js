import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getState, getString } from "../../utils";
import "./style.css"
const AR = "Arabic";
const EN = "English";

const SideBar = () => {
  const state = getState();
  const [searchShow, setSearchShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const toggleSearch = () => {
    setSearchShow(!searchShow);
  };
  const rtlInput = { height: 30, width: 229 };
  const ltrInput = { height: 30, width: 286 };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav id="sidebar">
      <a className="sidebar-header" href="/">
        <img src={`${window.location.origin}/img/modrek-logo.svg`} width="120" alt="Modrek Logo" className="logo" />
      </a>

      <ul class="list-unstyled components">
        <li>
          <a href="/dashboard" class="nav-link"><i className="fa fa-tachometer pr-2" />Dashboard</a>
        </li>
        <li>
          <a href="/dashboard/articles" class="nav-link"><i className="fa fa-newspaper pr-2" />Articles</a>
        </li>
        <li>
          <a href="/dashboard/cards"><i class="fa fa-book pr-2" />Cards</a>
        </li>
        <li>
          <a href="/dashboard/tests"><i class="fa fa-copy pr-2" />Tests</a>
        </li>
        {user && user.role.type === "reviewer" && <li>
          <a href="/dashboard/reviews"><i class="fa fa-users pr-2" />Reviews</a>
        </li>}
        {user && user.role.type === "admin" && <li>
          <a href="/dashboard/users"><i class="fa fa-users pr-2" />User Management</a>
        </li>}
      </ul>
    </nav>
  );
};

export default SideBar;

