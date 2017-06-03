import React, { Component } from 'react';
import css from './style.scss';
import { Scrollbars } from 'react-custom-scrollbars';
import domCss from 'dom-css';

class LeftPanel extends Component{
  constructor(props){
    super(props);

    this.changeVisibility = this.changeVisibility.bind(this);
    this.renderProject = this.renderProject.bind(this);
    this.renderTimeIntervals = this.renderTimeIntervals.bind(this);
    this.handleScrollUpdate = this.handleScrollUpdate.bind(this);

    this.state={
      arrow: "right",
      style:{
        display: "none",
        width: "0"
      },
      scrollTop: 0,
      scrollHeight: 0,
      clientHeight: 0
    }
  }

  handleScrollUpdate(values) {
    const { shadowTop, shadowBottom } = this.refs;
    const { scrollTop, scrollHeight, clientHeight } = values;
    const shadowTopOpacity = 1 / 20 * Math.min(scrollTop, 20);
    const bottomScrollTop = scrollHeight - clientHeight;
    const shadowBottomOpacity = 1 / 20 * (bottomScrollTop - Math.max(scrollTop, bottomScrollTop - 20));
    domCss(shadowTop, { opacity: shadowTopOpacity });
    domCss(shadowBottom, { opacity: shadowBottomOpacity });
  }

  changeVisibility(){
    if (this.state.arrow == "right"){
      this.setState({
        ...this.state,
        arrow: "left",
        style: {
          display: 'block',
          width: "250px"
        }

      })
    }
    else{
      this.setState({
        ...this.state,
        arrow: "right",
        style: {
          display: "none",
          width: "0"
        }
      })
    }
  }



  renderProject(project){
    if (this.props.selectedProjects.indexOf(project.id) < 0){
      return (
        <div key={project.id} onClick={this.props.selectProject.bind(this,project)} className={css.project}> <div className={css.checkboxEmpty}/>{project.name}</div>

      )
    }
    else{
      return (
        <div key={project.id} onClick={this.props.unselectProject.bind(this,project)} className={css.project}> <div className={css.checkbox} />{project.name}</div>
      )
    }
  }

  renderAllTasksCheckbox() {
    if (this.props.allTaskSelected) {
      return (
        <div onClick={this.props.selectAllTasks} className={css.project + " " + css.allTasks}>
          <div className={css.checkbox}/>
          {this.props.content.page.map.allTasks}
        </div>
      )
    }
    else {
      return (
        <div onClick={this.props.selectAllTasks} className={css.project + " " + css.allTasks}>
          <div className={css.checkboxEmpty}/>
          {this.props.content.page.map.allTasks}

        </div>
      )
    }
  }

  renderTimeOption(interval,index){
    let style = (index==0) ? css.allTasks : null
    if (this.props.selectedInterval == index) {
      return (
        <div className={css.interval + " " + style}>
          <div className={css.checkbox}/>
          {interval}
        </div>
      )
    }
    else {
      return (
        <div onClick={this.props.selectInterval.bind(this,index)} className={css.interval + " " + style}>
          <div className={css.checkboxEmpty}/>
          {interval}
        </div>
      )
    }
  }


  renderTimeIntervals(){
    return (
      <div className={css.intervals}>
        <h3>{this.props.content.page.map.intervals.title}</h3>
        {this.renderTimeOption(this.props.content.page.map.intervals.every, 0)}
        <div className={css.innerDiv}>
          <Scrollbars  style={{ width: '100%', height: '100%' }}>
            {this.renderTimeOption(this.props.content.page.map.intervals.today, 1)}
            {this.renderTimeOption(this.props.content.page.map.intervals.weekly, 2)}
            {this.renderTimeOption(this.props.content.page.map.intervals.monthly, 3)}
          </Scrollbars>
        </div>
      </div>
    )
  }

  render(){
    return(
      <div className={css.base}>
        <i className={"fa fa-angle-double-"+this.state.arrow +" " + css.arrow} onClick={this.changeVisibility} />
        <div style={this.state.style} className={css.body}>

          <div className={css.projects}>
            <h3>{this.props.content.page.map.selectProjects}</h3>
            {this.renderAllTasksCheckbox()}
            <div className={css.innerDiv}>
              <Scrollbars ref="scrollbars"
                          onUpdate={this.handleScrollUpdate}
                          style={{ width: '100%', height: '100%' }}>
                {this.props.projects.map((project) =>
                  this.renderProject(project)
                )}
              </Scrollbars>
              <div
                ref="shadowTop"
                className={css.shadowTopStyle}/>
              <div
                ref="shadowBottom"
                className={css.shadowBottomStyle}/>
            </div>
          </div>
          {this.renderTimeIntervals()}
        </div>
      </div>
    )
  }
}

export default LeftPanel
