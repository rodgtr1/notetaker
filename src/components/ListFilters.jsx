import React from 'react'
import {
  FilterOutlined,
  EllipsisOutlined,
  TagOutlined
} from '@ant-design/icons'

const ListFilters = () => {
  return (
    <>
      <div className='list-filters'>
        <div className='list-filters__count'>42 Notes</div>
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
