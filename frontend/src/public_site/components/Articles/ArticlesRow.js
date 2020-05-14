


import React from "react";
import { Link } from "react-router-dom";

const avatar = "img/avatar-circle.svg";
const twitter = "img/twitter-circle.svg";
const whatsapp = "img/whatsapp-circle.svg";
const facebook = "img/facebook-circle.svg";
const thumbsup = "img/thumbsup.svg";

const avatarTale = "img/avatar-circle-tale.svg";
const twitterTale = "img/twitter-circle-tale.svg";
const whatsappTale = "img/whatsapp-circle-tale.svg";
const facebookTale = "img/facebook-circle-tale.svg";
const thumbsupTale = "img/thumbsup-tale.svg";
const tale = true;

const ArticlesRow = ({ articles }) => {
  
  return (
    <div>
      <section className="hero-section pt-100">
        <div className="container">
          <div className="row">
            <span class="col-lg-1 pr-0 vertical-cenrer" href="#">
              <a href="/articles">

                <img class="img-responsive" src="img/article-gray-btn.svg" />
              </a>
            </span>
            <span class="col-lg-1 pl-0 vertical-cenrer" href="#">
            <a href="/cards">

              <img class="img-responsive" src="img/cards-color-btn.svg" />
              </a>
            </span>
            <span class="col-lg-1">
              <img src="img/sort-icon.svg" class="dropdown btn sort-btn" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />

              <div class="dropdown-menu dropdown-primary" id="dropDiv">
                <a class="dropdown-item" href="#1">sort 1</a>
                <a class="dropdown-item" href="#2">sort 2</a>
                <a class="dropdown-item" href="#3">sort 3</a>
                <a class="dropdown-item" href="#4">sort 4</a>
              </div>
            </span>
          </div>
          <div className="row">

          <div class="pn-ProductNav_Wrapper">
            <nav id="pnProductNav" class="pn-ProductNav">
              <div id="pnProductNavContents" class="pn-ProductNav_Contents">
                {articles.map((article) => {
                  return (
                    <a href="" class="pn-ProductNav_Link" aria-selected="true">{article.category?.name}</a>
                  );
                })}
                <span id="pnIndicator" class="pn-ProductNav_Indicator"></span>
              </div>
            </nav>
          </div>
        </div>
          <div className="row">
          {articles.map((article) => {
                const imageUrl =
                process.env.NODE_ENV !== "development"
                    ? article.image.url
                    : process.env.REACT_APP_BACKEND_URL + article.image?.url ?? 'placeholder';
            return (
              <div class="col-lg-6 pt-5">
              <Link 
              key={article.id} to={`/article/${article.id}`
            }>
            <div class="single-article rounded card border-0 shadow-sm">
              <img
                    src={imageUrl}
                    className="card-img-top position-relative"
                    height="260"
                    alt=""
                />    
                <div class="card-body">
                      <h5 class="testlist-name tale">{article.title}</h5>
                      <p class="article-body tale">{article.content}</p>
                      <hr className="yellow-hr" />
                      <div className="media author-info myflex">
                          <div className="d-inline-flex">
                              <img
                                  className="avatar-placeholder"
                                  src={tale ? avatarTale : avatar}
                                  alt="client"
                              />
                              <div className="d-flex flex-column">
                                  <small class="text-muted ml-2 tale">Name</small>
                                  <small class="text-muted ml-2 tale">{article.published_at}</small>
                              </div>
                          </div>
                          <div className="p-2 d-inline-flex ">
                          <p id="category" className="">
                          {article.category?.name}
                        </p>
                              <img class="social-icon ml-4" src={tale ? thumbsupTale : thumbsup} alt="thumbsup" />
                              <span class="pl-1 likes-number">{article.meta?.likes ?? 0}</span>
                          </div>
                      </div>
                  </div>
                  </div>
                  </Link>
                  </div>
//       {articles.map((article) => {
//         return (
//           <Link
//             to={{
//               pathname: `/article/${article.id}`,
//               state: { article }
//             }}
//             key={`article__${article.id}`}
//             className="uk-link-reset"
//           >
//             <div className="row">
//               {/* <div className="uk-card-media-top">
//                       <img
//                         src={
//                           process.env.REACT_APP_BACKEND_URL + article.image.url
//                         }
//                         alt={article.image.url}
//                         height="100"
//                       />
//                     </div> */}
//               <div className="">
//                 <p id="category" className="">
//                   {article.category?.name}
//                 </p>
//                 <p id="title" className="">
//                   {article.title}
//                 </p>
//                 <p id="title" className="">
//                   Likes {article.meta?.likes ?? 0}
//                 </p>
//               </div>
//           </div>

              // <div>
              //     <div className="ml-lg-2 mr-lg-5 ml-md-4 lr-md-4 mt-5 card-item-slide col-lg-6">
              //       <div className="rounded-card white-bg shadow-md p-4 mb-4 min-width-400">
              //         <div className="client-say d-flex flex-column tale">
              //           <h3 className="tale text-center card-name">
              //             {article.title}
              //           </h3>
              //           <p className="tale text-center">
              //             {article.content}
              //           </p>
              //           <small className="align-self-end">
              //             <u>Arabic Version</u>
              //           </small>
              //         </div>
              //         <hr className="yellow-hr" />
              //         <div className="media author-info myflex">
              //           <div className="d-inline-flex">
              //             <img
              //               className="avatar-placeholder"
              //               src={tale ? avatarTale : avatar}
              //               alt="client"
              //             />
              //             <div className="d-flex flex-column">
              //               <small class="text-muted ml-2 tale">Name</small>
              //               <small class="text-muted ml-2 tale">
              //                 {article.published_at}
              //               </small>
              //             </div>
              //           </div>
              //           <div className="p-2 d-inline-flex ">
              //             <img
              //               class="social-icon d-none d-md-block "
              //               src={tale ? twitterTale : whatsapp}
              //               alt="whatsapp"
              //             />
              //             <img
              //               class="social-icon d-none d-md-block "
              //               src={tale ? whatsappTale : twitter}
              //               alt="twitter"
              //             />
              //             <img
              //               class="social-icon d-none d-md-block "
              //               src={tale ? facebookTale : facebook}
              //               alt="facebook"
              //             />
              //             <img
              //               class="social-icon ml-4"
              //               src={tale ? thumbsupTale : thumbsup}
              //               alt="thumbsup"
              //             />
              //             <span class="pl-1 likes-number">{article.meta?.likes ?? 0}</span>
              //           </div>
              //         </div>
              //       </div>
              //     </div>
              // </div>
            );
          })}
       </div>
        </div>
      </section>

    </div>
  );
};

export default ArticlesRow;