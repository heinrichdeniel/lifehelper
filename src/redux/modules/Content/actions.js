import store from 'redux/config/store'
import constants from './constants'
import {browserHistory} from 'react-router'

export function switchLanguage(lang) {
  store.dispatch((dispatch, getState) => {
    return dispatch({
      type: constants.SWITCH_LANGUAGE,
      payload: lang
    })
  })

  let index = window.location.pathname.indexOf('/',1);   //first '/' character after language
  if (index > 0){
    browserHistory.push("/" + lang + window.location.pathname.substring(index));
  }
  else{
    browserHistory.push("/" + lang);
  }
}

