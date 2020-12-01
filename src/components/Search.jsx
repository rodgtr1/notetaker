import React from 'react'
import { Input } from 'antd'
import { useDispatch } from 'react-redux'
import { filterByTitle } from '../redux/note/noteActions'

const Search = () => {
  const dispatch = useDispatch()
  return (
    <div className='search'>
      <Input onChange={e => {
        e.preventDefault()
        dispatch(filterByTitle({value: e.target.value}))
        }} placeholder='Search notes...' size='large' />
    </div>
  )
}

export default Search
