import React, { Component } from 'react'
import css from './style.scss'

class Shortcuts extends Component {
  constructor(props){
    super(props);

  }

  render() {
    return(
      <div className={css.base}>
        <div className={css.items}>
          <div className={css.item}>
            <div className={css.name}>
              {this.props.content.newTask}
            </div>
            <div className={css.key}>
              alt + t
            </div>
          </div>
          <div className={css.item}>
            <div className={css.name}>
              {this.props.content.newProject}
            </div>
            <div className={css.key}>
              alt + p
            </div>
          </div>
          <div className={css.item}>
            <div className={css.name}>
              {this.props.content.comments}
            </div>
            <div className={css.key}>
              alt + c
            </div>
          </div>
          <div className={css.item}>
            <div className={css.name}>
              {this.props.content.tasks}
            </div>
            <div className={css.key}>
              t
            </div>
          </div>
          <div className={css.item}>
            <div className={css.name}>
              {this.props.content.projects}
            </div>
            <div className={css.key}>
              p
            </div>
          </div>
          <div className={css.item}>
            <div className={css.name}>
              {this.props.content.archive}
            </div>
            <div className={css.key}>
              a
            </div>
          </div>
          <div className={css.item}>
            <div className={css.name}>
              {this.props.content.settings}
            </div>
            <div className={css.key}>
              s
            </div>
          </div>
          <div className={css.item}>
            <div className={css.name}>
              {this.props.content.notifications}
            </div>
            <div className={css.key}>
              n
            </div>
          </div>
          <div className={css.item}>
            <div className={css.name}>
              {this.props.content.homepage}
            </div>
            <div className={css.key}>
              h
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Shortcuts
