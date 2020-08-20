import { shuffleArray } from '../../utils';
import {
    START_TEST,
    ERROR_GET_TEST,
    SELECT_SINGLE_CHOICE,
    SELECT_MULTIPLE_CHOICE,
    UNSELECT_MULTIPLE_CHOICE,
} from '../constants';

const initState = {
    error: null,
    questions: [],
};

export default (state = initState, action) => {
    const { id, test, choiceValue, error } = action;

    switch (action.type) {
        case START_TEST:
            const initQuestions = test.questions.map(question => {
                if (question.choices_type === 'single') {
                    // add 'choices' array to `question` with shuffled choices (for single choices questions only)
                    const choices = [
                        question.correct_answer,
                        question.wrong_answer_1,
                        question.wrong_answer_2,
                        question.wrong_answer_3,
                        question.wrong_answer_4,
                        question.wrong_answer_5,
                    ]
                    question.choices = shuffleArray(choices);
                }
                // initial userSelection
                question.userSelection = null;
                return question;
            });

            return {
                ...state,
                ...test,
                questions: initQuestions
            };

        case ERROR_GET_TEST:
            return {
                ...state,
                error
            };

        case SELECT_SINGLE_CHOICE:
            return {
                ...state,
                questions: state.questions.map(q => {
                    if (q.id === id) {
                        q.userSelection = choiceValue;
                    }
                    return q;
                })
            };

        case SELECT_MULTIPLE_CHOICE:
            return {
                ...state,
                questions: state.questions.map(q => {
                    if (q.id === id) {
                        if (q.userSelection === null) {
                            q.userSelection = [choiceValue];
                        } else {
                            q.userSelection = q.userSelection.concat(choiceValue);
                        }
                    }
                    return q;
                })
            };

        case UNSELECT_MULTIPLE_CHOICE:
            return {
                ...state,
                questions: state.questions.map(q => {
                    if (q.id === id) {
                        if (q.userSelection === null) {
                            q.userSelection = [];
                        } else {
                            q.userSelection = q.userSelection.filter(value => value !== choiceValue);
                        }
                    }
                    return q;
                })
            };

        default:
            return state;
    }
};


