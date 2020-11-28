import React from 'react'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

const AddNote = () => {
  return (
    <div className='add-note'>
      <Button type='primary' block icon={<PlusOutlined />}>
        ADD NOTE
      </Button>
    </div>
  )
}

export default AddNote
