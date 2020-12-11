//combineReducers 用来合并多个reducer 在外层就可以直接使用 store.getState().cart
import { combineReducers } from 'redux'
import goods from './cartReducer'
import login from './loginReducer'

export default combineReducers({
  goods,
  login
})