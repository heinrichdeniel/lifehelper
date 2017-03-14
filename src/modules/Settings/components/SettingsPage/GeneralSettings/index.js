import React, { Component } from 'react'
import css from './style.scss'
import Dropdown from 'react-bootstrap-dropdown'

class GeneralSettings extends Component {
  constructor(props){
    super(props);
    this.selectLanguage = this.selectLanguage.bind(this);

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
        {value: "h:mm A", text: "12 "+this.props.content.hours},
        {value: "HH:mm", text: "24 "+this.props.content.hours}
      ],
      selectedLanguage: {value: "en", text: "English"},
      selectedDateFormat: {value: "DD/MM/YYYY", text: "DD/MM/YYYY"},
      selectedTimeFormat: {value: "HH:mm", text: "24 "+this.props.content.hours}
    }
  }

  componentDidUpdate(){
    let selectedLanguage = this.state.selectedLanguage;
    let selectedDateFormat = this.state.selectedDateFormat;
    let selectedTimeFormat = this.state.selectedTimeFormat;
    let changed = false;

    if (this.props.user.language && (this.props.user.language != this.state.selectedLanguage.value)) {     //if a language was selected before
      selectedLanguage = this.state.languages.filter( lang => lang.value == this.props.user.language)[0];
      changed = true;
    }
    if (this.props.user.dateFormat && (this.props.user.dateFormat != this.state.selectedLanguage.value)) {     //if a language was selected before
      selectedDateFormat = this.state.dateFormats.filter( dateFormat => dateFormat.value == this.props.user.dateFormat)[0];
      changed = true;
    }
    if (this.props.user.timeFormat && (this.props.user.timeFormat != this.state.selectedLanguage.value)) {     //if a language was selected before
      selectedTimeFormat = this.state.timeFormats.filter( timeFormat => timeFormat.value == this.props.user.timeFormat)[0];
      changed = true;
    }
    if (changed){
      this.setState({
        ...this.state,
        selectedLanguage: selectedLanguage,
        selectedDateFormat: selectedDateFormat,
        selectedTimeFormat: selectedTimeFormat
      });
    }
  }

  selectLanguage(selected){
    this.setState({
      ...this.state,
      seletedLanguage: selected
    })
  }

  selectDateFormat(selected){
    this.setState({
      ...this.state,
      seletedDateFormat: selected
    })
  }

  selectTimeFormat(selected){
    this.setState({
      ...this.state,
      seletedTimeFormat: selected
    })
  }

  render() {
    return(
      <div className={css.base}>
        <div className={css.row}>
          <p className={css.languageSpan}>{this.props.content.language}</p>
          <div className={css.language}>
            <Dropdown title={this.state.selectedLanguage.text}
                      items={this.state.languages}
                      selected={this.state.selectedLanguage}
                      onSelect={this.selectLanguage}/>
          </div>
        </div>
        <div className={css.row}>
          <p className={css.dateFormatSpan}>{this.props.content.dateFormat}</p>
          <div className={css.dateFormat}>
            <Dropdown title={this.state.selectedDateFormat.text}
                      items={this.state.dateFormats}
                      selected={this.state.selectedDateFormat}
                      onSelect={this.selectDateFormat}/>
          </div>
        </div>
        <div className={css.row}>
          <p className={css.timeFormatSpan}>{this.props.content.timeFormat}</p>
          <div className={css.timeFormat}>
            <Dropdown title={this.state.selectedTimeFormat.text}
                      items={this.state.timeFormats}
                      selected={this.state.selectedTimeFormat}
                      onSelect={this.selectTimeFormat}/>
          </div>
        </div>
      </div>
    )
  }
}

export default GeneralSettings
