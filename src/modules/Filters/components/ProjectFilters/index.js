import React, { Component } from 'react'
import css from './style.scss'

import AddProject from './AddProject'

class ProjectFilters extends Component {
  constructor(props){
    super(props);

    this.changeVisibility = this.changeVisibility.bind(this);
    this.renderProjects = this.renderProjects.bind(this);
    this.selectProject = this.selectProject.bind(this);
    this.state={
      showFilters: false,
      arrow: "down"
    }
  }

  componentWillMount(){
    this.props.getProjectList();
    if (this.props.project.selected) {    //if a project was selected
      this.setState({
        showFilters: true,
        arrow: "up"
      })
    }
  }


  changeVisibility(){
    if (this.state.showFilters){
      this.setState({
        showFilters: false,
        arrow: "down"
      })
    }
    else{
      this.setState({
        showFilters: true,
        arrow: "up"
      })
    }
  }

  selectProject(project){
    if (this.props.project.selected && this.props.project.selected.id == project.id){
      this.props.selectProject(null);
    }
    else{
      this.props.selectProject(project);
    }
  }

  renderProjects(){
    if (this.state.showFilters){
      let selected = this.props.project.selected;
      return(
        <div className={css.projects}>
          {this.props.project.list.map((project) => {
            return (
              <p key={project.id} onClick={this.selectProject.bind(this,project)}>
              {project.name}
              {(selected && selected.id==project.id)?<i className="fa fa-check-square"/>:<i className="fa fa-square-o"/>}
            </p>
            );
          })}
          <AddProject content={this.props.content.page.project}
                      createProject={this.props.createProject}
                      error={this.props.project.error}
                      reset={this.props.reset}/>
        </div>
      )
    }
  }


  render() {
    return(
      <div className={css.base}>
        <h2 onClick={this.changeVisibility}>{this.props.content.page.filters.projectFilter} <i className={"fa fa-arrow-"+this.state.arrow} /></h2>
        {this.renderProjects()}
      </div>
    )
  }
}

export default ProjectFilters
