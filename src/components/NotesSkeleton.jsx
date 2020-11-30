import { Skeleton } from 'antd'

import React from 'react'

const NotesSkeleton = () => {
  return(
  <>
  <div className='list-item'>
      <Skeleton active paragraph={{ rows: 1 }}/>
    </div>
    <div className='list-item'>
      <Skeleton active paragraph={{ rows: 1 }}/>
    </div>
    <div className='list-item'>
      <Skeleton active paragraph={{ rows: 1 }}/>
    </div>
    <div className='list-item'>
      <Skeleton active paragraph={{ rows: 1 }}/>
    </div>
    <div className='list-item'>
      <Skeleton active paragraph={{ rows: 1 }}/>
    </div>
    <div className='list-item'>
      <Skeleton active paragraph={{ rows: 1 }}/>
    </div>
    <div className='list-item'>
      <Skeleton active paragraph={{ rows: 1 }}/>
    </div>
  </>)
}

export default NotesSkeleton
