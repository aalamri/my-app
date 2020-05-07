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

export default function (props) {
    const { title, content, card_url_in_other_language, meta } = props
    return (
        <div className="ml-lg-5 mr-lg-5 ml-md-4 lr-md-4 card-item-slider">
            <div className="rounded-card white-bg shadow-md p-4 mb-4 min-width-400">
                <div className="client-say d-flex flex-column tale">
                    <h3 className="tale">{title}</h3>
                    <p className="tale">
                        {content.split(' ').slice(0, 35).join(' ')}
                    </p>
                    {card_url_in_other_language &&
                        <small className="align-self-end"><u>Arabic Version</u></small>
                    }
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
                            <small class="text-muted ml-2 tale">{"author"}</small>
                            <small class="text-muted ml-2 tale">{"published_at"}</small>
                        </div>
                    </div>
                    <div className="p-2 d-inline-flex ">
                        <img class="social-icon d-none d-md-block " src={tale ? twitterTale : whatsapp} alt="whatsapp" />
                        <img class="social-icon d-none d-md-block " src={tale ? whatsappTale : twitter} alt="twitter" />
                        <img class="social-icon d-none d-md-block " src={tale ? facebookTale : facebook} alt="facebook" />
                        <img class="social-icon ml-4" src={tale ? thumbsupTale : thumbsup} alt="thumbsup" />
                        <span class="pl-1 likes-number">{meta.likes}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
