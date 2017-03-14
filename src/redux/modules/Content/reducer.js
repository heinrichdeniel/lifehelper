import constants from './constants'

import pageContent from '../../config/pageContent'
const initialState = {
  lang: "hu",
  content: pageContent.getContent("hu")

};


const ContentReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case constants.SWITCH_LANGUAGE:
      return {
        lang: action.payload,
        content: pageContent.getContent(action.payload)
      };
    default:
      return state
  }
};

export default ContentReducer;
