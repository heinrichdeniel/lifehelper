import React, { Component } from 'react';
import css from './style.scss';
import TaskItem from './TaskItem';

class TaskList extends Component {
  constructor(props){
    super(props);
  }
  componentWillMount(){
    this.props.getTaskList();
    this.props.reset();
  }

  render() {
    let tasks = this.props.task.list;
    return(
        <div className={css.base}>
          {
            tasks.map( (task) =>
             <TaskItem key={task.id}
                       task={task}/>
            )
          }
        </div>
    );
  }
}

export default TaskList
