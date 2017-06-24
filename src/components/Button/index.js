import React, { Component } from 'react'
import PropTypes from 'prop-types'
import css from './style.scss'

class Button extends Component {
  render(){
    let { text, style, disabled, hidden, onClick ,type} = this.props;
    return(
      <button type={type}
              className={css.button + ' ' + style + ' ' + (disabled ? css.disabled : '') + ' '+ (hidden ? css.hidden : '')}
              disabled={disabled}
              onClick={onClick} >
        {text}
        {this.props.children}
      </button>
    )
  }
}

Button.propTypes = {
  text: PropTypes.string,
  style: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  hidden: PropTypes.bool
};

Button.defaultProps = {
  disabled: false,
  hidden: false,
  style: ''
};

export default Button
