import React from 'react'
import css from './style.scss'

class ErrorBox extends React.Component {
  render() {
    return(
      <div className={"alert alert-danger "+css.error } role="alert">
        <div className={css.text}>{this.props.error}</div>
      </div>
    )
  }
}

export default ErrorBox
