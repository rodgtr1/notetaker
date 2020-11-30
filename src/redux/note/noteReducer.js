import {
  GET_NOTES_BEGIN,
  GET_NOTES_SUCCESS,
  GET_NOTES_FAILURE,
  SHOW_NOTES,
  SELECT_NOTE,
  UPDATE_NOTE,
  ADD_NOTE,
  GET_CATEGORIES,
  INCREMENT_CATEGORY_COUNT,
  FILTER_BY_TITLE
} from './noteConstants'

const initialState = {
  notes: '',
  searchText: '',
  loading: false,
  error: null,
  categories: ''
}

const noteReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_NOTES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      }
    case GET_NOTES_SUCCESS:
      return {
        ...state,
        loading: false,
        notes: [...payload]
      }
    case GET_NOTES_FAILURE:
      return {
        ...state,
        loading: false,
        error: [payload.error],
        notes: []
      }
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
    case GET_CATEGORIES:
      return {
        ...state,
        categories: payload
      }
    case INCREMENT_CATEGORY_COUNT:
      return {
        ...state,
        categories: {
          ...state.categories[payload]++
        }
      }
    case FILTER_BY_TITLE:
      return
    default:
      return state
  }
}

export default noteReducer
