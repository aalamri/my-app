


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ModalRoute, } from 'react-router-modal';

import { ARTICLES_SORT_ALPHA_ASC, ARTICLES_SORT_ALPHA_DESC, ARTICLES_SORT_CREATED_ASC, ARTICLES_SORT_CREATED_DESC, ARTICLES_QUERY, CATEGORY_ARTICLES_BY_ID_QUERY, CATEGORY_ARTICLES_QUERY } from "./queries";
import Query from "../Query";
import { useQuery } from "@apollo/react-hooks";
import { CATEGORIES_QUERY, } from "../Category/queries";
import Article from "./Article";

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

const ArticlesRow = ({ match }) => {

  const { data, loading, error } = useQuery(CATEGORIES_QUERY);
  const intialCategories = data ? data.categories : [];
  const [selectedCategory, setSelectCategory] = useState(null);
  const [articles, getArticles] = useState([]);

  useEffect(() => {
    initialize();
  }, []);

  const initialize = () => {
    fetch('http://localhost:1337/articles').then(res => res.json().then(response => { getArticles(response) }))
  }

  const selectCategory = (id) => {
    fetch('http://localhost:1337/articles?category=' + id).then(res => res.json().then(response => { getArticles(response) }))
  }

  const selectAll = () => {
    fetch('http://localhost:1337/articles').then(res => res.json().then(response => { getArticles(response) }));
  }

  return (
    <div>
      <section className="hero-section pt-100">
        <div className="container" style={{ position: 'relative' }}>
          <div className="row" style={{ alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ border: '1px solid #e7bd5b', borderRadius: 40, height: 50, width: 250, display: 'flex', alignItems: 'center', textAlign: 'center' }}>
              <div href="#" style={{ width: 124, background: '#e7bd5b', borderTopLeftRadius: 20, borderBottomLeftRadius: 20, color: '#ffffff', height: '100%', alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                <a href="/articles" style={{ color: '#ffffff' }}>
                  Articles
              </a>
              </div>
              <div href="#" style={{ width: 124 }}>
                <a href="/cards" style={{ width: 124, height: '100%', color: "#707070", alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                  Cards
                </a>
              </div>
            </div>
            <div style={{ position: 'absolute', right: 0 }}>
              <img src="img/sort-icon.svg" class="dropdown btn sort-btn" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ height: 40 }} />
              <div class="dropdown-menu dropdown-primary  dropdown-menu-right" id="dropDiv">
                <a class="dropdown-item" href="#1">Most Likes</a>
                <a class="dropdown-item" href="#2">Least Likes</a>
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
            </div>
          </div>
          <div className="row">
            <div class="pn-ProductNav_Wrapper">
              <nav id="pnProductNav" class="pn-ProductNav">
                <div id="pnProductNavContents" class="pn-ProductNav_Contents" style={{ display: 'flex', paddingTop: 20 }}>
                  <div class="pn-ProductNav_Link" style={{ fontSize: 20, color: selectedCategory === null ? "#e7bd5b" : '#707070', marginRight: 20 }} onClick={() => { setSelectCategory(null); selectAll(); }}>All Categories</div>
                  {intialCategories.length > 0 &&
                    intialCategories.map((cat, index) => {
                      return (
                        <div class="pn-ProductNav_Link" aria-selected="true" style={{ fontSize: 20, color: selectedCategory === cat.id ? "#e7bd5b" : '#707070', marginRight: 20 }} onClick={() => { setSelectCategory(cat.id); selectCategory(cat.id) }}>{cat?.name}</div>
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
                    key={article.id} to={`article/${article.id}`}>
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
              );
            })}
          </div>
        </div>
      </section>
      {/* <ModalRoute path={`${match.url}/:id`} component={Article} parentPath="/articles" /> */}
    </div>
  );
};

export default ArticlesRow;