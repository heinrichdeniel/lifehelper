import store from 'redux/config/store'
import constants from './constants'

export function switchLanguage(lang) {
  store.dispatch((dispatch, getState) => {
    return dispatch({
      type: constants.SWITCH_LANGUAGE,
      payload: lang
    })
  })
}

