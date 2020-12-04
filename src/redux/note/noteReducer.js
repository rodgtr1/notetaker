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
  ADD_CATEGORY,
  DELETE_CATEGORY,
  INCREMENT_CATEGORY_COUNT,
  DECREMENT_CATEGORY_COUNT,
  FILTER_BY_TITLE,
  FILTER_BY_CATEGORY,
  RESET_FILTER,
  CHANGE_CATEGORY_COLOR,
  CHANGE_CATEGORY,
  DELETE_NOTE
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
      return {
        ...state,
        notes: state.notes.map(note =>
          note.id === payload.id
            ? { ...note, title: payload.title }
            : { ...note }
        )
      }
    case UPDATE_NOTE_DESCRIPTION:
      return {
        ...state,
        notes: state.notes.map(note =>
          note.id === payload.id
            ? { ...note, description: payload.description }
            : { ...note }
        )
      }
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== payload)
      }
    case GET_CATEGORIES:
      return {
        ...state,
        categories: payload
      }
    case ADD_CATEGORY:
      return {
        ...state,
        categories: { ...state.categories, [payload]: 0 }
      }
    case DELETE_CATEGORY:
      return {
        ...state,
        notes: state.notes.map(note =>
          note.category === payload
            ? { ...note, category: 'general' }
            : { ...note }
        ),
        categories: Object.fromEntries(
          Object.entries(state.categories).filter(([key]) => key != payload)
        )
      }
    case INCREMENT_CATEGORY_COUNT:
      return {
        ...state,
        categories: {
          ...state.categories,
          [payload]: state.categories[payload] + 1
        }
      }
    case DECREMENT_CATEGORY_COUNT:
      return {
        ...state,
        categories: {
          ...state.categories,
          [payload]: state.categories[payload] - 1
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
    case CHANGE_CATEGORY_COLOR:
      return {
        ...state,
        notes: state.notes.map(note =>
          note.id === payload.id
            ? { ...note, categoryColor: payload.categoryColor }
            : { ...note }
        )
      }
    case CHANGE_CATEGORY:
      return {
        ...state,
        notes: state.notes.map(note =>
          note.id === payload.id
            ? { ...note, category: payload.category }
            : { ...note }
        )
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
