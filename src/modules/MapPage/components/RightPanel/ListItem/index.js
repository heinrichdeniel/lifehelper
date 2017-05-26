import React, { Component } from 'react'
import css from './style.scss'

class ListItem extends Component{
  render() {
    let marker = null;
    if (this.props.item.location) {
      marker = <i onClick={this.props.item.onClick.bind(this,this.props.item.lat, this.props.item.lng)} className={css.marker + " fa fa-map-marker"} aria-hidden="true"/>;
    }
    return (
      <div key={this.props.item.key} className={css.task} > <span>{this.props.item.key+1}. </span>{this.props.item.name} {marker}</div>
    )
  }
}

export default ListItem
