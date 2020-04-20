import React from "react";
import { Link } from "react-router-dom";

const TestsRow = ({ tests }) => {
  return (
    <div>
      {tests.map((test) => {
        return (
          <Link
            key={`article__${test.id}`}
            to={`/test/${test.id}`}
            className="uk-link-reset"
          >
            <div className="row">
              {/* <div className="uk-card-media-top">
                      <img
                        src={
                          process.env.REACT_APP_BACKEND_URL + test.image.url
                        }
                        alt={test.image.url}
                        height="100"
                      />
                    </div> */}
              <div className="">
                <p id="category" className="">
                  {test.category?.name}
                </p>
                <p id="title" className="">
                  {test.title}
                </p>
                <p id="title" className="">
                  {test.description}
                </p>
                <p id="title" className="">
                  Likes {test.meta?.likes ?? 0}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default TestsRow;
