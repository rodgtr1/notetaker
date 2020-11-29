import React, { useEffect } from 'react'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { addNote, showNotes } from '../redux/note/noteActions'
import firebase from '../config/firestore'

const AddNote = () => {
  const dispatch = useDispatch()
  const { notes } = useSelector(state => state.note)

  const initialValues = {
    category: 'general',
    categoryColor: 'black',
    date: firebase.firestore.Timestamp.fromDate(new Date()),
    selected: 'false',
    title: 'Enter Title',
    description: 'Enter text...'
  }

  useEffect(() => {
    const fetchNotes = async () => {
      const db = firebase.firestore()
      try {
        const data = await db.collection('notes').get()
        const arrayData = data.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        dispatch(showNotes(arrayData))
        // setNotes(arrayData)
      } catch (err) {
        console.log(err)
      }
    }
    fetchNotes()
  }, [notes.length])

  const addNoteHandler = async () => {
    const db = firebase.firestore()
    try {
      const collection = db.collection('notes')
      await collection.add({ ...initialValues })
      dispatch(addNote(initialValues))
      //setNotes(arrayData)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='add-note'>
      <Button
        onClick={addNoteHandler}
        type='primary'
        block
        icon={<PlusOutlined />}
      >
        ADD NOTE
      </Button>
    </div>
  )
}

export default AddNote
