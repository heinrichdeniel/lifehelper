import React, { Component } from 'react'
import css from './style.scss'


class ProjectFilters extends Component {
  constructor(props){
    super(props);

    this.changeVisibility = this.changeVisibility.bind(this);
    this.renderProjects = this.renderProjects.bind(this);
    this.state={
      showFilters: false,
      arrow: "down"
    }
  }

  componentWillMount(){
    this.props.getProjectList();
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

  renderProjects(){
    if (this.state.showFilters){
      return(
        <div className={css.projects}>
          {this.props.project.list.map((project) => {
            return <p key={project.id} onClick={this.props.selectProject.bind(this,project)}>
              {project.name}
              {this.props.project.selected==project?<i className="fa fa-check-square"/>:<i className="fa fa-square-o"/>}
            </p>
          })}
        </div>
      )
    }
  }

  render() {
    return(
      <div className={css.base}>
        <h2 onClick={this.changeVisibility}>Show tasks of a project <i className={"fa fa-arrow-"+this.state.arrow} /></h2>
        {this.renderProjects()}
      </div>
    )
  }
}

export default ProjectFilters
