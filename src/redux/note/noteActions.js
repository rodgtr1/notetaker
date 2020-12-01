import {
  GET_NOTES_BEGIN,
  GET_NOTES_SUCCESS,
  GET_NOTES_FAILURE,
  SHOW_NOTES,
  SELECT_NOTE,
  ADD_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
  GET_CATEGORIES,
  INCREMENT_CATEGORY_COUNT,
  FILTER_BY_TITLE,
  FILTER_BY_CATEGORY
} from './noteConstants'

export const getNotesBegin = () => {
  return {
    type: GET_NOTES_BEGIN
  }
}
export const getNotesSuccess = note => {
  return {
    type: GET_NOTES_SUCCESS,
    payload: note
  }
}
export const getNotesFailure = error => {
  return {
    type: GET_NOTES_FAILURE,
    payload: error
  }
}
export const showNotes = note => {
  return {
    type: SHOW_NOTES,
    payload: note
  }
}

export const selectNote = note => {
  return {
    type: SELECT_NOTE,
    payload: note
  }
}

export const addNote = note => {
  return {
    type: ADD_NOTE,
    payload: note
  }
}

export const updateNote = note => {
  return {
    type: UPDATE_NOTE,
    payload: note
  }
}

export const deleteNote = noteId => {
  return {
    type: DELETE_NOTE,
    payload: noteId
  }
}

export const getCategories = categories => {
  return {
    type: GET_CATEGORIES,
    payload: categories
  }
}

export const incrementCategoryCount = category => {
  return {
    type: INCREMENT_CATEGORY_COUNT,
    payload: category
  }
}

export const filterByTitle = payload => {
  return {
    type: FILTER_BY_TITLE,
    payload: payload
  }
}

export const filterByCategory = payload => {
  return {
    type: FILTER_BY_CATEGORY,
    payload: payload
  }
}
