import React from 'react'
import { Col } from 'antd'
import Editor from '../components/TextEditor'

const BodySection = () => {
  return (
    <Col span={16} className='section-wrapper notes-body'>
      <Editor />
    </Col>
  )
}

export default BodySection
