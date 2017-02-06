import React, { Component } from 'react'
import css from './style.scss'

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
  type: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  value: React.PropTypes.string,
  minLength: React.PropTypes.number,
  maxLength: React.PropTypes.number,
  onChange: React.PropTypes.func.isRequired
}

export default TextArea
