import React, { Component } from 'react'
import css from './style.scss'

class Input extends Component{
  constructor(props){
    super(props);
    this.renderAddonContent = this.renderAddonContent.bind(this);
    this.renderAddon = this.renderAddon.bind(this);
    this.state = {
      valid: true
    }
  }

  renderAddonContent(minLength, maxLength, value){
    let valueLength = value ? value.length : 0;
    if (valueLength > 0 && (valueLength < minLength || !value.match(/\S/))){
      return 'At least '+minLength+' characters'
    }
    else if (valueLength >  maxLength){
      return 'Maximum '+maxLength+' characters'
    }
    return ''
  }

  renderAddon(minLength, maxLength, value){
    if (minLength) {
      return (
        <div className={"input-group-addon "+css.inputAddon}>
          <div className={css.inputAddonContent}>{this.renderAddonContent(minLength, maxLength, value)}</div>
        </div>
      )
    }
    return (
      <div className={"input-group-addon "+css.inputAddon}>
      </div>
    )
  }

  render(){
    let { placeholder, value, minLength, maxLength, onChange, style} = this.props;
    let addon = this.renderAddon(minLength, maxLength, value);

    return(
      <div className={css.base + ' ' + style}>
        <div className="form-group ">
          <div className={"input-group "+css.inputGroup}>

          <input type={this.props.type}
                   className={"form-control"}
                   placeholder={placeholder}
                   value={value}
                   onChange={onChange}
                   autoComplete="nope"/>
            {addon}
          </div>
        </div>
      </div>
    )
  }
}

Input.propTypes = {
  type: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  value: React.PropTypes.string,
  minLength: React.PropTypes.number,
  maxLength: React.PropTypes.number,
  onChange: React.PropTypes.func.isRequired
}

export default Input
