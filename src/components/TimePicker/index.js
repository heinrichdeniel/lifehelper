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
    this.onClick = this.onClick.bind(this);
    this.selectTime = this.selectTime.bind(this);

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

  onClick(){
    this.props.onChange(null);
  }

  selectTime(value){

    this.props.onClick(moment(value, "H:m").format("H"),moment(value, "H:m").format("m"));
    this.setState({
      showModal: !this.state.showModal
    });
  }

  render(){
    let { value, onChange} = this.props;

    if (!value){
      value=moment().add(1,'hours');
    }

    return(
      <div className={css.base}>
        <span className="fa fa-clock-o"/>
        <p onClick={this.changeModalState}>{this.props.value?moment(value, "H:m").format(this.props.timeFormat):"-"}</p>
        <span onClick={this.onClick} className={css.reset + " fa fa-times-circle-o"}/>
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
            onClick={this.selectTime.bind(this,value)}
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
