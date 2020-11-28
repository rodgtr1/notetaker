import { combineReducers } from 'redux'
import noteReducer from './note/noteReducer'

const rootReducer = combineReducers({
  note: noteReducer
})

export default rootReducer
