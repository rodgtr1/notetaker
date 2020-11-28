import {
  SHOW_NOTES,
  SELECT_NOTE,
  ADD_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
  FILTER_BY_TITLE
} from './noteConstants'

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

export const filterByTitle = payload => {
  return {
    type: FILTER_BY_TITLE,
    payload: payload
  }
}
