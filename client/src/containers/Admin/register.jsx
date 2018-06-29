import React, { Component } from 'react'
import { connect } from 'react-redux'
import {  getUsers, userRegister } from '../../actions'

 class Register extends Component {
     state = {
         name : '',
         lastName: '',
         email: '',
         password : '',
         error : ''
     }

     
     
     componentWillMount() {
         this.props.dispatch(getUsers())
     }
     componentWillReceiveProps(nextProps) {
         if(!nextProps.user.register){
             this.setState({error:"Error try Again"})
         }
         else{
             this.setState({
                 name: '',
                 lastName:'',
                 email:'',
                 password: ''
             })
         }
     }
     
     
     

     handleInputEmail = (event) => {
         this.setState({
             email : event.target.value
         })

     }
     handleInputPassword = (event) => {
        this.setState({
            password : event.target.value
        })
    }
    handleInputName = (event) => {
        this.setState({
            name : event.target.value
        })
    }
    handleInputLastName = (event) => {
        this.setState({
            lastName : event.target.value
        })
    }

    showUsers = (user) => (
       
        user.users ? 
            user.users.map(item => (
                <tr key = {item._id}>
                    <td>{item.name}</td>
                    <td>{item.lastname}</td>
                    <td>{item.email}</td>
                </tr>
            ))
        : null
    )

    submitForm = (e) => {
        e.preventDefault()
        this.setState ( {error:''})
        console.log(this.state)

        this.props.dispatch(userRegister({
            email:this.state.email,
            password:this.state.password,
            name:this.state.name,
            lastname:this.state.lastName
        },this.props.user.users))
    }
  render() {
      console.log(this.props.user.users)
      let user = this.props.user
      console.log(user)
    return (
      <div className = "rl_container">
        <form onSubmit = {this.submitForm}>
            <h2> Add User</h2>
            <div className="form_element">
                <input
                    type="text"
                    placeholder="Enter name"
                    value={this.state.name}
                    onChange={this.handleInputName}
            />
            </div>
            <div className="form_element">
                <input
                    type="text"
                    placeholder="Enter Last name"
                    value={this.state.lastName}
                    onChange={this.handleInputLastName}
            />
            </div>
            <div className="form_element">
                <input
                    type="text"
                    placeholder="Enter Email"
                    value={this.state.email}
                    onChange={this.handleInputEmail}
            />
            </div>
            <div className="form_element">
                <input
                    type="password"
                    placeholder="Enter Password"
                    value={this.state.password}
                    onChange={this.handleInputPassword}
            />
            </div>
            <button type="submit"> Add User</button>
            <div className="error">
                {this.state.error}

            </div>
           
        </form>
        <div className='current_users'>
            <h4>Current users</h4>
            <table>
                <thead>
                    <tr>
                        <td> name </td>
                        <td> Last name </td>
                        <td> Email </td>
                    </tr>
                  
                </thead>
                <tbody>
                        {this.showUsers(user)}
                    </tbody>
            </table>
        </div>
        
      </div>
    )
  }
}


function mapStateToProps (state){
    return {
        user : state.user
    }
}

export default connect(mapStateToProps)(Register)
