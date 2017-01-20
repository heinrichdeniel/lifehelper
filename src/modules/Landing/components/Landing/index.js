import React, { Component } from 'react'
import css from './style.scss'

import Header from 'components/Header'
import Footer from 'components/Footer'

class Landing extends Component {
  constructor(props){
    super(props);

  }

  render() {
    return(
      <div className={css.base}>
        <Header/>
        <Footer/>
      </div>
    )
  }
}

export default Landing
