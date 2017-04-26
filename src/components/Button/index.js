import React, { Component } from 'react'

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
  text: React.PropTypes.string,
  style: React.PropTypes.string,
  type: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  hidden: React.PropTypes.bool
};

Button.defaultProps = {
  disabled: false,
  hidden: false,
  style: ''
};

export default Button
