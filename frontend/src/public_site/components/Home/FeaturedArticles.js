import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";

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
        <section id="about" className="about-us ptb-100">
            <div className="container">
                <div class="d-flex justify-content-between">
                    <h1 class="titles mb-5 section-title">Articles</h1>
                    <span class="see-more-link d-none d-md-block">see more</span>
                </div >
                {loading && <p className="text-center">Loading...</p>}
                <div className="row align-items-center">
                    {articles?.map(article =>
                        <SingleArticle key={article.id} {...article} />
                    )}
                </div>
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
            <div className="single-blog-card card border-0 shadow-sm">
                <img
                    src={imageUrl}
                    className="card-img-top position-relative"
                    height="260"
                    alt=""
                />
                <div className="card-body">
                    <h3 className="h5 card-title">
                        <a href="/#">{title}</a>
                    </h3>
                    <p className="card-content">
                        {content.split(' ').slice(0, 35).join(' ')} </p>
                    <a href="/#" className="detail-link">
                        Read more <span className="ti-arrow-right"></span>
                    </a>
                </div>
            </div>
        </div>
    )
}