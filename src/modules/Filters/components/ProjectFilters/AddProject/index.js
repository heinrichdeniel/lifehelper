import React, { Component } from 'react'
import css from './style.scss'

import Input from 'components/Input';
import Button from 'components/Button';

class AddProject extends Component {
  constructor(props){
    super(props);

    this.changeVisibility = this.changeVisibility.bind(this);
    this.changeName = this.changeName.bind(this);
    this.createProject = this.createProject.bind(this);

    this.state={
      addProject: false,
      project: {}
    }
  }

  changeVisibility(){
    this.setState({
      project:{},
      addProject: !this.state.addProject
    })
  }

  changeName(e){
    this.setState({
      project: {
        name:e.target.value
      },
      addProject: true
    })
  }

  createProject(){
    this.props.createProject(this.state.project);
    this.setState({
      project:{},
      addProject: false
    })
  }

  render() {
    if (!this.state.addProject){     //render a button with "Add Project" text
      return(
        <div className={css.base}>
          <Button text="Add Project" style={css.addButton} onClick={this.changeVisibility}/>
        </div>
      )
    }
    else{     //render an input
      return(
        <div className={css.base}>
          <Input placeholder="Project name" value={this.state.project.name} style={css.input} onChange={this.changeName}/>
          <Button text="Create Project" style={css.addButton} onClick={this.createProject}/>
          <Button text="Cancel" style={css.cancel} onClick={this.changeVisibility}/>
        </div>
      )
    }

  }
}

export default AddProject
