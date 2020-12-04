import React, { useState } from 'react'
import { Typography } from 'antd'
import { useDispatch } from 'react-redux'
import { selectNote } from '../redux/note/noteActions'
const { Text } = Typography

const ListItem = (note, a) => {
  const dispatch = useDispatch()
  const timestamp = note.date.toDate()

  const formatDate = date => {
    const m = date.getMonth() + 1
    const d = date.getDate()
    const y = date.getFullYear()
    return String(`${m}/${d}/${y}`)
  }

  const handleSelectNote = () => {
    dispatch(selectNote(note))
  }
  return (
    <div
      className={`list-item ${note.selected ? 'active' : ''}`}
      onClick={() => handleSelectNote()}
      style={{ cursor: 'pointer' }}
    >
      <div className='list-item__meta'>
        <div className='list-item__category'>
          <span
            style={{ background: note.categoryColor }}
            className='list-item__category--color'
          ></span>
          <span className='list-item__category--title'>
            {note.category.toUpperCase()}
          </span>
        </div>
        <div className='list-item__date'>{formatDate(timestamp)}</div>
      </div>
      <Text className='list-item__title subtitle' strong>
        {note.title}
      </Text>
      <div className='list-item__preview'>
        {note.description.substr(0, 90).replace(/(<([^>]+)>)/gi, '')}
      </div>
    </div>
  )
}

export default ListItem
