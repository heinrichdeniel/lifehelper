import React, { Component } from 'react';
import css from './style.scss';

class User extends Component{
  constructor(props){
    super(props);

    this.getStatus = this.getStatus.bind(this);
    this.removeShare = this.removeShare.bind(this);
  }

  getStatus(){
    let user = this.props.user;

    if (this.props.me){
      return <span className={css.spanMe}>{this.props.content.me}</span>
    }
    if (user.Projects[0].UserProject.shareStatus == "pending"){                                                //if the share is in pending status
      return (
        <span className={css.status}>
        <i className="fa fa-hourglass-half" aria-hidden="true"/>
          {this.props.content.pending}
        </span>
      )
    }
    if (user.Projects[0].UserProject.shareStatus == "accepted"){                                                   //if the share was accepted
      return (
        <span className={css.status}>
        <i className="fa fa-check" aria-hidden="true"/>
          {this.props.content.accepted}
        </span>
      )
    }
    if (user.Projects[0].UserProject.shareStatus == "declined"){                                                        //if the share was declined
      return (
        <span className={css.status +" " +css.declined}>
        <i className="fa fa-times" aria-hidden="true"/>
          {this.props.content.declined}
        </span>
      )
    }
  }

  removeShare(){      //removing the user from the list of collaborators
    this.props.removeShare({userId: this.props.user.id, projectId: this.props.projectId});
  }

  render(){

    let user = this.props.user;
    let trash = null;
    if (!this.props.me && ( this.props.owner == this.props.profile.id || (this.props.user.projects && this.props.user.projects[0].UserProject.sharedBy == this.props.profile.id))){
      trash = <i className={`fa fa-ban ${css.trash}`} onClick={this.removeShare} />;
    }

    if (user.photo_url){
      return (
        <div key={user.id} className={css.user}>
          <img src={user.photo_url}/>
          <span>{user.username}</span>
          {this.getStatus()}
          {trash}
        </div>
      )
    }
    else {
      return (
        <div key={user.id} className={css.user}>
          <i className={css.userIcon + " fa fa-user"}/>
          <span className={css.name}>{user.username}</span>
          {this.getStatus()}
          {trash}
        </div>
      )
    }

  }
}

export default User
