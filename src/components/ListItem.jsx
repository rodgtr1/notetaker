import React from 'react'
import { Typography } from 'antd'
const { Text } = Typography

const ListItem = ({ note }) => {
  let x = String(note.date.toDate())
  return (
    <div className='list-item'>
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
        <div className='list-item__date'>{x}</div>
      </div>
      <Text className='list-item__title subtitle' strong>
        {note.title}
      </Text>
      <div className='list-item__preview'>{note.description.substr(0, 90)}</div>
    </div>
  )
}

export default ListItem
