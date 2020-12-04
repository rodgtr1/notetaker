import React from 'react'
import { connect } from 'react-redux'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import PropTypes from 'prop-types'
import { Typography, Select } from 'antd'
import EditableTitle from '../components/EditableTitle'
import randomKeyGenerator from '../helpers/randomKeyGenerator'
import { Skeleton } from 'antd'
import { DeleteFilled } from '@ant-design/icons'
import {
  updateNoteDescription,
  updateNoteTitle,
  changeCategoryColor,
  changeCategory,
  deleteNote,
  incrementCategoryCount,
  decrementCategoryCount
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
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleCategoryColorChange = this.handleCategoryColorChange.bind(this)
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
  }

  updateNote = async (cat = null, catColor = null, value = null) => {
    const db = firebase.firestore()
    if (this.props.selectedNote) {
      const note = this.props.selectedNote
      const category = cat !== null ? value : note.category
      const categoryColor = catColor !== null ? value : note.categoryColor

      console.log('category is ' + category)
      console.log('categoryColor is ' + categoryColor)
      try {
        await db
          .collection('notes')
          .doc(note.id)
          .set({
            category: category,
            categoryColor: categoryColor,
            date: firebase.firestore.Timestamp.fromDate(new Date()),
            selected: false,
            title: note.title,
            description: note.description
          })
      } catch (err) {
        console.log(err)
      }
    } else if (this.props.notes) {
      const note = this.props.notes[0]
      const category = cat ? value : note.category
      const categoryColor = catColor ? value : note.categoryColor
      try {
        await db
          .collection('notes')
          .doc(note.id)
          .set({
            category: category,
            categoryColor: categoryColor,
            date: firebase.firestore.Timestamp.fromDate(new Date()),
            selected: false,
            title: note.title,
            description: note.description
          })
      } catch (err) {
        console.log(err)
      }
    }
  }

  deleteNote = async () => {
    const db = firebase.firestore()
    if (this.props.selectedNote) {
      const note = this.props.selectedNote
      try {
        await db.collection('notes').doc(note.id).delete()
        await this.props.deleteNote(note.id)
      } catch (err) {
        console.log(err)
      }
    } else if (this.props.notes) {
      const note = this.props.notes[0]
      try {
        await db.collection('notes').doc(note.id).delete()
        await this.props.deleteNote(note.id)
      } catch (err) {
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

  handleTitleChange(e) {
    //clearTimeout(this.timer)
    if (this.props.selectedNote) {
      this.props.updateNoteTitle({
        id: this.props.selectedNote.id,
        title: e.target.value
      })
    } else if (this.props.notes) {
      this.props.updateNoteTitle({
        id: this.props.notes[0].id,
        title: e.target.value
      })
    }
  }

  triggerChange() {
    this.updateNote()
  }

  handleMenuClick = e => {
    if (e.key === '3') {
      this.setState({ visible: false })
    }
  }

  handleCategoryColorChange(value) {
    document.querySelector(
      '#ql-category .ant-select'
    ).style.backgroundColor = value
    if (this.props.selectedNote) {
      this.props.changeCategoryColor({
        id: this.props.selectedNote.id,
        categoryColor: value
      })
      this.updateNote(null, 'categoryColor', value)
    } else if (this.props.notes) {
      this.props.changeCategoryColor({
        id: this.props.notes[0].id,
        categoryColor: value
      })
      this.updateNote(null, 'categoryColor', value)
    }
  }

  handleCategoryChange(value) {
    if (this.props.selectedNote) {
      this.props.decrementCategoryCount(this.props.selectedNote.category)
      this.props.changeCategory({
        id: this.props.selectedNote.id,
        category: value
      })
      this.updateNote('category', null, value)
      this.props.incrementCategoryCount(value)
    } else if (this.props.notes) {
      this.props.decrementCategoryCount(this.props.notes[0].category)
      this.props.changeCategory({
        id: this.props.notes[0].id,
        category: value
      })
      this.updateNote('category', null, value)
      this.props.incrementCategoryCount(value)
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
            {/* <button className='ql-blockquote' /> */}
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
          <span className='ql-formats'>
            <DeleteFilled
              onClick={this.deleteNote}
              style={{ color: '#ea1e1e', fontSize: '16px' }}
            />
          </span>
        </div>
        <Title
          level={3}
          style={{ textAlign: 'center', paddingTop: '20px' }}
          className='note-title subtitle'
        >
          <EditableTitle
            key={randomKeyGenerator()}
            titleChange={this.handleTitleChange}
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
        <ReactQuill
          onChange={this.handleChange}
          placeholder={this.props.placeholder}
          modules={Editor.modules}
          formats={Editor.formats}
          value={
            this.props.selectedNote
              ? this.props.selectedNote.description
              : this.props.notes
              ? this.props.notes[0].description
              : ''
          }
          theme={'snow'}
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
    },
    updateNoteTitle: note => {
      dispatch(updateNoteTitle(note))
    },
    deleteNote: noteId => {
      dispatch(deleteNote(noteId))
    },
    incrementCategoryCount: category => {
      dispatch(incrementCategoryCount(category))
    },
    decrementCategoryCount: category => {
      dispatch(decrementCategoryCount(category))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
