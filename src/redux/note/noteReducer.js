import {
  SHOW_NOTES,
  SELECT_NOTE,
  UPDATE_NOTE,
  ADD_NOTE,
  FILTER_BY_TITLE
} from './noteConstants'

const initialState = {
  notes: '',
  searchText: ''
}

const noteReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SHOW_NOTES:
      return {
        ...state,
        notes: [payload]
      }
    case SELECT_NOTE:
      return
    case ADD_NOTE:
      return
    case UPDATE_NOTE:
      return
    case FILTER_BY_TITLE:
      return
    default:
      return state
  }
}

export default noteReducer
