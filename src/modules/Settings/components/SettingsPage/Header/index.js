import React, { Component } from 'react';
import css from "./style.scss";
import { Link } from 'react-router'
import Settings from 'modules/Settings/containers/Settings'
import { browserHistory } from 'react-router'

export default class Header extends Component {
  constructor(props){
    super(props);
  }

  goToHomePage(){
    browserHistory.push(window.location.pathname.substring(0,3));
  }
  render() {
    return (
      <nav className={"navbar navbar-default "+css.nav}>
          <Link to={'/'} className={css.logo}><h1>LifeHelper</h1></Link>
          <div className={css.rightIcons} >

            <ul className="nav navbar-nav navbar-right">
              <p className={css.userName}>{this.props.user.username}</p>
              <div className={css.home} onClick={this.goToHomePage}>
                <i className="fa fa-home"/>
              </div>
              <Settings/>
            </ul>
        </div>
      </nav>
    )
  }
}

