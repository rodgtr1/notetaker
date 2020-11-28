import React from 'react'
import { Col } from 'antd'
import { Typography } from 'antd'
import Search from '../components/Search'
import AddNote from '../components/AddNote'
import ListFilters from '../components/ListFilters'
import ListItem from '../components/ListItem'
import { sampleData } from '../sampleData'

const { Title } = Typography

const ListSection = () => {
  const notesList = sampleData.map(note => (
    <ListItem key={note.id} note={note} />
  ))
  return (
    <Col span={8} className='section-wrapper notes-list'>
      <Title className='category-large' level={3} style={{ padding: '0 20px' }}>
        General
      </Title>
      <ListFilters />
      <Search />
      <AddNote />
      {notesList}
    </Col>
  )
}

export default ListSection
