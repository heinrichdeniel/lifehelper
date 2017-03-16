import React, { Component } from 'react'
import css from './style.scss'
import Input from 'components/Input'

class AccountSettings extends Component {
  constructor(props){
    super(props);
    this.changeValue=this.changeValue.bind(this);
    this.state={

    }
  }

  componentWillMount(){
    if (!this.state.id && this.props.user.id){
      this.setState(this.props.user)
    }
  }

  changeValue(key,e){
    let obj = {};
    obj[key] = e.target.value;
    this.setState(Object.assign({},this.state,obj))
  }

  render() {
    let content = this.props.content;
    return(
      <div className={css.base}>
        <div className={css.row}>
          <p>{content.username}</p>
          <Input onChange={this.changeValue.bind(this,"username")} value={this.state.username} style={css.input}/>
        </div>
        <div className={css.row}>
          <p>{content.email}</p>
          <Input onChange={this.changeValue.bind(this,"email")} value={this.state.email} style={css.input}/>
        </div>
        <div className={css.row}>
          <p>{content.currentPassword}</p>
          <Input onChange={this.changeValue.bind(this,"password")} value={this.state.password} style={css.input}/>
        </div>
      </div>
    )
  }
}

export default AccountSettings
