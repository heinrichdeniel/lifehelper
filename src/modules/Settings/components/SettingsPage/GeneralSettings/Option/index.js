import React, { Component } from 'react'
import css from './style.scss'
import Dropdown from 'react-bootstrap-dropdown'

class Option extends Component {
  constructor(props){
    super(props);
  }


  render() {
    return(
      <div className={css.row}>
        <p>{this.props.content}</p>
        <div className={css.dropdown}>
          <Dropdown title={this.props.selectedOption.text}
                    items={this.props.options}
                    selected={this.props.selectedOption}
                    onSelect={this.props.onSelect}/>
        </div>
      </div>
    )
  }
}

export default Option
