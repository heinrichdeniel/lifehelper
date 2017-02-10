import React, { Component } from 'react'
import TimePicker from 'react-timepicker';
import moment from 'moment';
import Modal from 'react-bootstrap/lib/Modal'
import Button from 'components/Button'

import css from './style.scss'

class datePicker extends Component{
  constructor(props){
    super(props);
    this.changeModalState = this.changeModalState.bind(this);

    this.state = {
      showModal:false
    }
  }

  changeModalState(){
    if (this.props.onClick){
      this.props.onClick();
    }
    this.setState({
      showModal: !this.state.showModal
    });
  }

  render(){
    let { value, onChange} = this.props;

    return(
      <div className={css.base}>
        <p onClick={this.changeModalState}>{moment(value, "H:m").format("HH:mm")}</p>
        <Modal show={this.state.showModal}  dialogClassName={css.modal}  onHide={this.changeModalState}>
          <TimePicker
            hours={parseInt(moment(value, "H:m").format("H"))}
            minutes={parseInt(moment(value, "H:m").format("m"))}
            onChange={onChange}
            showSecond={false}
            clearText="clear"
            />
          <Button
            type="button"
            text="Select time"
            onClick={this.changeModalState}
            style={css.select}
          />
        </Modal>
      </div>
    )
  }
}

datePicker.propTypes = {
  value: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired
}

export default datePicker
