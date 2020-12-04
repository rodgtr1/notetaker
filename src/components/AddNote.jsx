import React from 'react'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { addNote, resetFilter } from '../redux/note/noteActions'
import firebase from '../config/firestore'

const AddNote = () => {
  const dispatch = useDispatch()

  const initialValues = {
    category: 'general',
    categoryColor: 'black',
    date: firebase.firestore.Timestamp.fromDate(new Date()),
    selected: 'false',
    title: 'Enter Title',
    description: 'Enter text...'
  }

  const addNoteHandler = async () => {
    const db = firebase.firestore()
    try {
      const collection = db.collection('notes')
      await collection.add({ ...initialValues })
      dispatch(resetFilter())
      dispatch(addNote(initialValues))
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
