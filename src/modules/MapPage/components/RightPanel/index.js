import React, { Component } from 'react'
import css from './style.scss'
import Reorder  from 'react-reorder';
import ListItem  from './ListItem';
import { Scrollbars } from 'react-custom-scrollbars';
import domCss from 'dom-css';

class RightPanel extends Component{
  constructor(props){
    super(props);

    this.onSort = this.onSort.bind(this);
    this.changeVisibility = this.changeVisibility.bind(this);
    this.handleScrollUpdate = this.handleScrollUpdate.bind(this);

    this.state={
      selected: undefined,
      arrow: "left",
      style:{
        display: "none",
        width: "0"
      },
      scrollTop: 0,
      scrollHeight: 0,
      clientHeight: 0
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.tasks!= this.props.tasks){
      this.setState({
        ...this.state,
        list: null
      })
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

  onSort(e,item,from,to,list){
    let tasks = this.props.tasks;
    if (to < from){
      if (to > 0 ){
        this.props.changeTaskOrder({taskId: item.id, priority: ((tasks[to-1].UserTasks[0].priority + tasks[to].UserTasks[0].priority)/2)})
      }
      else{
        this.props.changeTaskOrder({taskId: item.id, priority: ((tasks[to].UserTasks[0].priority)/2)})
      }
    }
    else if (to != from){
      if (to < tasks.length - 1) {
        this.props.changeTaskOrder({taskId: item.id, priority: ((tasks[to].UserTasks[0].priority + tasks[to + 1].UserTasks[0].priority) / 2)})
      }
      else {
        this.props.changeTaskOrder({taskId: item.id, priority: ((tasks[to].UserTasks[0].priority + (Number.MAX_VALUE/2)) / 2)})
      }
    }

    this.setState({
      list: list
    })
  }

  changeVisibility(){
    if (this.state.arrow == "left"){
      this.setState({
        ...this.state,
        arrow: "right",
        style: {
          display: 'block',
          width: "250px"
        }

      })
    }
    else{
      this.setState({
        ...this.state,
        arrow: "left",
        style: {
          display: "none",
          width: "0"
        }
      })
    }
  }

  render(){
    let list = [];
    if (this.state.list){
      list = this.state.list;
    }
    else{
      this.props.tasks.map((task,index) => {list.push({id: task.id, name: task.name, key:index, lat: task.lat, lng: task.lng, location: task.location, onClick:this.props.onClick})});
    }
    return(
      <div className={css.base}>
        <i className={"fa fa-angle-double-"+this.state.arrow +" " + css.arrow} onClick={this.changeVisibility} />
        <div style={this.state.style}>
          <h3>{this.props.content.page.tasks.order}</h3>
          <div className={css.tasks}>
            <Scrollbars ref="scrollbars"
                        onUpdate={this.handleScrollUpdate}
                        style={{ width: '100%', height: '100%' ,zIndex: 500}}>
              <Reorder
                itemKey="key"
                lock="horizontal"
                holdTime="0"
                list={list}
                template= {ListItem}
                callback={this.onSort}
                listClass={css.myList}
                itemClass={css.listItem}
                itemClicked={this.itemClicked}
                selected={this.state.selected}
                selectedKey="key"
                disableReorder={false}/>
            </Scrollbars>
            <div
              ref="shadowTop"
              className={css.shadowTopStyle}/>
            <div
              ref="shadowBottom"
              className={css.shadowBottomStyle}/>
          </div>
        </div>
      </div>
    )
  }
}

export default RightPanel
