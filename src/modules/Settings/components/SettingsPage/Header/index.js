import React, { Component } from 'react';
import css from "./style.scss";
import { Link } from 'react-router'
import Settings from 'modules/Settings/containers/Settings'

export default class Header extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <nav className={"navbar navbar-default "+css.nav}>
        <div className="container">
          <Link to={'/'} className={css.logo}><h1>LifeHelper</h1></Link>
          <div className={css.rightIcons} >
            <ul className="nav navbar-nav navbar-right">
              <p className={css.userName}>{this.props.user.username}</p>
              <Settings/>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

