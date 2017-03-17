import React, { Component } from 'react'
import css from './style.scss'
import Input from 'components/Input'
import Button from 'components/Button'
import ErrorBox from 'components/ErrorBox'

class AccountSettings extends Component {
  constructor(props){
    super(props);
    this.changeValue=this.changeValue.bind(this);
    this.renderPasswords=this.renderPasswords.bind(this);
    this.renderSuccessMessage=this.renderSuccessMessage.bind(this);
    this.addNewPassword=this.addNewPassword.bind(this);
    this.saveChanges=this.saveChanges.bind(this);

    this.state={
      username: "",
      email: "",
      password: "",
      newPassword: "",
      newPassword2: "",
      addNewPassword: false,
      error: null,
      success: false
    }
  }

  componentWillMount(){

    if (!this.state.id && this.props.user.id){
      this.setState({
        ...this.state,
        ...this.props.user,
        password: "",
        success: false
      })
    }
  }

  componentWillUnmount() {
    if (this.props.user.error) {
      this.props.removeError();
    }
  }

  changeValue(key,e){
    if (this.props.user.error) {
      this.props.removeError();
    }
    let obj = {
      success: false
    };
    obj[key] = e.target.value;
    this.setState(Object.assign({},this.state,obj))
  }

  addNewPassword(){
    this.setState({
      ...this.state,
      addNewPassword: true,
      success: false
    })
    if (this.props.user.error) {
      this.props.removeError();
    }
  }

  saveChanges(){
    let content = this.props.content.errors;

        //first need to check the errors

    if (!this.state.username || !this.state.email) {
      return this.setState({error: content.fillOut});
    }
    if (this.state.addNewPassword && ( !this.state.newPassword || !this.state.newPassword2)) {
      return this.setState({error: content.fillOut});
    }

    if (this.state.username.length < 4 || this.state.username.length > 20) {
      return this.setState({error: content.smallName})
    }
    if (this.state.email.length < 6 ) {
      return this.setState({error: content.smallEmail})
    }
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!this.state.email.match(emailRegex)){
      return this.setState({error: content.invalidEmail})
    }

    if (this.state.addNewPassword){   //if the user want to change the password
      if (this.state.newPassword.length < 6 || this.state.newPassword.length > 20) {
        return this.setState({error: content.smallPassword})
      }
      let passRegex = /^.*(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/
      if (!this.state.newPassword.match(passRegex)) {
        return this.setState({error: content.invalidPassword})
      }
      if (this.state.newPassword != this.state.newPassword2){
        return this.setState({error: content.differentPasswords})
      }
    }

    let settings = {
      username: this.state.username,
      email: this.state.email,
      oldPassword: this.state.password,
      newPassword: this.state.newPassword
    };

    this.props.saveChanges(settings);
    this.setState({
      ...this.state,
      success:true
    })
  }

  renderSuccessMessage(){
    if (this.props.user.success && this.state.success){
      return (
        <div className={css.updateSuccess}>
          {this.props.content.settings.account.updated}
        </div>
      )
    }
  }

  renderPasswords(){
    let content = this.props.content.settings.account;
    if (!this.state.addNewPassword){
      return (
        <div className={css.row}>
          <p>{content.currentPassword}</p>
          <Button text={content.setPassword} style={css.changePassword} onClick={this.addNewPassword}/>
        </div>
      )
    }
    else{
      return(
        <div className={css.row}>
          <p>{content.newPassword}</p>
          <Input type="password" onChange={this.changeValue.bind(this,"newPassword")} value={this.state.newPassword} style={css.input}/>
          <p>{content.newPassword2}</p>
          <Input type="password" onChange={this.changeValue.bind(this,"newPassword2")} value={this.state.newPassword2} style={css.input}/>
        </div>
      )
    }
  }

  render() {
    let content = this.props.content.settings.account;

    return(
      <div className={css.base}>
        <div className={css.center}>
          <div className={css.options}>
            <div className={css.row}>
              <p>{content.username}</p>
              <Input onChange={this.changeValue.bind(this,"username")} value={this.state.username} style={css.input}/>
            </div>
            <div className={css.row}>
              <p>{content.email}</p>
              <Input onChange={this.changeValue.bind(this,"email")} value={this.state.email} style={css.input}/>
            </div>
            {this.renderPasswords()}
            {this.state.error ? <ErrorBox error={this.state.error}/> : this.props.user.error ? <ErrorBox error={this.props.user.error}/> : null}
            {this.renderSuccessMessage()}
          </div>
        </div>
        <div className={css.buttons}>
          <Button onClick={this.saveChanges} text={content.saveChanges} style={css.save}/>
        </div>
      </div>
    )
  }
}

export default AccountSettings
