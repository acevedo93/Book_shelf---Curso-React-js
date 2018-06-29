import  { combineReducers } from 'redux'
import books from './Books_reducer'
import user from './User_reducer'


const rootReducer = combineReducers({
    books,
    user

})


export default rootReducer