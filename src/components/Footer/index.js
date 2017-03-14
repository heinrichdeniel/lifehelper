import React, { Component } from 'react';
import css from "./style.scss";

export default class Footer extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <nav className={"navbar "+css.base}>
              <div className={css.flags}>
                <div className={css.english} onClick={this.props.switchLanguage.bind(this,"en")}/>
                <div className={css.hungarian} onClick={this.props.switchLanguage.bind(this,"hu")}/>
                <div className={css.romanian} onClick={this.props.switchLanguage.bind(this,"ro")}/>
              </div>
              <p>© Copyright 2016 LifeHelper. All rights reserved.</p>
            </nav>
        )
    }

}
