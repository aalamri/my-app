import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Query from "../Query";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { CATEGORIES_QUERY } from "../Category/queries";
import { CATEGORY_CARDS_QUERY, CATEGORY_CARDS_BY_ID_QUERY, CARDS_QUERY, CARDS_SORT_ALPHA_ASC, CARDS_SORT_CREATED_ASC, CARDS_SORT_ALPHA_DESC, CARDS_SORT_CREATED_DESC } from "./queries";

import { FacebookShareButton, WhatsappShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, WhatsappIcon, TwitterIcon } from "react-share";
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

const CardsRow = () => {
  const { data, loading, error } = useQuery(CATEGORIES_QUERY);
  const intialCategories = data ? data.categories : [];
  const cards_data = useQuery(CARDS_QUERY).data;
  const initialCards = cards_data ? cards_data.cards : [];
  const [selectedCategory, setSelectCategory] = useState(null);
  const [likes, setLikes] = useState(0);
  const [cards, getCards] = useState([]);

  useEffect(() => {
    getCards(initialCards);  
  }, [initialCards]);

  function handleCategory(id) {
    setSelectCategory(id);    
  }

  const handleClick = value => () => 
  alert(value)

  const selectCategory = (id) => {
    fetch('http://localhost:1337/cards?category=' + id).then(res => res.json().then(response => { getCards(response) }))
  }

  const selectAll = () => {
    fetch('http://localhost:1337/cards').then(res => res.json().then(response => { getCards(response) }));
  }
  return (
    <div>
      <section className="hero-section pt-100">
        <div className="container" style={{position:'relative'}}>
          <div className="row" style={{alignItems:'center', justifyContent:'center'}}>
            <div style={{border: '1px solid #4a90e2',    borderRadius: 40,    height: 50,    width: 250, display:'flex', alignItems:'center', textAlign:'center'}}>   
              <div href="#" style={{width:124, color:'#ffffff', height:'100%', alignItems:'center', display:'flex', justifyContent:'center'}}>
                <a href="/articles">
                  Articles
                </a>
              </div>
              <div href="#"  style={{width:124, height:'100%', alignItems:'center', display:'flex', justifyContent:'center', background:'#4a90e2',borderTopRightRadius:20, borderBottomRightRadius:20, }}>
                <a href="/cards" style={{color:'#FFFFFF'}}>
                  Cards
                </a>
              </div>
            </div>
            <div style={{position:'absolute', right:0}}>
              <img src="img/sort-icon.svg" class="dropdown btn sort-btn" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{height:40}}/>
              <div class="dropdown-menu dropdown-primary dropdown-menu-right" id="dropDiv">
                <a class="dropdown-item" >Most Likes</a>
                <a class="dropdown-item" >Least Likes</a>

                <Query query={CARDS_SORT_ALPHA_ASC}>
                  {({ data, loading, error }) => {
                      return <div class="dropdown-item" onClick={()=>{getCards(data.cards); }}>Alphabetic(A-Z)</div>                    
                  }}
                </Query>
                <Query query={CARDS_SORT_ALPHA_DESC}>
                  {({ data, loading, error }) => {
                      return <div class="dropdown-item" onClick={()=>{getCards(data.cards); }}>Alphabetic(Z-A)</div>                    
                  }}
                </Query>
                <Query query={CARDS_SORT_CREATED_ASC}>
                  {({ data, loading, error }) => {
                      return <div class="dropdown-item" onClick={()=>{getCards(data.cards); }}>Newest Published</div>                    
                  }}
                </Query>
                <Query query={CARDS_SORT_CREATED_DESC}>
                  {({ data, loading, error }) => {
                      return <div class="dropdown-item" onClick={()=>{getCards(data.cards); }}>Oldest Published</div>                    
                  }}
                </Query>
                
              </div>
            </div>
          </div>
          <div className="row">
            <div class="pn-ProductNav_Wrapper">
              <nav id="pnProductNav" class="pn-ProductNav">
                <div id="pnProductNavContents" class="pn-ProductNav_Contents" style={{display:'flex', paddingTop:20}}>
                  {/* <Query query={CARDS_QUERY} id={selectedCategory}>
                    {({ data }) => { */}
                     <div class="pn-ProductNav_Link" style={{fontSize:20, color: selectedCategory === null ? "#4a90e2":'black', marginRight:20}} onClick={()=>{setSelectCategory(null); selectAll();}}>All Categories</div>
                    {/* }}
                  </Query> */}
                 {intialCategories.length > 0 &&
                  intialCategories.map((cat, index) => {
                    return (
                      // <Query query={selectedCategory === null ? CATEGORY_CARDS_QUERY : CATEGORY_CARDS_BY_ID_QUERY} id={selectedCategory} key={index}>
                      //   {({ data }) => {
                          <div class="pn-ProductNav_Link" aria-selected="true" style={{fontSize:20, color: selectedCategory === cat.id ? "#4a90e2":'black', marginRight:20}} onClick={()=>{handleCategory(cat.id); selectCategory(cat.id)}}>{cat?.name}</div>
                      //   }}
                      // </Query>

                    );
                  })}
                  <span id="pnIndicator" class="pn-ProductNav_Indicator"></span>
                </div>
              </nav>
            </div>
          </div>
          <div className="row">
            {cards.map((card) => {
              const shareUrl = `www.google.com/card/${card.id}`
              const shareUrlDemo = `www.google.com`

              return (
                <div class="col-lg-6 pt-5">

                  <div class="single-article rounded card border-0 shadow-sm">
                    <div className="rounded-card white-bg shadow-md p-4 mb-4 min-width-400">
                      <div className="client-say d-flex flex-column tale">
                      <Link key={card.id} to={`/card/${card.id}`}>
                        <h3 className="tale text-center card-name">
                          {card.title}
                        </h3>
                        <p className="tale text-center">
                          {card.content}
                        </p>
                        </Link>
                        <small className="align-self-end">
                          <u>Arabic Version</u>
                        </small>
                      </div>
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
                            <small class="text-muted ml-2 tale">
                              {card.published_at}
                            </small>
                          </div>
                        </div>
                        <div className="p-2 d-inline-flex ">
                          <TwitterShareButton
                            url={shareUrlDemo}
                            quote="Check out this Morek Card"
                            className="social-icon d-none d-md-block"
                            alt="twitter"
                          >
                            <TwitterIcon size={32} round />
                          </TwitterShareButton>
                          <WhatsappShareButton
                            url={shareUrlDemo}
                            quote="Check out this Morek Card"
                            className="social-icon d-none d-md-block"
                            alt="whatsapp"
                          >
                            <WhatsappIcon size={32} round />
                          </WhatsappShareButton>
                          <FacebookShareButton
                            url={shareUrlDemo}
                            quote="Check out this Morek Card"
                            className="social-icon d-none d-md-block"
                            alt="facebook"

                          >
                            <FacebookIcon size={32} round />
                          </FacebookShareButton>
                          {/* <img
                            class="social-icon d-none d-md-block "
                            src={tale ? facebookTale : facebook}
                            alt="facebook"
                          /> */}
                          
                          <img
                            class="social-icon ml-4"
                            src={tale ? thumbsupTale : thumbsup}
                            alt="thumbsup"
                          />
                          <Link>
                          <span class="pl-1 likes-number" >{card.meta?.likes ?? 0}
                          </span>
                          </Link>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
};

const getCatID = (cats, cat) => cats?.find(({ name }) => name === cat).id;

export default CardsRow;
