import * as testsAPI from '../../utils/testsAPI';
import {
    START_TEST,
    ERROR_GET_TEST,
    SELECT_SINGLE_CHOICE,
    SELECT_MULTIPLE_CHOICE,
    UNSELECT_MULTIPLE_CHOICE,
} from '../constants';

export const getTest = (id) => (dispatch) => (
    testsAPI
        .getTest(id)
        .then(({ test, error }) => {
            // TODO handle error, dispatch errorGetTest, check in Question if this field is !null, display msg
            if (error) {
                dispatch(errorGetTest(error));
                return;
            }
            dispatch(startTest(test))
        })
    // TODO .catch(()=> /*handle rejection*/)
);

export const startTest = (test) => ({
    type: START_TEST,
    test
});

export const errorGetTest = (error) => ({
    type: ERROR_GET_TEST,
    error
});

export const selectSingleChoice = (id, choiceValue) => ({
    type: SELECT_SINGLE_CHOICE,
    id,
    choiceValue
});

export const selectMultipleChoice = (id, choiceValue) => ({
    type: SELECT_MULTIPLE_CHOICE,
    id,
    choiceValue
});

export const unselectMultipleChoice = (id, choiceValue) => ({
    type: UNSELECT_MULTIPLE_CHOICE,
    id,
    choiceValue
});
