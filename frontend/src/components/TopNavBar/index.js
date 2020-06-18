import React from "react";

import uk_flag from "../../assets/image/uk.svg";
import sd_flag from "../../assets/image/sd.svg";
import fake_user from "../../assets/image/adam.jpg"


import './style.css'
const TopBar = (props) => {

    const { title } = props;

    const logOut = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("jwt");
        window.location.reload();
    }

    const setLanguage = () => {
        
    }

    return (
        <nav class="top-navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid" style={{ alignItems: 'center', display: 'flex' }}>
                <button type="button" id="sidebarCollapse" class="navbar-btn">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <h4 style={{ margin: '0px 0px 0px 20px' }}>{title}</h4>
                <div className={"action-area"}>
                    <div className="col-auto active ">
                        <div className={"dropdown-toggle d-flex align-items-center"} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img src={uk_flag} alt="" className={"w-20"} />EN
                        </div>
                        <ul className={"dropdown-menu dropdown-menu-right"}>
                            <li className={"dropdown-item d-flex align-items-center"}><img src={uk_flag} alt="" />EN</li>
                            <li className={"dropdown-item d-flex align-items-center"}><img src={sd_flag} alt="" />عربى</li>
                        </ul>
                    </div>
                    <div className="col-auto active ">
                        <div className={"dropdown-toggle d-flex align-items-center"} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img src={fake_user} alt="" className={"avatar"} />
                        </div>
                        <ul className={"dropdown-menu dropdown-menu-right"}>
                            <li className={"dropdown-item d-flex align-items-center"}><a href="/dashboard/profile">Profile</a></li>
                            <li className={"dropdown-item d-flex align-items-center"} onClick={logOut}>Log out</li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav >
    );
};

export default TopBar;
