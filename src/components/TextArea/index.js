import React, { Component } from 'react'
import css from './style.scss'
import PropTypes from 'prop-types'

class TextArea extends Component{
  constructor(props){
    super(props);
  }


  render(){
    let { placeholder, value,  onChange, style} = this.props;

    return(
      <div className={css.base + ' ' + style}>
        <div className="form-group ">
          <div className={"input-group "+css.inputGroup}>

          <textarea type={this.props.type}
                   className={"form-control "+css.textarea}
                   placeholder={placeholder}
                   value={value}
                   onChange={onChange}
                   autoComplete="nope"/>
          </div>
        </div>
      </div>
    )
  }
}

TextArea.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  onChange: PropTypes.func.isRequired
}

export default TextArea
