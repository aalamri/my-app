import React from "react";
import img from "./article-gray-btn.svg";
import img2 from "./cards-color-btn.svg";
import sort from "./sort-icon.svg";
import avatar from "./avatar-circle.svg";
import twitter from "./twitter-circle.svg";
import whatsapp from "./whatsapp-circle.svg";
import facebook from "./facebook-circle.svg";
import thumbsup from "./thumbsup.svg";

import img1 from "./article-photo-25.jpg";
import img5 from "./article-photo-26.jpg";
import img3 from "./article-photo-27.jpg";
import img4 from "./article-photo-28.jpg";

import avatarTale from "./avatar-circle-tale.svg";
import twitterTale from "./twitter-circle-tale.svg";
import whatsappTale from "./whatsapp-circle-tale.svg";
import facebookTale from "./facebook-circle-tale.svg";
import thumbsupTale from "./thumbsup-tale.svg";

const tale = true;

export default class KnowledgeCard extends React.Component {
    render() {
        const { title, excerpt, author, published_at, likes } = this.props;
        return (
            <React.Fragment>
                <section className="hero-section pt-100">
                    <div className="container">
                        <div className="row">
                            <h1 class="col-lg section-title page-title">Knowledge</h1>
                            <span class="col-lg-1 pr-0 vertical-cenrer" href="#">
                                <a href="/knowledge/articles">

                                    <img class="img-responsive" src={img} />
                                </a>
                            </span>


                            <span class="col-lg-1 pl-0 vertical-cenrer" href="#">
                                <img class="img-responsive" src={img2} />
                            </span>

                            <span class="col-lg-1">
                                <img src={sort} class="dropdown btn sort-btn" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />

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
                                        <a href="#" class="pn-ProductNav_Link" aria-selected="true">category1</a>
                                        <a href="#" class="pn-ProductNav_Link">category2</a>
                                        <a href="#" class="pn-ProductNav_Link">category3</a>
                                        <a href="#" class="pn-ProductNav_Link">category4</a>
                                        <a href="#" class="pn-ProductNav_Link">category5</a>
                                        <a href="#" class="pn-ProductNav_Link">category6</a>
                                        <a href="#" class="pn-ProductNav_Link">category7</a>
                                        <a href="#" class="pn-ProductNav_Link">category8</a>
                                        <a href="#" class="pn-ProductNav_Link">category9</a>
                                        <a href="#" class="pn-ProductNav_Link">category10</a>
                                        <a href="#" class="pn-ProductNav_Link">category11</a>
                                        <a href="#" class="pn-ProductNav_Link">category12</a>
                                        <span id="pnIndicator" class="pn-ProductNav_Indicator"></span>
                                    </div>
                                </nav>
                                <button id="pnAdvancerLeft" class="pn-Advancer pn-Advancer_Left" type="button">
                                    <svg class="pn-Advancer_Icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 551 1024"><path d="M445.44 38.183L-2.53 512l447.97 473.817 85.857-81.173-409.6-433.23v81.172l409.6-433.23L445.44 38.18z" /></svg>
                                </button>
                                <button id="pnAdvancerRight" class="pn-Advancer pn-Advancer_Right" type="button">
                                    <svg class="pn-Advancer_Icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 551 1024"><path d="M105.56 985.817L553.53 512 105.56 38.183l-85.857 81.173 409.6 433.23v-81.172l-409.6 433.23 85.856 81.174z" /></svg>
                                </button>
                            </div>


                            <div className="row">

                                <div className="ml-lg-2 mr-lg-5 ml-md-4 lr-md-4 mt-5 card-item-slide col-lg-6">
                                    <div className="rounded-card white-bg shadow-md p-4 mb-4 min-width-400">
                                        <div className="client-say d-flex flex-column tale">
                                            <h3 className="tale text-center card-name">Card title</h3>
                                            <p className="tale text-center">
                                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis.
                                        </p>
                                            <small className="align-self-end"><u>Arabic Version</u></small>
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
                                                    <small class="text-muted ml-2 tale">20 Mar 2020</small>
                                                </div>
                                            </div>
                                            <div className="p-2 d-inline-flex ">
                                                <img class="social-icon d-none d-md-block " src={tale ? twitterTale : whatsapp} alt="whatsapp" />
                                                <img class="social-icon d-none d-md-block " src={tale ? whatsappTale : twitter} alt="twitter" />
                                                <img class="social-icon d-none d-md-block " src={tale ? facebookTale : facebook} alt="facebook" />
                                                <img class="social-icon ml-4" src={tale ? thumbsupTale : thumbsup} alt="thumbsup" />
                                                <span class="pl-1 likes-number">121</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="ml-lg-2 mr-lg-5 ml-md-4 lr-md-4 card-item-slide col-lg-6">
                                    <div className="rounded-card white-bg shadow-md p-4 mb-4 min-width-400">
                                        <div className="client-say d-flex flex-column tale">
                                            <h3 className="tale text-center card-name">Card title</h3>
                                            <p className="tale text-center">
                                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis.

                                        </p>
                                            <small className="align-self-end"><u>Arabic Version</u></small>
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
                                                    <small class="text-muted ml-2 tale">20 Mar 2020</small>
                                                </div>
                                            </div>
                                            <div className="p-2 d-inline-flex ">
                                                <img class="social-icon d-none d-md-block " src={tale ? twitterTale : whatsapp} alt="whatsapp" />
                                                <img class="social-icon d-none d-md-block " src={tale ? whatsappTale : twitter} alt="twitter" />
                                                <img class="social-icon d-none d-md-block " src={tale ? facebookTale : facebook} alt="facebook" />
                                                <img class="social-icon ml-4" src={tale ? thumbsupTale : thumbsup} alt="thumbsup" />
                                                <span class="pl-1 likes-number">121</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="ml-lg-2 mr-lg-5 ml-md-4 lr-md-4 card-item-slide col-lg-6">
                                    <div className="rounded-card white-bg shadow-md p-4 mb-4 min-width-400">
                                        <div className="client-say d-flex flex-column tale">
                                            <h3 className="tale text-center card-name">Card title</h3>
                                            <p className="tale text-center">
                                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis.

                                        </p>
                                            <small className="align-self-end"><u>Arabic Version</u></small>
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
                                                    <small class="text-muted ml-2 tale">20 Mar 2020</small>
                                                </div>
                                            </div>
                                            <div className="p-2 d-inline-flex ">
                                                <img class="social-icon d-none d-md-block " src={tale ? twitterTale : whatsapp} alt="whatsapp" />
                                                <img class="social-icon d-none d-md-block " src={tale ? whatsappTale : twitter} alt="twitter" />
                                                <img class="social-icon d-none d-md-block " src={tale ? facebookTale : facebook} alt="facebook" />
                                                <img class="social-icon ml-4" src={tale ? thumbsupTale : thumbsup} alt="thumbsup" />
                                                <span class="pl-1 likes-number">121</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="ml-lg-2 mr-lg-5 ml-md-4 lr-md-4 card-item-slide col-lg-6">
                                    <div className="rounded-card white-bg shadow-md p-4 mb-4 min-width-400">
                                        <div className="client-say d-flex flex-column tale">
                                            <h3 className="tale text-center card-name">Card title</h3>
                                            <p className="tale text-center">
                                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis.
                                        </p>
                                            <small className="align-self-end"><u>Arabic Version</u></small>
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
                                                    <small class="text-muted ml-2 tale">20 Mar 2020</small>
                                                </div>
                                            </div>
                                            <div className="p-2 d-inline-flex ">
                                                <img class="social-icon d-none d-md-block " src={tale ? twitterTale : whatsapp} alt="whatsapp" />
                                                <img class="social-icon d-none d-md-block " src={tale ? whatsappTale : twitter} alt="twitter" />
                                                <img class="social-icon d-none d-md-block " src={tale ? facebookTale : facebook} alt="facebook" />
                                                <img class="social-icon ml-4" src={tale ? thumbsupTale : thumbsup} alt="thumbsup" />
                                                <span class="pl-1 likes-number">121</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="ml-lg-2 mr-lg-5 ml-md-4 lr-md-4 card-item-slide col-lg-6">
                                    <div className="rounded-card white-bg shadow-md p-4 mb-4 min-width-400">
                                        <div className="client-say d-flex flex-column tale">
                                            <h3 className="tale text-center card-name">Card title</h3>
                                            <p className="tale text-center">
                                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis.
                                        </p>
                                            <small className="align-self-end"><u>Arabic Version</u></small>
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
                                                    <small class="text-muted ml-2 tale">20 Mar 2020</small>
                                                </div>
                                            </div>
                                            <div className="p-2 d-inline-flex ">
                                                <img class="social-icon d-none d-md-block " src={tale ? twitterTale : whatsapp} alt="whatsapp" />
                                                <img class="social-icon d-none d-md-block " src={tale ? whatsappTale : twitter} alt="twitter" />
                                                <img class="social-icon d-none d-md-block " src={tale ? facebookTale : facebook} alt="facebook" />
                                                <img class="social-icon ml-4" src={tale ? thumbsupTale : thumbsup} alt="thumbsup" />
                                                <span class="pl-1 likes-number">121</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="ml-lg-2 mr-lg-5 ml-md-4 lr-md-4 card-item-slide col-lg-6">
                                    <div className="rounded-card white-bg shadow-md p-4 mb-4 min-width-400">
                                        <div className="client-say d-flex flex-column tale">
                                            <h3 className="tale text-center card-name">Card title</h3>
                                            <p className="tale text-center">
                                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis.
                                        </p>
                                            <small className="align-self-end"><u>Arabic Version</u></small>
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
                                                    <small class="text-muted ml-2 tale">20 Mar 2020</small>
                                                </div>
                                            </div>
                                            <div className="p-2 d-inline-flex ">
                                                <img class="social-icon d-none d-md-block " src={tale ? twitterTale : whatsapp} alt="whatsapp" />
                                                <img class="social-icon d-none d-md-block " src={tale ? whatsappTale : twitter} alt="twitter" />
                                                <img class="social-icon d-none d-md-block " src={tale ? facebookTale : facebook} alt="facebook" />
                                                <img class="social-icon ml-4" src={tale ? thumbsupTale : thumbsup} alt="thumbsup" />
                                                <span class="pl-1 likes-number">121</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>


                </section>
            </React.Fragment >
        );
    }
}
