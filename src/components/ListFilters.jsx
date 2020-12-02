import React from 'react'
import {useSelector} from 'react-redux'
import {
  FilterOutlined,
  EllipsisOutlined,
  TagOutlined
} from '@ant-design/icons'

const ListFilters = () => {
  const { notes } = useSelector(state => state.note)
  return (
    <>
      <div className='list-filters'>
        <div className='list-filters__count'>{notes.length} Notes</div>
        <div className='list-filters__icons'>
          <FilterOutlined />
          <TagOutlined />
          <EllipsisOutlined rotate={90} />
        </div>
      </div>
    </>
  )
}

export default ListFilters
