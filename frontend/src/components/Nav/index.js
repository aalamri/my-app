import React, { useState } from "react";
import { Link} from "react-router-dom";
import { getState, getString } from "../../utils";

const AR = "Arabic";
const EN = "English";

const Navbar = () => {
  const state = getState();
  const [searchShow, setSearchShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const toggleSearch = () => {
    setSearchShow(!searchShow);
  };
  const rtlInput = { height: 30, width: 229 };
  const ltrInput = { height: 30, width: 286 };

  return (
    <header className="header">
      <nav className={`navbar navbar-expand-lg fixed-top gradient-purple-bg 
      ${state.siteLanguage === AR ? "navbar-rtl" : ""}`}>
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
            style={{ position: "relative" }}
          >
            <ul className="navbar-nav ml-auto tajawal">
              <li className="nav-item">
                <a className="nav-link page-scroll" href="/">
                  {getString("home")}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link page-scroll" href="/tests">
                  {getString("tests")}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link page-scroll" href="/articles">
                  {getString("knowledge")}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link page-scroll" href="/feedback">
                  {getString("contact-us")}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link page-scroll" href="/about">
                  {getString("about-us")}
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="/signup"
                  className="join-us-btn p-1 pl-3 pr-3 rounded-pill text-center"
                >
                  {getString("join-us-as-a-content-creator")}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">
                  {state.siteLanguage === AR ? "English" : "العربية"}
                </a>
              </li>
              <li
                className="nav-item d-none d-md-none d-lg-block"
                onClick={toggleSearch}
                style={{ width: 32 }}
              >
                {!searchShow && (
                  <i className="fa fa-search nav-link search-icon-color"></i>
                )}
                {searchShow && (
                  <i className="fa fa-times nav-link search-icon-color"></i>
                )}
              </li>
              {searchShow && (
                <div
                  className={`form-inline justify-content-center  d-none d-md-none d-lg-block search-box-nav 
                ${state.siteLanguage === AR ? "search-box-nav-rtl rtl-search-box" : ""}`}
                  style={{ paddingRight: 0, paddingLeft: 0 }}
                >
                  <input
                    className="form-control form-control-sm search-input"
                    type="text"
                    placeholder={state.siteLanguage === AR ? "بحث" : "Search"}
                    aria-label="Search"
                    style={state.siteLanguage === AR ? rtlInput : ltrInput}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                    }}
                  />
                  <Link
                    onClick={toggleSearch}
                    to={{
                      pathname: "/search",
                      state: { searchTerm, category: "all" },
                    }}
                    style={{
                      left: -22,
                      position: "relative",
                      lineHeight: "30px",
                    }}
                  >
                    <i
                      className="fa fa-search search-icon-modal"
                      aria-hidden="true"
                    ></i>
                  </Link>
                </div>
              )}
            </ul>
          </div>
          <ul className={`position-absolute d-sm-block d-md-block d-lg-none search-nav
          ${state.siteLanguage === AR ? "rtl-search-box" : ""}`}>
            <li className="nav-item" onClick={toggleSearch}>
              {!searchShow && (
                <i className="fa fa-search nav-link search-icon-color"></i>
              )}
              {searchShow && (
                <i className="fa fa-times nav-link search-icon-color"></i>
              )}
            </li>
            {searchShow && (
              <div
                className="form-inline justify-content-center search-box-nav-mobile"
                style={{ paddingRight: 0, paddingLeft: 0 }}
              >
                <input
                  className="form-control form-control-sm search-input"
                  type="text"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                />
                <Link
                  onClick={toggleSearch}
                  to={{
                    pathname: "/search",
                    state: { searchTerm, category: "all" },
                  }}
                  style={{
                    left: -22,
                    position: "relative",
                    lineHeight: "30px",
                  }}
                >
                  <i
                    className="fa fa-search search-icon-modal"
                    aria-hidden="true"
                  ></i>
                </Link>
              </div>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

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
