import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Col } from 'antd'
import { Typography } from 'antd'
import Search from '../components/Search'
import AddNote from '../components/AddNote'
import ListFilters from '../components/ListFilters'
import ListItem from '../components/ListItem'
import firebase from '../config/firestore'

const { Title } = Typography

const ListSection = () => {
  const [notes, setNotes] = useState('')

  useEffect(() => {
    const fetchNotes = async () => {
      const db = firebase.firestore()
      try {
        const data = await db.collection('notes').get()
        const arrayData = data.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        console.log(arrayData)
        setNotes(arrayData)
        //dispatch(showNotes(arrayData))
      } catch (err) {
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
      {notes
        ? notes.map(note => <ListItem key={note.id} note={note} />)
        : 'Create your first note!'}
    </Col>
  )
}

export default ListSection
