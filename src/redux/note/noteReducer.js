import {
  GET_NOTES_BEGIN,
  GET_NOTES_SUCCESS,
  GET_NOTES_FAILURE,
  UPDATE_NOTE_BEGIN,
  UPDATE_NOTE_SUCCESS,
  UPDATE_NOTE_FAILURE,
  SHOW_NOTES,
  SELECT_NOTE,
  UPDATE_NOTE_TITLE,
  UPDATE_NOTE_DESCRIPTION,
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
    case UPDATE_NOTE_BEGIN:
      return {
        // ...state,
        // loading: true,
        // error: null
      }
    case UPDATE_NOTE_SUCCESS:
      return {
        // ...state,
        // loading: false,
        // notes: [...payload]
      }
    case UPDATE_NOTE_FAILURE:
      return {
        // ...state,
        // loading: false,
        // error: [payload.error],
        // notes: []
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
    case UPDATE_NOTE_TITLE:
      console.log(payload)
      return
    case UPDATE_NOTE_DESCRIPTION:
      console.log(payload.description)
      return {
        ...state,
        notes: state.notes.map(note =>
          note.id === payload.id
            ? { ...note, description: payload.description }
            : { ...note }
        )
      }
      // return state.notes.map((note) => {
      //   if (note.id !== payload.id) {
      //     // This isn't the note we care about - keep it as-is
      //     return note
      //   }
    
      //   // Otherwise, this is the one we want - return an updated value
      //   return {
      //     ...note,
      //     ...payload
      //   }
      // })
    case GET_CATEGORIES:
      return {
        ...state,
        categories: payload
      }
    case INCREMENT_CATEGORY_COUNT:
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
