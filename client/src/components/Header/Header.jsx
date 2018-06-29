import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import {Link} from 'react-router-dom'
import Nav from './sidenav/Sidenav'

 class Header extends Component {

    constructor(){
        super()
        this.state = {
            showNav:false
        }

        this.onHideNav = this.onHideNav.bind(this)
    }

    onHideNav(){
        
        this.setState({
            showNav:false
        })


    }

  render() {
    return (
      <div>
          <header>
            <div className="open_nav">
                  <FontAwesome name="bars"
                  onClick = {()=> this.setState({showNav:true})}
                  style= {{
                      color :"#ffffff",
                      padding:'10px',
                      cursor:'pointer'
                  }}/>
            </div>
            <Nav
                  showNav = {this.state.showNav}
                  onHideNav = {()=> this.onHideNav()}
            />
                  <Link to="/" className="logo">
                    The Book shelf
                  </Link>
        </header>
        
      </div>
      
    )
  }
}

export default Header
