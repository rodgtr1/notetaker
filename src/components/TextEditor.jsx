import React from 'react'
import { connect } from 'react-redux'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import PropTypes from 'prop-types'
import { Typography, Select } from 'antd'
import EditableTitle from '../components/EditableTitle'
import randomKeyGenerator from '../helpers/randomKeyGenerator'
import { Skeleton } from 'antd'
import {
  updateNoteDescription,
  changeCategoryColor,
  changeCategory
} from '../redux/note/noteActions'
import firebase from '../config/firestore'
import capitalize from '../helpers/capitalize'

const { Title } = Typography
const { Option } = Select

// Add sizes to whitelist and register them
const Size = Quill.import('formats/size')
Size.whitelist = ['extra-small', 'small', 'medium', 'large']
Quill.register(Size, true)

const Blockquote = Quill.import('formats/blockquote')
Quill.register(Blockquote, true)

const Codeblock = Quill.import('formats/code-block')
Quill.register(Codeblock, true)

const List = Quill.import('formats/list')
Quill.register(List, true)

const Underline = Quill.import('formats/underline')
Quill.register(Underline, true)

const Link = Quill.import('formats/link')
Quill.register(Link, true)

const Image = Quill.import('formats/image')
Quill.register(Image, true)

const Video = Quill.import('formats/video')
Quill.register(Video, true)

const Align = Quill.import('formats/align')
Quill.register(Align, true)

// Add fonts to whitelist and register them
const Font = Quill.import('formats/font')
Font.whitelist = [
  'arial',
  'comic-sans',
  'courier-new',
  'georgia',
  'helvetica',
  'lucida'
]
Quill.register(Font, true)

const WAIT_INTERVAL = 2000

