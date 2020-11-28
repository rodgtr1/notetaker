import React from 'react'
import { Typography } from 'antd'
const { Text } = Typography

const ListItem = () => {
  return (
    <div className='list-item'>
      <div className='list-item__meta'>
        <div className='list-item__category'>
          <span className='list-item__category--color'></span>
          <span className='list-item__category--title'>General</span>
        </div>
        <div className='list-item__date'>01/11/2021</div>
      </div>
      <Text className='list-item__title subtitle' strong>
        A Trip To East Europe
      </Text>
      <div className='list-item__preview'>
        Morte ipsum dolor sit amet, sanctus iudicabit mei ad. Dissentias
        persequeris ei mei.
      </div>
    </div>
  )
}

export default ListItem
