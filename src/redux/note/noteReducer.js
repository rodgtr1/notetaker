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
        notes: [...payload]
      }
    case SELECT_NOTE:
      return {
        ...state,
        notes: state.notes.map(note =>
          note.id === payload.id
            ? { ...note, selected: true }
            : { ...note, selected: false }
        )
      }
    case ADD_NOTE:
      return {
        ...state,
        notes: [...state.notes, payload]
      }
    case UPDATE_NOTE:
      return
    case FILTER_BY_TITLE:
      return
    default:
      return state
  }
}

export default noteReducer
