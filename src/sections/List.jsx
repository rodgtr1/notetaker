import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Col } from 'antd'
import { Typography } from 'antd'
import Search from '../components/Search'
import AddNote from '../components/AddNote'
import ListFilters from '../components/ListFilters'
import ListItem from '../components/ListItem'
import firebase from '../config/firestore'
import NotesSkeleton from '../components/NotesSkeleton'

import {
  getNotesBegin,
  getNotesSuccess,
  getNotesFailure,
  getCategories
} from '../redux/note/noteActions'
import capitalize from '../helpers/capitalize'

const { Title } = Typography

const ListSection = () => {
  const { notes } = useSelector(state => state.note)
  const searchText = useSelector(state => state.note.searchText)
  const filteredCategory = useSelector(state => state.note.filteredCategory)
  const selectedNote = Object.values(notes).filter(
    note => note.selected === true
  )

  const dispatch = useDispatch()

  const combineCategories = array => {
    const categories = {}
    array.forEach(element => {
      if (!Object.keys(categories).length) {
        categories[element.category] = 1
      } else {
        if (element.category in categories) {
          categories[element.category] += 1
        } else {
          categories[element.category] = 1
        }
      }
    })
    dispatch(getCategories(categories))
  }

  useEffect(() => {
    const fetchNotes = async () => {
      const db = firebase.firestore()
      dispatch(getNotesBegin())
      try {
        const data = await db.collection('notes').get()
        const arrayData = data.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        await dispatch(getNotesSuccess(arrayData))
        await combineCategories(arrayData)
      } catch (err) {
        dispatch(getNotesFailure())
        console.log(err)
      }
    }
    fetchNotes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const fetchNotes = async () => {
      const db = firebase.firestore()
      dispatch(getNotesBegin())
      try {
        const data = await db.collection('notes').get()
        const arrayData = data.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        await dispatch(getNotesSuccess(arrayData))
        await combineCategories(arrayData)
      } catch (err) {
        dispatch(getNotesFailure())
        console.log(err)
      }
    }
    fetchNotes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notes.length])

  useEffect(() => {}, [filteredCategory])

  return (
    <Col span={8} className='section-wrapper notes-list'>
      <Title className='category-large' level={3} style={{ padding: '0 20px' }}>
        {selectedNote && selectedNote.length
          ? capitalize(selectedNote[0].category)
          : notes[0]
          ? capitalize(notes[0].category)
          : ''}
      </Title>
      <ListFilters />
      <Search />
      <AddNote />
      {notes ? (
        notes
          .sort((a, b) => (a.date < b.date ? 1 : -1))
          .map(
            (note, index) =>
              (searchText === 0 || note.title.includes(searchText)) &&
              (!filteredCategory || note.category === filteredCategory) && (
                <ListItem key={index} {...note} />
              )
          )
      ) : (
        <NotesSkeleton />
      )}
    </Col>
  )
}

export default ListSection
