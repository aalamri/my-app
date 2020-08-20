import React from "react";
import photo from "./about-photo.jpg";
import { getState } from "../../../utils";

const AR = "Arabic";
const EN = "English";

const About = () => {
  const state = getState(); // get from localStorage, or return initial default state
  return (
    <div className="module main-content-wrap ptb-100">
      <div className="container">
        <div className="row align-items-center justify-content-between">
          <div className="col-md-4">
            <div className="download-img">
              <img src={photo} alt="download" className="img-fluid" />
            </div>
          </div>
          <div className="col-md-7">
            <div className={`feature-contents section-heading text-${state.siteLanguage === AR ? "right" : "left"}`}>
              <div className="post-header">
                <p className="article-title pb-0">Who we are? </p>
              </div>
              <div className="post-content text-justify">
                <p>
                  Just then her head struck against the roof of the hall in fact
                  she was now more than nine feet high and she at once took up
                  the little golden key and hurried off to the garden door. The
                  first question of course was, how to get dry again: they had a
                  consultation about this, and after a few minutes it seemed
                  quite natural to Alice to find herself talking familiarly with
                  them.
                </p>
              </div>

              <div className="post-header">
                <p className="article-title mt-5">Our vission and mission </p>
              </div>
              <div className="post-content">
                <p>
                  Just then her head struck against the roof of the hall in fact
                  she was now more than nine feet high and she at once took up
                  the little golden key and hurried off to the garden door. The
                  first question of course was, how to get dry again: they had a
                  consultation about this, and after a few minutes it seemed
                  quite natural to Alice to find herself talking familiarly with
                  them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
