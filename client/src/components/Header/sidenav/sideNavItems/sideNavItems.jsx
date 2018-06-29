import React from 'react';

import {Link} from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import {connect} from 'react-redux'

const SideNavItems = ({user}) => {
    const items = [
        {
            type : 'navItem',
            icon : 'home',
            text : 'Home',
            link : '/',
            restricted : false
        },
        {
            type : 'navItem',
            icon : 'file-text-o',
            text : 'My Profile',
            link : '/user',
            restricted : true
        },
        {
            type : 'navItem',
            icon : 'file-text-o',
            text : 'Add Admins',
            link : '/user/register',
            restricted : true,
        },
        {
            type : 'navItem',
            icon : 'file-text-o',
            text : 'Login',
            link : '/login',
            restricted : false,
            exclude:true
        },
        {
            type : 'navItem',
            icon : 'file-text-o',
            text : 'My reviews',
            link : '/user/user-reviews',
            restricted : true

        },
        {
            type : 'navItem',
            icon : 'file-text-o',
            text : 'Add reviews',
            link : '/user/add',
            restricted : true
        },
        {
            type : 'navItem',
            icon : 'file-text-o',
            text : 'Logout',
            link : '/user/logout',
            restricted : true
        }




    ]
    const element = (item,key) => (
        
        
         <div key = {key} className={item.type}>
            <Link to = {item.link}>
                <FontAwesome name={item.icon}/>
                 {item.text}
             </Link>

         </div>
       
    )


    const showItems = ()=> {
       return user.login ?
         items.map((item,key) => {
           
            if(user.login.isAuth){
                return !item.exclude ? 
                    element(item,key)
                : null
            } else {
                return !item.restricted ? 
                    element(item,key)
                :null
            }
            // return element(item,key)
            
        })
        : null
    }

    return(
        <div>
            {showItems()}
        
        </div>
    )
    
    
}
function mapStateToProps (state) {
    return {
        user:state.user
    }
}

export default connect(mapStateToProps)(SideNavItems);
