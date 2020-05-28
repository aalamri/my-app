import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from 'react-owl-carousel2';
import { ARTICLES_SORT_ALPHA_ASC, ARTICLES_SORT_ALPHA_DESC, ARTICLES_SORT_CREATED_ASC, ARTICLES_SORT_CREATED_DESC, ARTICLES_QUERY, CATEGORY_ARTICLES_BY_ID_QUERY, CATEGORY_ARTICLES_QUERY } from "./queries";
import Query from "../Query";
import { useQuery } from "@apollo/react-hooks";
import { CATEGORIES_QUERY, } from "../Category/queries";

const avatar = "img/avatar-circle.svg";
const twitter = "img/twitter-circle.svg";
const whatsapp = "img/whatsapp-circle.svg";
const facebook = "img/facebook-circle.svg";

const avatarTale = "img/avatar-circle-tale.svg";
const twitterTale = "img/twitter-circle-tale.svg";
const whatsappTale = "img/whatsapp-circle-tale.svg";
const facebookTale = "img/facebook-circle-tale.svg";
const tale = true;

const options = {
  autoplay: false,
  loop: false,
  margin: 0,
  nav: true,
  slideTransition: 'linear',
  autoplayHoverPause: true,
  navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
  responsive: {
    0: {
      items: 3
    },
    500: {
      items: 3
    },
    600: {
      items: 3
    },
    800: {
      items: 7
    },
    1200: {
      items: 7
    }

  }
};

const events = {
  onDragged: function (event) {
    console.log("onDragged", event);
  },
  onChanged: function (event) {
    console.log("onChanged", event);
  }
};