class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = { editorHtml: '', visible: false }
    this.handleChange = this.handleChange.bind(this)
    this.handleCategoryColorChange = this.handleCategoryColorChange.bind(this)
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
  }

  // TODO add state begin, success, and failure, in class component
  updateNote = async () => {
    const db = firebase.firestore()
    if (this.props.selectedNote) {
      const note = this.props.selectedNote
      try {
        await db
          .collection('notes')
          .doc(note.id)
          .set({
            category: note.category,
            categoryColor: note.categoryColor,
            date: firebase.firestore.Timestamp.fromDate(new Date()),
            selected: false,
            title: note.title,
            description: note.description
          })
        // await dispatch(getNotesSuccess(arrayData))
        // await combineCategories(arrayData)
      } catch (err) {
        // dispatch(getNotesFailure())
        console.log(err)
      }
    } else if (this.props.notes) {
      const note = this.props.notes[0]
      try {
        await db
          .collection('notes')
          .doc(note.id)
          .set({
            category: note.category,
            categoryColor: note.categoryColor,
            date: firebase.firestore.Timestamp.fromDate(new Date()),
            selected: false,
            title: note.title,
            description: note.description
          })
        // await dispatch(getNotesSuccess(arrayData))
        // await combineCategories(arrayData)
      } catch (err) {
        // dispatch(getNotesFailure())
        console.log(err)
      }
    }
  }

  handleChange(html) {
    clearTimeout(this.timer)

    if (this.props.selectedNote) {
      this.props.updateNoteDescription({
        id: this.props.selectedNote.id,
        description: html
      })
    } else if (this.props.notes) {
      this.props.updateNoteDescription({
        id: this.props.notes[0].id,
        description: html
      })
    }

    this.timer = setTimeout(this.updateNote.bind(this), WAIT_INTERVAL)
  }

  triggerChange() {
    console.log('two seconds passed')
    this.updateNote()
  }

  handleMenuClick = e => {
    if (e.key === '3') {
      this.setState({ visible: false })
    }
  }

  // TODO send category color update to firestore
  handleCategoryColorChange(value) {
    document.querySelector(
      '#ql-category .ant-select'
    ).style.backgroundColor = value
    if (this.props.selectedNote) {
      this.props.changeCategoryColor({
        id: this.props.selectedNote.id,
        categoryColor: value
      })
    } else if (this.props.notes) {
      this.props.changeCategoryColor({
        id: this.props.notes[0].id,
        categoryColor: value
      })
    }
  }

  handleCategoryChange(value) {
    if (this.props.selectedNote) {
      this.props.changeCategory({
        id: this.props.selectedNote.id,
        category: value
      })
    } else if (this.props.notes) {
      this.props.changeCategory({
        id: this.props.notes[0].id,
        category: value
      })
    }
  }

  handleVisibleChange = flag => {
    this.setState({ visible: flag })
  }

  render() {
    const colors = ['red', 'blue', 'black', 'yellow', 'orange', 'green']
    const categories = this.props.categories
    return (
      <div className='text-editor'>
        <div id='toolbar'>
          <span id='ql-category' className='ql-formats ql-categoryColor'>
            <Select
              defaultValue=''
              className='ql-category__option'
              onChange={this.handleCategoryColorChange}
              style={
                this.props.selectedNote
                  ? { background: this.props.selectedNote.categoryColor }
                  : this.props.notes[0]
                  ? { background: this.props.notes[0].categoryColor }
                  : { background: 'black' }
              }
            >
              {colors.map((color, i) => {
                return (
                  <Option
                    key={i}
                    className='ql-category__option'
                    style={{ background: color }}
                    value={color}
                  ></Option>
                )
              })}
            </Select>
          </span>
          <span id='ql-category2'>
            <Select
              value={
                this.props.selectedNote
                  ? capitalize(this.props.selectedNote.category)
                  : this.props.notes[0]
                  ? capitalize(this.props.notes[0].category)
                  : 'None'
              }
              style={{ float: 'left' }}
              onChange={this.handleCategoryChange}
            >
              {categories ? (
                categories.map((category, index) => (
                  <Option key={index} value={category}>
                    {category}
                  </Option>
                ))
              ) : (
                <Option value='empty'>None</Option>
              )}
            </Select>
          </span>
          <select
            className='ql-header'
            defaultValue={''}
            onChange={e => e.persist()}
          >
            <option value='1' />
            <option value='2' />
            <option defaultValue />
          </select>
          <span className='ql-formats'>
            <button className='ql-bold' />
            <button className='ql-italic' />
            <button className='ql-underline' />
            <button className='ql-blockquote' />
            <button className='ql-code-block' />
          </span>
          <span className='ql-formats'>
            <select className='ql-color'>
              <option value='red' />
              <option value='green' />
              <option value='blue' />
              <option value='orange' />
              <option value='violet' />
              <option value='#d0d1d2' />
              <option defaultValue />
            </select>
          </span>
          <span className='ql-formats'>
            <button className='ql-list' value='ordered' />
            <button className='ql-list' value='bullet' />
            <select className='ql-align'></select>
          </span>
          <span className='ql-formats'>
            <button className='ql-link' />
            <button className='ql-image' />
            <button className='ql-video' />
          </span>
          <Title level={3} className='note-title subtitle'>
            <EditableTitle
              key={randomKeyGenerator()}
              value={
                this.props.selectedNote ? (
                  this.props.selectedNote.title
                ) : this.props.notes ? (
                  this.props.notes[0].title
                ) : (
                  <Skeleton active paragraph={{ rows: 7 }} />
                )
              }
            />
          </Title>
        </div>
        <ReactQuill
          onChange={this.handleChange}
          placeholder={this.props.placeholder}
          modules={Editor.modules}
          formats={Editor.formats}
          // value={this.state.editorHtml}
          value={
            this.props.selectedNote
              ? this.props.selectedNote.description
              : this.props.notes
              ? this.props.notes[0].description
              : ''
          }
          theme={'snow'} // pass false to use minimal theme
        />
      </div>
    )
  }
}

Editor.modules = {
  toolbar: {
    container: '#toolbar',
    handlers: {
      //insertStar: insertStar
    }
  },
  clipboard: {
    matchVisual: false
  }
}

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'color',
  'align',
  'code-block',
  'video'
]

/*
 * PropType validation
 */
Editor.propTypes = {
  placeholder: PropTypes.string
}

function mapStateToProps(state) {
  const { notes } = state.note
  const selectedNote = notes && notes.filter(note => note.selected === true)
  const categories = Object.entries(state.note.categories)
    ? Object.keys(state.note.categories)
    : null
  return {
    notes: notes,
    selectedNote: selectedNote ? selectedNote[0] : null,
    categories: categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeCategoryColor: value => {
      dispatch(changeCategoryColor(value))
    },
    changeCategory: value => {
      dispatch(changeCategory(value))
    },
    updateNoteDescription: note => {
      dispatch(updateNoteDescription(note))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
