import React, { Component } from 'react'
import Select from 'react-select';
import css from './style.scss'

class MultiSelect extends Component{
  constructor(props){
    super(props);

    this.selectValue = this.selectValue.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.makeOptionsForSelect = this.makeOptionsForSelect.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.state={
      input: ""
    }
  }

  selectValue(selected){
    this.setState({
      input: ""
    });
    this.props.selectValue(selected);

  }
  componentWillMount(){
    this.props.getUsersByFilter("", this.props.taskId);
  }

  onInputChange(e){
    if (e.length == 1){
    }
    this.setState({
      input: e
    });
  }

  makeOptionsForSelect(){   //creating the options array with label:value pairs
    let options = [ ];

    this.props.options.map((option) => {
      if (option.username.toLowerCase().includes(this.state.input.toLowerCase())){
        options.unshift({value: option.id, label: option.username,photo_url: option.photo_url});      //adding the option to the front of the array
      }
      else{
        options.push({value: option.id, label: option.email,photo_url: option.photo_url});        //adding to the end of the array
      }
    });

    return options;
  }

  onBlur(){
    this.setState({
      ...this.state,
      input: ""
    })
  }

  optionRenderer(option){
    if (option.photo_url){
      return (
        <div className={css.option}>
          <img src={option.photo_url}/>
          <span>{option.label}</span>
        </div>
      )
    }
    else{
      return (
        <div className={css.option}>
          <i className={css.userIcon + " fa fa-user"}/>
          <span className={css.labelSpan}>{option.label}</span>
        </div>
      )
    }
  }
  render(){
    let validOptions = this.makeOptionsForSelect();
    if (this.state.input.length < 1){
      return (
        <div className={css.base}>
        <Select
          onInputChange={this.onInputChange}
          multi={true}
          onChange={this.selectValue}
          value={this.props.selected}
          placeholder={this.props.placeholder}
          menuRenderer={()=>{}}
          noResultsText={this.props.typeToSearch}
          onBlur={this.onBlur}/>
      </div>
      )
    }
    return(
      <div className={css.base}>
        <Select
          name="Share"
          value={this.props.selected}
          options={validOptions}
          onChange={this.selectValue}
          onInputChange={this.onInputChange}
          multi={true}
          inputProps={{value: this.state.input}}
          placeholder={this.props.placeholder}
          noResultsText={this.props.noResultsText}
          onBlur={this.onBlur}
          optionRenderer={this.optionRenderer}/>
      </div>
    )
  }
}


export default MultiSelect
