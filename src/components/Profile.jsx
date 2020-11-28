import React from 'react'
import { Avatar, Image } from 'antd'
import { EllipsisOutlined } from '@ant-design/icons'

const Profile = () => {
  return (
    <div className='profile'>
      <div className='profile__user'>
        <Avatar
          src={
            <Image
              src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
              style={{ height: '10px', width: '10px' }}
            />
          }
        />
        <div>Travis Rodgers</div>
      </div>
      <div className='profile__options'>
        <div>
          <EllipsisOutlined
            rotate={90}
            style={{ fontSize: '16px', fontWeight: 'bold' }}
          />
        </div>
      </div>
    </div>
  )
}

export default Profile
