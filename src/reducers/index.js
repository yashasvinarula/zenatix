import * as types from '../actions/types';

const initialState = {
    words: []
}

export default (state = initialState, action) => {
    switch (action.type) {
      case types.SET_WORDS:
        return {...initialState, words: action.payload};
      case types.ADD_WORD:
        return {...initialState, words: [...state.words, action.payload]};
      default:
        return state;
    }
  };
