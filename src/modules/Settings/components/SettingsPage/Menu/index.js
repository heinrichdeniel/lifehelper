import React, { Component } from 'react'
import css from './style.scss'

class Menu extends Component {
  constructor(props){
    super(props);
  }

  render() {
    if (this.props.active == 1){
      return(
        <div className={css.base }>
          <div className={css.option +" "+ css.general +" "+ css.active} onClick={this.props.onClick.bind(this,1)}>{this.props.content.general}</div>
          <div className={css.option +" "+ css.account} onClick={this.props.onClick.bind(this,2)}>{this.props.content.account}</div>
          <div className={css.option +" "+ css.shortcuts} onClick={this.props.onClick.bind(this,3)}>{this.props.content.shortcuts}</div>
        </div>
      )
    }
    else if (this.props.active == 2){
      return(
        <div className={css.base }>
          <div className={css.option +" "+ css.general} onClick={this.props.onClick.bind(this,1)}>{this.props.content.general}</div>
          <div className={css.option +" "+ css.account +" "+ css.active} onClick={this.props.onClick.bind(this,2)}>{this.props.content.account}</div>
          <div className={css.option +" "+ css.shortcuts} onClick={this.props.onClick.bind(this,3)}>{this.props.content.shortcuts}</div>
        </div>
      )
    }
    else{
      return(
        <div className={css.base}>
          <div className={css.option +" "+ css.general} onClick={this.props.onClick.bind(this,1)}>{this.props.content.general}</div>
          <div className={css.option +" "+ css.account} onClick={this.props.onClick.bind(this,2)}>{this.props.content.account}</div>
          <div className={css.option +" "+ css.shortcuts  +" "+ css.active} onClick={this.props.onClick.bind(this,3)}>{this.props.content.shortcuts}</div>
        </div>
      )
    }
  }
}

export default Menu
