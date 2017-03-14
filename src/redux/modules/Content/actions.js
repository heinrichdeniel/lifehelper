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


  browserHistory.push(lang+window.location.pathname.substring(3));
}

