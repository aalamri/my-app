import React from "react";

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

const CardsRow = ({ cards }) => {
  return (
    <div>
      <section className="hero-section pt-100">
        <div className="container">
          <div className="row">
            <span class="col-lg-1 pr-0 vertical-cenrer" href="#">
              <a href="/knowledge/articles">

                <img class="img-responsive" src="img/article-gray-btn.svg" />
              </a>
            </span>
            <span class="col-lg-1 pl-0 vertical-cenrer" href="#">
              <img class="img-responsive" src="img/cards-color-btn.svg" />
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
          {cards.map((card) => {
            return (
              <div>
                  <div className="card-item-slide col-lg-5">
                    <div className="rounded-card white-bg shadow-md p-4 mb-4 min-width-400">
                      <div className="client-say d-flex flex-column tale">
                        <h3 className="tale text-center card-name">
                          {card.title}
                        </h3>
                        <p className="tale text-center">
                          {card.content}
                        </p>
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
                          <img
                            class="social-icon d-none d-md-block "
                            src={tale ? twitterTale : whatsapp}
                            alt="whatsapp"
                          />
                          <img
                            class="social-icon d-none d-md-block "
                            src={tale ? whatsappTale : twitter}
                            alt="twitter"
                          />
                          <img
                            class="social-icon d-none d-md-block "
                            src={tale ? facebookTale : facebook}
                            alt="facebook"
                          />
                          <img
                            class="social-icon ml-4"
                            src={tale ? thumbsupTale : thumbsup}
                            alt="thumbsup"
                          />
                          <span class="pl-1 likes-number">121</span>
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

export default CardsRow;
