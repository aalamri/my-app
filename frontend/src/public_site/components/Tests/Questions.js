import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
// import Slide from 'react-reveal/Slide';

import { scrollToTop } from '../../../utils';
import {
    getTest,
    startTest,
    selectSingleChoice,
    selectMultipleChoice,
    unselectMultipleChoice
} from '../../../redux/actions/tests';

import imageUrl from './q1.png'

const AR = "Arabic";
const EN = "English";

const Questions = (props) => {
    let { id, qid } = useParams();
    const dispatch = useDispatch();
    const test = useSelector(({ test }) => test);
    const [language, setLanguage] = useState(EN);
    const [questions, setQuestions] = useState(test.questions);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(Number(qid));

    useEffect(() => {
        if (props.location.state?.fromTestPage) {
            dispatch(startTest(props.location.state.test));
        } else {
            dispatch(getTest(id));
        }
    }, []);

    useEffect(() => {
        setQuestions(test.questions);
    }, [test]);

    if (test.error) {
        return (
            <section className="question-section ptb-100" dir={language === AR ? "rtl" : "ltr"}>
                <div className="container max-width-880">
                    <h3>Sorry!</h3>
                    <p>There is an error loading this page. Please refresh the page and make sure the URL is correct.</p>
                </div>
            </section>
        )
    }

    function goPrevious() {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        scrollToTop(50);
    }
    function goNext() {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        scrollToTop(50);
    }

    if (test.questions.length === 0) {
        return (
            <section className="question-section ptb-100" dir={language === AR ? "rtl" : "ltr"}>
                <div className="container max-width-880">
                    <p>Loading...</p>
                </div>
            </section>
        )
    }

    if (typeof Number(qid) !== 'number'
        || Number(qid) > questions.length
        || Number(qid) < 1
        || test.status !== 'Approved'
    ) {
        return (
            <section className="question-section ptb-100" dir={language === AR ? "rtl" : "ltr"}>
                <div className="container max-width-880">
                    <p>Invalid page request!</p>
                </div>
            </section>
        )
    }

    const question = questions[currentQuestionIndex - 1];
    const progressValueNow = (currentQuestionIndex / questions.length) * 100;
    // console.log("question", question);

    return (
        <section className="question-section pb-5 my-5" dir={language === AR ? "rtl" : "ltr"}>
            <div className="container max-width-880 pb-5 ">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/tests">Tests</Link></li>
                        <li className="breadcrumb-item active" aria-current="page"><Link to={`/test/${test.id}`}>{test.title}</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Question {currentQuestionIndex}</li>
                    </ol>
                </nav>
                <div className="progress mb-4 mt-0 no-radius" style={{ height: "25px" }}>
                    <div
                        className="progress-bar tale-progress-bg text-right px-3"
                        role="progressbar"
                        style={{ width: `${progressValueNow}%`, fontSize: '1rem' }}
                        aria-valuenow={`${progressValueNow}`}
                        aria-valuemin="0"
                        aria-valuemax="100">
                        <p>({`${currentQuestionIndex}/${questions.length}`})</p>
                    </div>
                </div>

                {/* <Slide> */}
                <div className="">
                    <h2>{question.title}</h2>
                    {/* {currentQuestionIndex % 2 === 0 &&
                            <img
                                src={imageUrl}
                                className="card-img-top position-relative border-q-img"
                                height="80%"
                                alt=""
                            />
                        } */}
                    <p className="py-4">{question.content}</p>
                </div>
                <div className="mb-5">
                    <h5>Choices:</h5>
                    <div className="custom-control custom-checkbox">
                        {displayChoices(question)}
                    </div>
                </div>
                {/* </Slide> */}

                <div className="text-center">
                    {currentQuestionIndex === 1
                        ? <Link to={`/test/${id}`}><button className="btn mx-2 btn-info">Previous</button></Link>
                        : <Link to={`/test/${id}/question/${currentQuestionIndex - 1}`}><button className="btn mx-2 btn-info" onClick={goPrevious}>Previous</button></Link>
                    }
                    {currentQuestionIndex !== questions.length &&
                        <Link
                            to={{
                                pathname: `/test/${id}/result`,
                                state: { test }
                            }}>
                            <button className="btn mx-2 btn-info">End Test</button>
                        </Link>
                    }
                    {currentQuestionIndex < questions.length &&
                        <Link to={`/test/${id}/question/${currentQuestionIndex + 1}`}>
                            <button className="btn mx-2 btn-info" onClick={goNext}>Next</button>
                        </Link>
                    }
                    {currentQuestionIndex === questions.length &&
                        <Link
                            to={{
                                pathname: `/test/${id}/result`,
                                state: { test }
                            }}>
                            <button className="btn mx-2 btn-info">Submit and See Result</button>
                        </Link>
                    }
                </div>
            </div>
        </section >
    );
};

function displayChoices(question) {
    const { choices_type } = question;
    if (choices_type === "multiple") {
        return <MultipleChoicesQuestion {...question} />
    } else if (choices_type === "single") {
        return <SingleChoiceQuestion {...question} />
    } else {
        throw Error(`ERROR displayChoices: Unknown choices type ${choices_type}`)
    }
};

const MultipleChoicesQuestion = (question) => {
    const dispatch = useDispatch();
    const {
        id,
        choice_1,
        choice_2,
        choice_3,
        choice_4,
        choice_5,
        choice_6,
        userSelection = []
    } = question;

    const choiceComponent = (text, i) => {
        const isSelected = userSelection && userSelection.includes(text) || false;
        const handleUpdateChoice = () =>
            isSelected
                ? dispatch(unselectMultipleChoice(id, text))
                : dispatch(selectMultipleChoice(id, text));

        return (
            <div key={i}
                className={`d-flex p-2 form-check question-choice ${isSelected ? 'selected-choice' : ''}`}
                onClick={handleUpdateChoice}
            >
                <input
                    id={`choice_${i}`}
                    className="form-check-input"
                    type="checkbox"
                    name="choices"
                    className="position-relative form-check-input mx-2"
                    onChange={handleUpdateChoice}
                    checked={isSelected}
                />
                <label
                    className="form-check-label"
                    htmlFor={`choice_${i}`}
                >
                    {text}
                </label>
            </div>
        );
    }

    const allChoices = [
        choice_1,
        choice_2,
        choice_3,
        choice_4,
        choice_5,
        choice_6,
    ].filter((_, i) => _ != null && _.trim() != '');

    const choicesComponents = allChoices.map((choice, i) => choiceComponent(choice, i));
    return choicesComponents;
}

const SingleChoiceQuestion = (question) => {
    const dispatch = useDispatch();
    const {
        id,
        choices,
        userSelection
    } = question;

    const choiceComponent = (text, i) => {
        const handleUpdateChoice = () => dispatch(selectSingleChoice(id, text));
        return (
            <div key={i}
                className={`d-flex p-2 form-check question-choice ${userSelection === text ? 'selected-choice' : ''}`}
                onClick={handleUpdateChoice}
            >
                <input
                    className="position-relative form-check-input mx-2"
                    type="radio"
                    name="choices"
                    id={`choice_${i}`}
                    onChange={handleUpdateChoice}
                    checked={userSelection === text}
                />
                <label
                    className="form-check-label"
                    htmlFor={`choice_${i}`}
                >
                    {text}
                </label>
            </div>
        );
    }

    const validChoices = choices.filter((_, i) => _ != null && _.trim() != '');
    const choicesComponents = validChoices.map((choice, i) => choiceComponent(choice, i))
    return choicesComponents;
}

export default Questions;
