import React, { Component } from 'react'
import css from './style.scss'

import Input from 'components/Input';
import Button from 'components/Button';
import ErrorBox from 'components/ErrorBox';

class AddProject extends Component {
  constructor(props){
    super(props);

    this.changeVisibility = this.changeVisibility.bind(this);
    this.changeName = this.changeName.bind(this);
    this.createProject = this.createProject.bind(this);

    this.state={
      addProject: false,
      project: {
        name:""
      }
    }
  }

  componentDidUpdate(){
    if (this.props.error && !this.state.addProject){
      this.changeVisibility();
    }
  }

  changeVisibility(){
    if (this.state.addProject){     //if the form will be closed
      this.props.reset();
    }
    this.setState({
      project:{
        name: ""
      },
      addProject: !this.state.addProject,
      error: false
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

  createProject(e){
    e.preventDefault();
    if (this.state.project.name.length < 3 || this.state.project.name.length > 15) {
      return this.setState({error: 'The name must contain at least 3, maximum 15 character!'})
    }
    this.props.createProject(this.state.project);     //sending request to the api
    this.setState({
      ...this.state,
      addProject: false,
      error: false
    });
  }

  render() {
    if (!this.state.addProject){     //render a button with "Add Project" text
      return(
        <div className={css.base}>
          <Button text={this.props.content.addProject} style={css.addButton} onClick={this.changeVisibility}/>
        </div>
      )
    }
    else{     //render an input
      return(
        <div className={css.base}>
          <form  action="POST" onSubmit={this.createProject}>
            <Input placeholder={this.props.content.name} focused={true} value={this.state.project.name} style={css.input} onChange={this.changeName}  minLength={3} maxLength={15}/>
            {this.state.error ? <ErrorBox error={this.state.error}/> : null}
            {this.props.error ? <ErrorBox error={this.props.error}/> : null}
            <Button text={this.props.content.createProject} style={css.addButton} onClick={this.createProject}/>
            <Button text={this.props.content.cancel} style={css.cancel} onClick={this.changeVisibility}/>
          </form>
        </div>
      )
    }

  }
}

export default AddProject
