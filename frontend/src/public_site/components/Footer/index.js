
import React from 'react';
import { Link } from 'react-router-dom';

export default function () {
    return (
        <footer>
            <div className="footer-bottom gray-light-bg pt-4 pb-1 gradient-purple-reverse-bg">
                <div className="container">
                    <div className="row justify-content-center text-center">
                        <ul className="list-inline footer-list">
                            <li className="footer-links list-inline-item mx-3 pb-3"><Link to="/">Home</Link></li>
                            <li className="footer-links list-inline-item mx-3 pb-3"><Link to="/tests">Tests</Link></li>
                            <li className="footer-links list-inline-item mx-3 pb-3"><Link to="/articles">Knowledge</Link></li>
                            <li className="footer-links list-inline-item mx-3 pb-3"><Link to="/feedback">Contact us</Link></li>
                            <li className="footer-links list-inline-item mx-3 pb-3"><Link to="/about">About us</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer >
    )
}