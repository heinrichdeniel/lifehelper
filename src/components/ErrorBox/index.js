import React from 'react'
import css from './style.scss'
import PropTypes from 'prop-types'

class ErrorBox extends React.Component {
  render() {
    return(
      <div className={"alert alert-danger "+css.error} role="alert">
        <div className={css.text}>{this.props.error}</div>
      </div>
    )
  }
}


ErrorBox.propTypes = {
  error: PropTypes.string
}
export default ErrorBox
