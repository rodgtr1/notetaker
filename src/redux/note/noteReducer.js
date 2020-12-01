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
  FILTER_BY_TITLE,
  FILTER_BY_CATEGORY,
  RESET_FILTER
} from './noteConstants'

const initialState = {
  notes: '',
  searchText: '',
  loading: false,
  error: null,
  categories: '',
  filteredCategory: ''
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
      for (const key in state.categories) {
        console.log(`${key} = ${state.categories[key]}`)
      }
      return {
        ...state,
        categories: {
          ...state.categories,
          [payload]: state.categories[payload] + 1
        }
      }
    case FILTER_BY_TITLE:
      return {
        ...state,
        notes: [...state.notes],
        searchText: payload.value
      }
    case FILTER_BY_CATEGORY:
      return {
        ...state,
        filteredCategory: payload
      }
    case RESET_FILTER:
      return {
        ...state,
        filteredCategory: ''
      }
    default:
      return state
  }
}

export default noteReducer
