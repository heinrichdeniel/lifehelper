import React, { Component } from 'react'
import css from './style.scss'
import Reorder  from 'react-reorder';
import ListItem  from './ListItem';

class RightPanel extends Component{
  constructor(props){
    super(props);

    this.renderTask = this.renderTask.bind(this);
    this.onSort = this.onSort.bind(this);

    this.state={
      selected: undefined
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
    else {
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


  renderTask(task,index){
    let marker = null;
    if (task.location) {
      marker = <i onClick={this.props.onClick.bind(this,task.lat, task.lng)} className={css.marker + " fa fa-map-marker"} aria-hidden="true"/>;
    }
    return (
        <div key={index} className={css.task} > <span>{index+1}. </span>{task.name} {marker}</div>
    )
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
        <h3>{this.props.content.page.tasks.order}</h3>
        <div className={css.tasks}>
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
        </div>
      </div>
    )
  }
}

export default RightPanel
