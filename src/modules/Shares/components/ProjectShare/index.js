import React, { Component } from 'react';
import css from './style.scss';
import Modal from "react-bootstrap/lib/Modal";
import Button from "components/Button";
import User from "./User";
import MultiSelect from "components/MultiSelect";

class ProjectShare extends Component{
  constructor(props){
    super(props);

    this.showHideModal = this.showHideModal.bind(this);
    this.showHideShareModal = this.showHideShareModal.bind(this);
    this.sendShare = this.sendShare.bind(this);
    this.selectUsers = this.selectUsers.bind(this);
    this.renderUser = this.renderUser.bind(this);
    this.renderShareModal = this.renderShareModal.bind(this);
    this.renderCollaboratorsModal = this.renderCollaboratorsModal.bind(this);

    this.state={
      showModal: false,
      showShareModal: false,
      selectedUsers: []
    }
  }

  showHideModal(e){   //showing or hiding a modal for adding the first collaborator
    if (e){
      e.stopPropagation();
    }

    if (!this.state.showModal){     //sending request to the server
      this.props.getCollaborators({projectId:this.props.project.id})
    }

    this.setState({
      ...this.state,
      showModal: !this.state.showModal
    })
  }

  showHideShareModal(e){
    if (e){
      e.stopPropagation();
    }

    this.setState({
      ...this.state,
      showShareModal: !this.state.showShareModal
    })
  }

  selectUsers(selected){
    this.setState({
      ...this.state,
      selectedUsers: selected
    })
  }

  sendShare(){      //sending the share request to the server
    if (this.state.selectedUsers.length > 0){
      this.props.shareProject({users: this.state.selectedUsers, project: this.props.project});
    }
    this.setState({
      ...this.state,
      selectedUsers: [],
      showShareModal: false,
      showModal: true

    })
  }

  renderUser(user){
    if (user.Projects[0].UserProject.shareStatus != "deleted"){
      return (
        <User key={user.id}
              owner={this.props.project.owner}
              user={user}
              content={this.props.content}
              profile={this.props.profile}
              projectId={this.props.project.id}
              removeShare={this.props.removeShare}/>
      )
    }
  }

  renderShareModal(){
    let content = this.props.content;
    return (
      <Modal show={this.state.showShareModal}   dialogClassName={css.modal} onHide={this.showHideShareModal}>
        <div  className={css.container}>
          <i className={`fa fa-close ${css.close}`} onClick={this.showHideShareModal} />
          <h1><i className="fa fa-chain"/> {this.props.project.name}</h1>
          <MultiSelect options={this.props.users}
                       getUsersByFilter={this.props.getUsersByFilter}
                       placeholder={content.search}
                       noResultsText={content.noResultsText}
                       typeToSearch={content.typeToSearch}
                       selected={this.state.selectedUsers}
                       selectValue={this.selectUsers}
                       projectId={this.props.project.id}/>
          <Button type="button" onClick={this.sendShare} text={content.shareTask} style={css.share}/>
          <Button type="button" onClick={this.showHideShareModal} text={content.cancel} style={css.cancelRed}/>

        </div>
      </Modal>
    )
  }

  renderCollaboratorsModal(){
    return (
      <div>
        <i className={css.icon + " fa fa-users"} onClick={this.showHideModal}/>

        <Modal show={this.state.showModal}  dialogClassName={css.modal} onHide={this.showHideModal}>
          <div  className={css.container}>
            <i className={`fa fa-close ${css.close}`} onClick={this.showHideModal} />
            <h1><i className="fa fa-chain"/>  {this.props.project.name}</h1>

            <p className={css.addMore}>{this.props.content.title}</p>
            <div className={css.collaborators}>
              <User me={true}
                    owner={this.props.project.owner}
                    user={this.props.profile}
                    content={this.props.content}
                    profile={this.props.profile}
                    projectId={this.props.project.id}
                    removeShare={this.props.removeShare}/>
              {!this.props.collaborators.pending ? this.props.collaborators.list.map( this.renderUser): null}
            </div>

            <p className={css.addMore}>{this.props.content.addMore}</p>
            <MultiSelect options={this.props.users}
                         getUsersByFilter={this.props.getUsersByFilter}
                         placeholder={this.props.content.search}
                         noResultsText={this.props.content.noResultsText}
                         typeToSearch={this.props.content.typeToSearch}
                         selected={this.state.selectedUsers}
                         selectValue={this.selectUsers}
                         projectId={this.props.project.id}/>
            <Button type="button" onClick={this.sendShare} text={this.props.content.shareTask} style={css.share}/>
          </div>
        </Modal>
      </div>
    )
  }

  render(){
    if (!this.props.project.shared && !this.state.showShareModal){     //if the project was not shared
      return (
        <i className={css.icon + " " + css.shareIcon + " fa fa-share-alt"} onClick={this.showHideShareModal}/>
      )
    }
    if (this.state.showShareModal){
       return (
         <div>
           <i className={css.icon + " " + css.shareIcon + " fa fa-share-alt"} onClick={this.showHideShareModal}/>
           {this.renderShareModal()}
         </div>
       )
    }
    if (!this.state.showModal){
      return (
        <i className={css.icon + " fa fa-users"} onClick={this.showHideModal}/>
      )
    }

    return this.renderCollaboratorsModal();
  }
}

export default ProjectShare