const ArticlesRow = () => {

  const { data, loading, error } = useQuery(CATEGORIES_QUERY);
  const intialCategories = data ? data.categories : [];
  const articles_data = useQuery(ARTICLES_QUERY).data;
  const initialArticles = articles_data ? articles_data.articles : [];
  const [selectedCategory, setSelectCategory] = useState(null);
  const [likes, setLikes] = useState(0);
  const [articles, getArticles] = useState([]);
  const url = process.env.REACT_APP_BACKEND_URL;


  useEffect(() => {
    console.log('here')
    getArticles(initialArticles);
  }, [initialArticles]);

  const selectCategory = (id) => {
    fetch(url + '/articles?category=' + id).then(res => res.json().then(response => { getArticles(response) }))
  }

  const selectAll = () => {
    fetch(url + '/articles').then(res => res.json().then(response => { getArticles(response) }));
  }

  return (
    <div>
      <section className="hero-section pt-100">
        <div className="container">
          <div className="row align-tem-center justify-content-between">
            {/* <span class="col-lg-1 pr-0 vertical-cenrer" href="#">
              <a href="/articles">
                <img class="img-responsive" src="img/article-color-btn.svg" />
              </a>
            </span>
            <span class="col-lg-1 pl-0 vertical-cenrer" href="#">
              <a href="/cards">

                <img class="img-responsive" src="img/cards-gray-btn.svg" />
              </a>
            </span> */}
            <div className="col-lg-7 col-md-4">
              <h1 className="section-title page-title">Knowledge</h1>
            </div>
            <div className="col-lg-5 col-md-7 text-md-right">
              <div className="pt-2 action-btn-wrap">
                <span class="col-lg-1 col-md-1 pr-0 knowldege-btn" href="#">
                  <a href="/articles">
                    <img class="img-responsive" src="img/article-color-btn.svg" />
                  </a>
                </span>
                <span class="col-lg-1 col-md-1 pl-0 knowldege-btn" href="#">
                  <a href="/cards">
                    <img class="img-responsive" src="img/cards-gray-btn.svg" />
                  </a>
                </span>
                <span class="col-lg-1 sm-align-right">
                  <img src="img/sort-icon.svg" class="dropdown btn sort-btn" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                  <div class="dropdown-menu dropdown-primary" id="dropDiv">
                  <Query query={ARTICLES_SORT_ALPHA_ASC}>
                  {({ data, loading, error }) => {
                    return <div class="dropdown-item" onClick={() => { getArticles(data.articles); }}>Alphabetic(A-Z)</div>
                  }}
                </Query>
                <Query query={ARTICLES_SORT_ALPHA_DESC}>
                  {({ data, loading, error }) => {
                    return <div class="dropdown-item" onClick={() => { getArticles(data.articles); }}>Alphabetic(Z-A)</div>
                  }}
                </Query>
                <Query query={ARTICLES_SORT_CREATED_DESC}>
                  {({ data, loading, error }) => {
                    return <div class="dropdown-item" onClick={() => { getArticles(data.articles); }}>Newest Published</div>
                  }}
                </Query>
                <Query query={ARTICLES_SORT_CREATED_ASC}>
                  {({ data, loading, error }) => {
                    return <div class="dropdown-item" onClick={() => { getArticles(data.articles); }}>Oldest Published</div>
                  }}
                </Query>
                  </div>
                </span>
              </div>
            </div>



            {/* <div style={{ position: 'absolute', right: 0 }}>
              <img src="img/sort-icon.svg" class="dropdown btn sort-btn" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ height: 40 }} />

              <div class="dropdown-menu dropdown-primary  dropdown-menu-right" id="dropDiv">
                <Query query={ARTICLES_SORT_ALPHA_ASC}>
                  {({ data, loading, error }) => {
                    return <div class="dropdown-item" onClick={() => { getArticles(data.articles); }}>Alphabetic(A-Z)</div>
                  }}
                </Query>
                <Query query={ARTICLES_SORT_ALPHA_DESC}>
                  {({ data, loading, error }) => {
                    return <div class="dropdown-item" onClick={() => { getArticles(data.articles); }}>Alphabetic(Z-A)</div>
                  }}
                </Query>
                <Query query={ARTICLES_SORT_CREATED_ASC}>
                  {({ data, loading, error }) => {
                    return <div class="dropdown-item" onClick={() => { getArticles(data.articles); }}>Newest Published</div>
                  }}
                </Query>
                <Query query={ARTICLES_SORT_CREATED_DESC}>
                  {({ data, loading, error }) => {
                    return <div class="dropdown-item" onClick={() => { getArticles(data.articles); }}>Oldest Published</div>
                  }}
                </Query>
              </div>
            </div> */}
          </div>
          <div className="row justify-content-center">
          <div className="col-md-12">
              {/* <nav id="pnProductNav" class="pn-ProductNav">
                <div id="pnProductNavContents" class="pn-ProductNav_Contents">
                  {articles.map((article) => {
                    return (
                      <a href="" class="pn-ProductNav_Link" aria-selected="true">{article.category?.name}</a>
                    );
                  })}
                  <span id="pnIndicator" class="pn-ProductNav_Indicator"></span>
                </div>
              </nav> */}
              <OwlCarousel className="mt-5 text-center owl-carousel category-carousel nav-indicator" options={options} events={events} >
              <div className="px-1 cat-title" style={{ color: selectedCategory === null ? "#e7bd5b" : '#707070'}} onClick={() => { setSelectCategory(null); selectAll(); }}>All Categories</div>
              {intialCategories.length > 0 &&
                intialCategories.map((cat, index) => {
                  return (
              <div className="px-1 cat-title" style={{ color: selectedCategory === cat.id ? "#e7bd5b" : '#707070' }} onClick={() => { setSelectCategory(cat.id); selectCategory(cat.id) }}>{cat?.name}</div>
              );
            })}      
            </OwlCarousel>
          </div>
        </div>
          <div className="row">
            {articles.map((article) => {
              const imageUrl =
                process.env.NODE_ENV !== "development"
                  ? article.image.url
                  : process.env.REACT_APP_BACKEND_URL + article.image?.url ?? 'placeholder';
              return (
                <div key={article.id} class="col-lg-6 pt-5">
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
                        <p className="article-body tale">
                            {article.content.split(' ').slice(0, 35).join(' ')}  .....more
                        </p>
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