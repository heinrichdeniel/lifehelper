import constants from './constants'
import pageContent from '../../config/pageContent'

let lang = "en";
if (window.location.pathname.substring(0,3) == "/hu"){
  lang = "hu";
}
if (window.location.pathname.substring(0,3) == "/ro"){
  lang = "ro";
}

const initialState = {
  lang: lang,
  content: pageContent.getContent(lang)
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
