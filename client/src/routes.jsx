
import React from 'react';
import {Switch, Route} from 'react-router-dom'

import Home from './components/Home'
import Layout from './hoc/Layout'
import BookView from './components/Books'
import Login from './containers/Admin/login'
import Auth from './hoc/auth'
import User from './components/Admin'
import AddReview from './containers/Admin/add'
import UserPosts from './components/Admin/UserPosts'
import EditReview from './containers/Admin/edit'
import Register from './containers/Admin/register'
import Logout from './components/Admin/logout'
const Routes = () => (
    <div>
        <Layout>
        <Switch>
            <Route path="/" exact component={Auth(Home,null)} />
            <Route path="/login" exact component={Auth(Login,false)} />
            <Route path="/books/:id" component={BookView}/>
            <Route path="/user" exact component={Auth(User,true)}/>
            <Route path="/user/add" exact component={Auth(AddReview,true)} />
            <Route path="/user/edit-post/:id" exact component={Auth(EditReview,true)} />
            <Route path="/user/user-reviews" exact component={Auth(UserPosts,true)}/>
            <Route path="/user/register" exact component={Auth(Register,true)}/>
            <Route path="/user/logout" exact component={Auth(Logout,true)}/>
        </Switch>
        </Layout>
        
    </div>
);

export default Routes;
