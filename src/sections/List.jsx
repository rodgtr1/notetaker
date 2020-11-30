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
  getNotesFailure
} from '../redux/note/noteActions'

const { Title } = Typography

const ListSection = () => {
  const { notes } = useSelector(state => state.note)
  const loading = useSelector(state => state.loading)
  const dispatch = useDispatch()

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
        console.log(arrayData)
        dispatch(getNotesSuccess(arrayData))
        //setNotes(arrayData)
      } catch (err) {
        dispatch(getNotesFailure(err))
        console.log(err)
      }
    }
    fetchNotes()
  }, [])

  return (
    <Col span={8} className='section-wrapper notes-list'>
      <Title className='category-large' level={3} style={{ padding: '0 20px' }}>
        General
      </Title>
      <ListFilters />
      <Search />
      <AddNote />
      {notes ? (
        notes.map((note, index) => <ListItem key={index} {...note} />)
      ) : (
        <NotesSkeleton />
      )}
    </Col>
  )
}

export default ListSection
