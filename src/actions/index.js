import * as types from './types';
import {wordList} from '../wordList';
import {uuid} from '../utils//uuid';

export const setWords = () => dispatch => {
    dispatch({
        type: types.SET_WORDS,
        payload: wordList
    })
}

export const addWord = (word) => dispatch => {
    dispatch({
        type: types.ADD_WORD,
        payload: {
            id: uuid(),
            value: word
        }
    })
}