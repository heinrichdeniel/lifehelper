import React, { Component } from 'react'

import css from './style.scss'

class ConfirmationBox extends Component {
  constructor(props){
    super(props);

    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.state={
      style: {
        opacity: '1'
      }
    }
  }

  componentWillMount(){
    document.addEventListener('click', this.handleDocumentClick, false);
  }

  componentWillUnmount(){
    document.removeEventListener('click', this.handleDocumentClick, false);
  }


  handleDocumentClick() {      //if the user clicked somewhere in the page
    this.setState({
      style:{
        opacity: '0'
      }
    });
    document.removeEventListener('click', this.handleDocumentClick, false);

  }
  render(){
    let { content } = this.props;
    return(
      <div className={css.confirmation} style={this.state.style}>
        <p>{content}</p>
      </div>
    )
  }
}

export default ConfirmationBox
