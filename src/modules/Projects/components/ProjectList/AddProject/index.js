import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import css from './style.scss'

import Button from 'components/Button';
import Input from 'components/Input';
import ErrorBox from 'components/ErrorBox';

class AddProject extends Component {
  constructor(props){
    super(props);

    this.changeModalState = this.changeModalState.bind(this);
    this.changeName = this.changeName.bind(this);
    this.sendTask = this.sendTask.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.renderModal = this.renderModal.bind(this);

    this.state = {
      showModal: false,
      error: "",
      project: {
        name: ""
      }
    }
  }

  changeName(e){
    this.setState({
      ...this.state,
      project:{
        ...this.state.task,
        name:e.target.value
      }
    });
  }

  changeModalState(){
    this.setState({
      ...this.state,
      showModal: !this.state.showModal,
      error: ""
    });
  }


  sendTask(e){
    e.preventDefault();
    if (this.state.project.name.length < 3 || this.state.project.name.length > 20) {
      return this.setState({error: this.props.content.page.project.shortName})
    }

    this.props.sendProject(this.state.project);
    this.changeModalState();
  }

  renderButton(){     //rendering the button
    if(!this.props.update){
      return(
        <div className={css.base}>
          <div className={this.props.iconStyle + " " + css.addIcon} data-tip={this.props.buttonText} onClick={this.changeModalState}>
            <i className={"fa fa-plus"} aria-hidden="true"/>
          </div>
        </div>
      );
    }
    else{
      return(
        <div className={css.base}>
          <Button type="button" onClick={this.changeModalState} text={this.props.buttonText}  style={css.addButton+" "+this.props.buttonStyle}>
            {this.props.children}
          </Button>
        </div>
      );

    }
  }

  renderModal(){         //rendering the modal with title, description and datetime
    let project = this.state.project;
    let content = this.props.content;

    return(
      <Modal show={this.state.showModal} onHide={this.changeModalState}>
        <div  className={css.container}>
          <div className={css.body}>
            <i className={`fa fa-close ${css.close}`} onClick={this.changeModalState} />
            <h1>{this.props.sendButtonText}</h1>
            <form  action="POST" onSubmit={this.saveProject}>
              <Input type="text" placeholder={content.name} value={project.name} onChange={this.changeName} style={css.input} minLength={3} maxLength={20} />
              <Button type="button" onClick={this.saveProject} text={this.props.sendButtonText} style={css.addButton}/>
              <Button type="button" onClick={this.changeModalState} text={content.cancel} style={css.cancel}/>
            </form>
          </div>
        </div>
      </Modal>
    );
  }

  render() {
    if (!this.state.showModal){
      return this.renderButton();
    }
    return(
      <div>
        {this.renderButton()}
        {this.renderModal()}
      </div>
    )

  }
}

export default AddProject
