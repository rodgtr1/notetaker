import React, { Component } from 'react'
import { Tag, Input } from 'antd'
import { TweenOneGroup } from 'rc-tween-one'
import { PlusOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { addCategory, deleteCategory } from '../redux/note/noteActions'

class CategoryManagement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tags: this.props.categoryKeys,
      inputVisible: false,
      inputValue: ''
    }
  }

  handleClose = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag)
    this.setState({ tags })
    this.props.deleteCategory(removedTag)
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus())
  }

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value })
  }

  handleInputConfirm = () => {
    const { inputValue } = this.state
    let { tags } = this.state
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue]
      this.props.addCategory(inputValue)
    }
    this.setState({
      tags,
      inputVisible: false,
      inputValue: ''
    })
  }

  saveInputRef = input => {
    this.input = input
  }

  forMap = tag => {
    const tagElem = (
      <Tag
        closable
        onClose={e => {
          e.preventDefault()
          this.handleClose(tag)
        }}
      >
        {tag}
      </Tag>
    )
    return (
      <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
    )
  }

  render() {
    const { tags, inputVisible, inputValue } = this.state
    const tagChild = tags.map(this.forMap)
    return (
      <>
        <div style={{ marginBottom: 16 }}>
          <TweenOneGroup
            enter={{
              scale: 0.8,
              opacity: 0,
              type: 'from',
              duration: 100,
              onComplete: e => {
                e.target.style = ''
              }
            }}
            leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
            appear={false}
          >
            {tagChild}
          </TweenOneGroup>
        </div>
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type='text'
            size='small'
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag onClick={this.showInput} className='site-tag-plus'>
            <PlusOutlined /> New Tag
          </Tag>
        )}
      </>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addCategory: category => {
      dispatch(addCategory(category))
    },
    deleteCategory: category => {
      dispatch(deleteCategory(category))
    }
  }
}

const mapStateToProps = state => {
  const categories = state.note.categories
    ? Object.entries(state.note.categories)
    : null
  const categoryKeys = state.note.categories
    ? Object.keys(state.note.categories)
    : null
  return {
    categories: categories,
    categoryKeys: categoryKeys
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryManagement)
