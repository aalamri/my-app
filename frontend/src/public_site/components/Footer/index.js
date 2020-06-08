import React from "react";
import { Link } from "react-router-dom";
import { getString } from "../../../utils";

export default function () {
  return (
    <footer>
      <div className="footer-bottom gray-light-bg pt-4 pb-1 gradient-purple-reverse-bg">
        <div className="container">
          <div className=" text-center">
            <ul className="list-inline footer-list ">
              <li className="footer-links list-inline-item mr-4 pb-3">
                <Link className="tajawal" to="/">
                Copy Right 2020, Modrek
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
