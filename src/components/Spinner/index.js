import React, { Component } from 'react'
import css from './style.scss'

class Spinner extends Component{
  constructor(props){
    super(props);
  }

  render(){


    return(
      <div className={css.spinner}>
        <i className={"fa fa-spinner fa-spin"} />
      </div>
    )
  }
}

export default Spinner
