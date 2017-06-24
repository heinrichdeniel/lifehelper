import React, { Component } from 'react'
import DropDown from 'react-bootstrap-dropdown';
import css from './style.scss'
import PropTypes from 'prop-types'

class Dropdown extends Component{
  constructor(props){
    super(props);

    this.onClick = this.onClick.bind(this);

  }

  onClick(){
    this.props.onChange(null);
  }

  render(){
    let { selected, onChange, projects } = this.props;

    let options=[];
    projects.map((project) => options.push({value: project.id.toString(), text: project.name})); //creating options from projects

    let value;
    if (selected != "0" && selected != null){   //if selected contain the id
      value = options.find((option) => option.value == selected);
    }
    else{
      value = {value: "0", text: this.props.placeholder};
    }

    return(
      <div className={css.base}>
        <i className={css.chain + " fa fa-chain"}/>
        <DropDown key={value.value}
                  title={value.text}
                  items={options}
                  onSelect={onChange}
                  selected={value}/>
        <span onClick={this.onClick} className={css.reset + " fa fa-times-circle-o"}/>
      </div>
    )
  }
}

Dropdown.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default Dropdown
