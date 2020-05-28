import React, { useState } from "react";
import SearchModal from "../Search/SearchModal";
import Query from "../Query";
import { Link, withRouter } from "react-router-dom";

import { CATEGORIES_QUERY } from "../Category/queries";
import { getToken, clearToken, clearUser } from "../../../utils/index";



const Navbar = () => {

  const [searchShow, setSearchShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const toggleSearch = () => {
    setSearchShow(!searchShow);
  }
  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg fixed-top gradient-purple-bg ">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img
              src={`${window.location.origin}/img/modrek-logo.svg`}
              width="120"
              // height="auto"
              alt="Modrek Logo"
              className="logo"
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
            style={{ position: 'relative' }}
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
                <a className="nav-link page-scroll" href="/articles">
                  Knowledge
                    </a>
              </li>
              <li className="nav-item">
                <a className="nav-link page-scroll" href="/feedback">
                  Contact us
                    </a>
              </li>
              <li className="nav-item">
                <a className="nav-link page-scroll" href="/about">
                  About Us
                    </a>
              </li>

              <li className="nav-item">
                <a href="/signup" className="join-us-btn p-1 pl-3 pr-3 rounded-pill text-center">Join us as a content creator</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">العربية</a>
              </li>
              <li className="nav-item d-none d-md-none d-lg-block" onClick={toggleSearch} style={{ width: 32 }}>
                {!searchShow && <i className="fa fa-search nav-link search-icon-color"></i>}
                {searchShow && <i className="fa fa-times nav-link search-icon-color"></i>}
              </li>
              {searchShow && <div class="form-inline justify-content-center  d-none d-md-none d-lg-block" style={{ position: 'absolute', right: 32, width: 300, background: '#593a6c', padding: 17 }}>
                <input class="form-control form-control-sm mr-3 w-75 search-input" type="text" placeholder="Search" aria-label="Search" style={{ height: 30 }} onChange={(e) => { setSearchTerm(e.target.value) }} />
                <Link onClick={toggleSearch} to={{ pathname: "/search", state: { searchTerm, category:'all' } }}><i class="fa fa-search search-icon-modal" aria-hidden="true"></i></Link>
              </div>}
            </ul>
          </div>
          <ul className="position-absolute search-nav d-sm-block d-md-block d-lg-none">
            <li className="nav-item" onClick={toggleSearch}>
              <i className="fa fa-search nav-link search-icon-color"></i>
            </li>
          </ul>
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
