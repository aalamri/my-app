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

    return (
        <nav id="sidebar">
            <a className="sidebar-header" href="/">
                <img
                    src={`${window.location.origin}/img/modrek-logo.svg`}
                    width="120"
                    alt="Modrek Logo"
                    className="logo"
                />
            </a>

            <ul class="list-unstyled components">
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
                <li>
                    <a href="/dashboard/profile">
                        <span
                            className="uk-margin-small-right"
                            uk-icon="icon: file-edit"
                        ></span>{" "}
                        Profile
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default SideBar;

