import React, { Component } from 'react'
import css from './style.scss'

class Input extends Component{
  constructor(props){
    super(props);
    this.state = {
      valid: true
    }
  }

  componentDidMount(){
    if (this.props.focused){
      this.input.focus();
    }
    if (this.props.onEnterDown){
      let self = this;
      $('input').on('keydown', function(event) {
        if (event.keyCode == 13){
          self.props.onEnterDown(event);
        }
      });
    }
  }

  render(){
    let { placeholder, value,  onChange, style} = this.props;


    return(
      <div className={css.base + ' ' + style}>
        <div className="form-group ">
          <div className={"input-group "+css.inputGroup}>

            <input type={this.props.type}
                   className={"form-control"}
                   placeholder={placeholder}
                   value={value}
                   onChange={onChange}
                   autoComplete="nope"
                   onFocus={this.props.onFocus}
                   onBlur={this.props.onBlur}
                   id={this.props.id}
                   ref={(input) => { this.input = input; }} />
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
