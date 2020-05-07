import React from "react";
import Query from "../Query";
import { Link, withRouter } from "react-router-dom";

import { CATEGORIES_QUERY } from "../Category/queries";
import { getToken, clearToken, clearUser } from "../../../utils/index";



const Navbar = () => {


  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg fixed-top gradient-purple-bg ">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img
              src="img/modrek-logo.svg"
              width="120"
              height="10"
              className="logo-svg"
              alt="logo"
              className="img-fluid"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="ti-menu"></span>
          </button>

          <div
            className="collapse navbar-collapse main-menu"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link page-scroll" href="/">
                  Home
                    </a>
              </li>
              <li className="nav-item">
                <a className="nav-link page-scroll" href="/tests">
                  Tests
                    </a>
              </li>
              <li className="nav-item">
                <a className="nav-link page-scroll" href="/knowledge">
                  Knowledge
                    </a>
              </li>
              <li className="nav-item">
                <a className="nav-link page-scroll" href="#">
                  Contact us
                    </a>
              </li>
              <li className="nav-item">
                <a className="nav-link page-scroll" href="#">
                  About Us
                    </a>
              </li>

              <li className="nav-item ml-5">
                <a href="#contact" class="join-us-btn p-1 pl-3 pr-3 rounded-pill text-center">Join us as a content creator</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#contact">العربية</a>
              </li>
              <li class="nav-item">
                <i class="fa fa-search nav-link search-icon-color"></i>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}


export default Navbar;

// class Navbar extends React.Component {
//   handleSignout = () => {
//     clearToken();
//     clearUser();
//     this.props.history.push("/");
//   };
//   render() {
//     return getToken() !== null ? (
//       <AuthNav handleSignout={this.handleSignout} />
//     ) : (
//         <UnAuthNav />
//       );
//   }
// }

// const AuthNav = ({ handleSignout }) => {
//   return (
//     <nav className="uk-navbar-container" data-uk-navbar>
//       <div className="uk-navbar-left">
//         <ul className="uk-navbar-nav">
//           <li>
//             <Link to="/">Modrek</Link>
//           </li>
//         </ul>
//         <ul className="uk-navbar-nav">
//           <li>
//             <Link to="/dashboard/cards">Cards</Link>
//           </li>
//           <li>
//             <Link to="/dashboard/create-card">Create Card</Link>
//           </li>
//         </ul>
//         <ul className="uk-navbar-nav">
//           <li>
//             <Link to="/dashboard/articles">Articles</Link>
//           </li>
//           <li>
//             <Link to="/dashboard/create-article">Create Article</Link>
//           </li>
//         </ul>
//         <ul className="uk-navbar-nav">
//           <li>
//             <Link to="/dashboard/cards">Tests</Link>
//           </li>
//           <li>
//             <Link to="/dashboard/create-test">Create Test</Link>
//           </li>
//         </ul>
//         <div className="uk-navbar-right">
//           <ul className="uk-navbar-nav">
//             <li>
//               <Link to="/profile">Profile</Link>
//             </li>
//             <li>
//               <button
//                 className="uk-button uk-button-danger uk-button-large"
//                 onClick={handleSignout}
//               >
//                 Sing out
//               </button>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// const UnAuthNav = () => {

//   return (
//     <div>
//       <nav className="uk-navbar-container" data-uk-navbar>
//         <div className="uk-navbar-left">
//           <ul className="uk-navbar-nav">
//             <li>
//               <Link to="/">Modrek</Link>
//             </li>
//           </ul>
//           <ul className="uk-navbar-nav">
//             <li>
//               <Link to="/articles">Articles</Link>
//             </li>
//             <li>
//               <Link to="/cards">Cards</Link>
//             </li>
//             <li>
//               <Link to="/tests">All Tests</Link>
//             </li>
//             <li>
//               <Link to="/create-test">Create Test</Link>
//             </li>
//             <li>
//               <Link to="/tests">All Tests</Link>
//             </li>
//             {/* {categories.map((category, i) => {
//                       return (
//                         <li key={category.id}>
//                           <Link
//                             to={`/category/${category.id}`}
//                             className="uk-link-reset"
//                           >
//                             {category.name}
//                           </Link>
//                         </li>
//                       );
//                     })} */}
//           </ul>
//         </div>
//         <div className="uk-navbar-right">
//           <ul className="uk-navbar-nav">
//             <li>
//               <Link to="/signin">Login</Link>
//             </li>
//             <li>
//               <Link to="/signup">Signup</Link>
//             </li>
//             <li>
//               <Link to="/search">Search</Link>
//             </li>
//           </ul>
//         </div>
//       </nav>
//     </div>
//   );

// };

// export default withRouter(Navbar);
