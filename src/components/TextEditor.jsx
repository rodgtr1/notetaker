import React from 'react'
import { connect } from 'react-redux'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import PropTypes from 'prop-types'
import { Typography, Select } from 'antd'
import EditableTitle from '../components/EditableTitle'
import randomKeyGenerator from '../helpers/randomKeyGenerator'
import { Skeleton } from 'antd'
import { updateNoteDescription } from '../redux/note/noteActions'
import firebase from '../config/firestore'

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

const WAIT_INTERVAL = 10000;

class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = { editorHtml: '', visible: false }
    this.handleChange = this.handleChange.bind(this)
  }

  // handleChange(e, note) {
  //   console.log(note)
  //   //this.props.updateNoteDescription(this.props.note)
  //   // after 2 seconds stopping it updates in firebase
  //   //this.setState({ editorHtml: e })
  // }

  // TODO add state begin, success, and failure, in class component
  updateNote = async() => {
    const db = firebase.firestore()
    if (this.props.selectedNote) {
      const note = this.props.selectedNote
      try {
        await db.collection('notes').doc(note.id).set({
          category: note.category,
          categoryColor: note.categoryColor,
          date: firebase.firestore.Timestamp.fromDate(new Date()),
          selected: false,
          title: note.title,
          description: note.description,

        })
        console.log('updated selected note')
        // await dispatch(getNotesSuccess(arrayData))
        // await combineCategories(arrayData)
      } catch (err) {
        // dispatch(getNotesFailure())
        console.log(err)
      }
    } else if (this.props.notes) {
      const note = this.props.notes[0]
      try {
        await db.collection('notes').doc(note.id).set({
          category: note.category,
          categoryColor: note.categoryColor,
          date: firebase.firestore.Timestamp.fromDate(new Date()),
          selected: false,
          title: note.title,
          description: note.description,

        })
        console.log('updated initial note')
        // await dispatch(getNotesSuccess(arrayData))
        // await combineCategories(arrayData)
      } catch (err) {
        // dispatch(getNotesFailure())
        console.log(err)
      }
    }

  }


  handleChange (html) {
    clearTimeout(this.timer)

    if (this.props.selectedNote) {
      this.props.updateNoteDescription({id: this.props.selectedNote.id, description: html})
    } else if (this.props.notes) {
      this.props.updateNoteDescription({id: this.props.notes[0].id, description: html})
    }

    this.timer = setTimeout(this.updateNote.bind(this), WAIT_INTERVAL);
    
  }

  triggerChange() {
    console.log('two seconds passed');
    this.updateNote()
}

  handleMenuClick = e => {
    if (e.key === '3') {
      this.setState({ visible: false })
    }
  }

  handleSelectChange(value) {
    console.log(`selected ${value}`)
  }

  handleVisibleChange = flag => {
    this.setState({ visible: flag })
  }

  render() {
    const colors = ['red', 'blue', 'black', 'yellow', 'orange', 'green']
    return (
      <div className='text-editor'>
        <div id='toolbar'>
          <span className='ql-categoryColor'>
            <Select
              defaultValue=''
              className='ql-category__option'
              style={{ background: 'red' }}
              onChange={this.handleSelectChange}
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
          <select className='ql-font'>
            <option value='arial' defaultValue>
              Arial
            </option>
            <option value='comic-sans'>Comic Sans</option>
            <option value='courier-new'>Courier New</option>
            <option value='georgia'>Georgia</option>
            <option value='helvetica'>Helvetica</option>
            <option value='lucida'>Lucida</option>
          </select>
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
          // onChange={() => {
          //   this.props.selectedNote
          //     ? this.props.updateNoteDescription(this.props.selectedNote)
          //     : this.props.notes
          //     ? this.props.updateNoteDescription(this.props.notes[0].description)
          //     : console.log('nothing')

          //   // this.props.selectedNote 
          //   // ?
          //   // this.props.updateNoteDescription(this.props.selectedNote)
          //   // : console.log('no notes')
          // }}
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
          // value={this.state.editorHtml}
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
  return { notes: notes, selectedNote: selectedNote ? selectedNote[0] : null }
}

const mapDispatchToProps = dispatch => {
  return {
    updateNoteDescription: note => {
      dispatch(updateNoteDescription(note))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
