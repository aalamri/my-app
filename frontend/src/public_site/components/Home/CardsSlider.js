import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";

import { FEATURED_CARDS_QUERY } from "./queries";
import Card from "./Card";

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

let cards2 = [{
    id: "1",
    title: "What is SSL?",
    content: "Lorem ipsum Debitis blanditiis asperiores aliquam sunt est doloremque saepe aliquid iure ea molestiae aut ut quidem quis qui omnis nesciunt ab magnam consequuntur dicta maxime minus excepturi voluptas aut minus dolorem ratione quisquam magni",
    author: "Sultan Abdullah",
    published_at: "25/11/2014",
    is_pinned: true,
    status: "Approved",
    __typename: "Cards",
    meta: {
        likes: 140,
        card_url_in_other_language: null
    }
},
{
    id: "2",
    title: "Did you know?",
    content: "Lorem ipsum Aut consequuntur inventore ut vel alias dolorum ab ut iste rerum dolorem aspernatur dolor sunt suscipit est praesentium reiciendis ut nisi non-recusandae reprehenderit blanditiis ut in nobis minus aut et omnis assumenda aut quia soluta voluptates",
    author: "Salem Ahmad",
    published_at: "20/06/2019",
    is_pinned: true,
    status: "Approved",
    __typename: "Cards",
    meta: {
        likes: 0
    },
    card_url_in_other_language: null
},
{
    id: "3",
    title: "What is Lorem Ipsum?",
    content: "Lorem ipsum Ullam nesciunt totam dolores ea consequatur saepe quos animi quisquam rerum possimus doloremque quod iste porro quae et vel consectetur pariatur sed dignissimos distinctio culpa illo doloremque eaque voluptas",
    author: "Sarah Mahmoud",
    published_at: "22/01/2020",
    is_pinned: true,
    status: "Approved",
    __typename: "Cards",
    meta: {
        likes: 42
    },
    card_url_in_other_language: "https://google.com"
},
{
    id: "4",
    title: "Amazing Title",
    content: "Lorem ipsum Labore est ut aut incididunt dolorum magni similique a unde asperiores saepe quibusdam ratione corrupti tempore ut ab quod minus",
    author: "David Jackson",
    published_at: "16/12/2020",
    is_pinned: true,
    status: "Approved",
    __typename: "Cards",
    meta: {
        likes: 44
    },
    card_url_in_other_language: null
},
{
    id: "5",
    title: "Protect Mobile SMS Spam",
    content: "Lorem ipsum Odio vel ullam voluptatum nobis aut quae ipsam voluptatem possimus animi rerum et dolores laudantium consequatur cupiditate earum eum enim nulla quo non aut at ut sit ipsam modi cumque beatae soluta voluptatem",
    author: "Chang Lee",
    published_at: "06/07/2019",
    is_pinned: true,
    status: "Approved",
    __typename: "Cards",
    meta: {
        likes: 10
    },
    card_url_in_other_language: "https://google.com"
}
]


export default function (props) {
    const { data: cardsData, loading, error } = useQuery(FEATURED_CARDS_QUERY);
    const [cards, setCards] = useState([])

    useEffect(() => {
        if (cardsData?.cards.length > 0) {
            const featuredCards = cardsData.cards.filter((a) =>
                a.status === 'Approved' && a.is_pinned
            )
            return setCards(featuredCards)
        }
    }, [cardsData])


    // console.log("cards & cards2:", cards2, cards);

    return (
        <section
            className="hero-section gradient-purple-bg pt-2"
            style={{
                backgroundImage: "linear-gradient(to right, #713e6d, #593a6c)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
                backgroundSize: "cover",
            }}
        >
            <div className="screen-slider-content mt-4">
                <div className="screen-carousel owl-carousel owl-theme dot-indicator">
                    {cards2.map(card => {
                        return <SingleCard key={card.id} {...card} />
                    })}
                </div>
            </div>
            <div className="section-shape position-absolute">
                <img className="yellow-curve" src="img/yellow-curve.svg" alt="shape" />
            </div>
        </section>
    );
}

const SingleCard = (props) => {
    const { title, content, card_url_in_other_language, meta, author } = props

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
                            <small class="text-muted ml-2 tale">{`${author?.first_name} ${author?.last_name}`}</small>
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
    )
}

// import React from "react";
// import Card from "./Card";

// export default function (props) {

//     const cards = [
//         { id: "1", title: "What is SSL?", excerpt: "Lorem ipsum Debitis blanditiis asperiores aliquam sunt est doloremque saepe aliquid iure ea molestiae aut ut quidem quis qui omnis nesciunt ab magnam consequuntur dicta maxime minus excepturi voluptas aut minus dolorem ratione quisquam magni", author: "Sultan Abdullah", published_at: "25/11/2014", likes: 140 },
//         { id: "2", title: "Did you know?", excerpt: "Lorem ipsum Aut consequuntur inventore ut vel alias dolorum ab ut iste rerum dolorem aspernatur dolor sunt suscipit est praesentium reiciendis ut nisi non-recusandae reprehenderit blanditiis ut in nobis minus aut et omnis assumenda aut quia soluta voluptates", author: "Salem Ahmad", published_at: "20/06/2019", likes: 0 },
//         { id: "3", title: "What is Lorem Ipsum?", excerpt: "Lorem ipsum Ullam nesciunt totam dolores ea consequatur saepe quos animi quisquam rerum possimus doloremque quod iste porro quae et vel consectetur pariatur sed dignissimos distinctio culpa illo doloremque eaque voluptas", author: "Sarah Mahmoud", published_at: "22/01/2020", likes: 42 },
//         { id: "4", title: "Amazing Title", excerpt: "Lorem ipsum Labore est ut aut incididunt dolorum magni similique a unde asperiores saepe quibusdam ratione corrupti tempore ut ab quod minus", author: "David Jackson", published_at: "16/12/2020", likes: 44 },
//         { id: "5", title: "Protect Mobile SMS Spam", excerpt: "Lorem ipsum Odio vel ullam voluptatum nobis aut quae ipsam voluptatem possimus animi rerum et dolores laudantium consequatur cupiditate earum eum enim nulla quo non aut at ut sit ipsam modi cumque beatae soluta voluptatem", author: "Chang Lee", published_at: "06/07/2019", likes: 10 }
//     ]
//     return (
//         <section
//             className="hero-section gradient-purple-bg pt-100"
//             style={{
//                 backgroundImage: "linear-gradient(to right, #713e6d, #593a6c)",
//                 backgroundRepeat: "no-repeat",
//                 backgroundPosition: "center center",
//                 backgroundSize: "cover",
//             }}
//         >
//             <div className="screen-slider-content mt-4">
//                 <div className="screen-carousel owl-carousel owl-theme dot-indicator ">
//                     {cards.map(card => {
//                         return <Card key={card.id} {...card} />
//                     })}
//                 </div>
//             </div>
//             <div className="section-shape position-absolute">
//                 <img className="yellow-curve" src="img/yellow-curve.svg" alt="shape" />
//             </div>

//         </section>
//     );
// }

