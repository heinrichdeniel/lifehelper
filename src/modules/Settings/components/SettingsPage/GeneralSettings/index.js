import React, { Component } from 'react'
import css from './style.scss'
import Option from './Option'
import Button from 'components/Button'

class GeneralSettings extends Component {
  constructor(props){
    super(props);
    this.selectLanguage = this.selectLanguage.bind(this);
    this.selectDateFormat = this.selectDateFormat.bind(this);
    this.selectTimeFormat = this.selectTimeFormat.bind(this);
    this.saveChanges = this.saveChanges.bind(this);

    this.state={
      languages: [
        {value: "en", text: "English"},
        {value: "hu", text: "Magyar"},
        {value: "ro", text: "Română"}
      ],
      dateFormats: [
        {value: "DD/MM/YYYY", text: "DD/MM/YYYY"},
        {value: "MM/DD/YYYY", text: "MM/DD/YYYY"},
        {value: "YYYY/MM/DD", text: "YYYY/MM/DD"}
      ],
      timeFormats: [
        {value: "h:mm A", text: "12"},
        {value: "HH:mm", text: "24"}
      ]
    }
  }


  selectLanguage(selected){
    this.setState({
      ...this.state,
      selectedLanguage: selected
    })
    this.props.switchLanguage(selected.value)
  }

  selectDateFormat(selected){
    this.setState({
      ...this.state,
      selectedDateFormat: selected
    })
  }

  selectTimeFormat(selected){
    this.setState({
      ...this.state,
      selectedTimeFormat: selected
    })
  }

  saveChanges(){

    let settings = {
      language: this.state.selectedLanguage ? this.state.selectedLanguage.value : this.props.user.language,
      dateFormat: this.state.selectedDateFormat ? this.state.selectedDateFormat.value : this.props.user.dateFormat,
      timeFormat: this.state.selectedTimeFormat ? this.state.selectedTimeFormat.value : this.props.user.timeFormat
    };

    this.props.saveChanges(settings);

    this.setState({
      ...this.state,
      success:true
    })
  }

  render() {
    let language = this.state.selectedLanguage ? this.state.selectedLanguage : this.state.languages.filter( lang => lang.value == this.props.user.language)[0];
    let dateFormat = this.state.selectedDateFormat ? this.state.selectedDateFormat : this.state.dateFormats.filter( dateFormat => dateFormat.value == this.props.user.dateFormat)[0];
    let timeFormat = this.state.selectedTimeFormat ? this.state.selectedTimeFormat : this.state.timeFormats.filter( timeFormat => timeFormat.value == this.props.user.timeFormat)[0];

    return(
      <div className={css.base}>
        <div className={css.center}>
          <div className={css.options}>
            <Option content = {this.props.content.language}
                    options = {this.state.languages}
                    selectedOption={language}
                    onSelect={this.selectLanguage}/>

            <Option content = {this.props.content.dateFormat}
                    options = {this.state.dateFormats}
                    selectedOption={dateFormat}
                    onSelect={this.selectDateFormat}/>

            <Option content = {this.props.content.timeFormat}
                    options = {this.state.timeFormats}
                    selectedOption={timeFormat}
                    onSelect={this.selectTimeFormat}/>
          </div>
        </div>
        <div className={css.buttons}>
          <Button onClick={this.saveChanges} text={this.props.content.saveChanges} style={css.save}/>
        </div>
      </div>
    )
  }
}

export default GeneralSettings
