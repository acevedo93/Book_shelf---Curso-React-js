import React from 'react';
import ReactDOM from 'react-dom'
import {BrowserRouter } from 'react-router-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import promiseMiddleware from 'redux-promise'
import ReduxThunk from 'redux-thunk'

import rootReducer from './reducers'
import Routes from './routes'

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware,ReduxThunk)(createStore)
const store = createStoreWithMiddleware(rootReducer)

ReactDOM.render(
    <Provider store = {store}>
        <BrowserRouter>
        <Routes/>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root')
)