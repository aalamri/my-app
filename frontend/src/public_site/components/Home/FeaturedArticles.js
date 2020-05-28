import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Link } from 'react-router-dom';

import { FEATURED_ARTICLE_QUERY } from "./queries";

export default function (props) {
    const { data: articlesData, loading, error } = useQuery(FEATURED_ARTICLE_QUERY);
    const [articles, setArticles] = useState([])

    useEffect(() => {
        if (articlesData?.articles.length > 0) {
            const featuredArticles = articlesData.articles.filter((a) =>
                a.status === 'Approved' && a.is_pinned
            )
            return setArticles(featuredArticles)
        }
    }, [articlesData])

    return (
        <section id="about" className="about-us">
            <div className="container">
                <div class="d-flex justify-content-between align-items center">
                    <h1 class="titles mb-5 section-title">Articles</h1>
                    <span class="pt-4 d-none d-md-block"><Link to="/articles" className="see-more-link">See More</Link></span>
                </div >
                {loading && <p className="text-center">Loading...</p>}
                <div className="row align-items-center">
                    {articles?.map(article =>
                        <SingleArticle key={article.id} {...article} />
                    )}
                </div>
                <div class="d-flex justify-content-center mt-4">
                    <span class="d-md-none"><Link to="/articles" className="see-more-link-mobile">See More</Link></span>
                </div >
            </div>
        </section>
    );
}

const SingleArticle = (props) => {
    const { title, content, image } = props
    const imageUrl =
        process.env.NODE_ENV !== "development"
            ? image.url
            : process.env.REACT_APP_BACKEND_URL + image?.url ?? 'placeholder';

    return (
        <div className="col-lg-6 col-md-12">
            <div className="single-blog-card card border-0">
                <img
                    src={imageUrl}
                    className="card-img-top position-relative"
                    alt=""
                />
                <div className="card-body">
                    <h3 className="card-title">
                        {title}
                    </h3>
                    <p className="card-content">
                        {content.split(' ').slice(0, 35).join(' ')} </p>

                </div>
                <div class="card-footer d-flex align-items-center justify-content-between border-0">
                    <div className="author-meta text-left">
                        <h6>By Ahmad Ali</h6>
                        <span>11/11/2020</span>
                    </div>
                    <div className="social-icons text-right">
                        <ul className="list-inline">
                            <li className="list-inline-item"><a href="#"><i class="fa fa-facebook"></i></a></li>
                            <li className="list-inline-item"><a href="#"><i class="fa fa-whatsapp"></i></a></li>
                            <li className="list-inline-item"><a href="#"><i class="fa fa-twitter"></i></a></li>
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    )
}