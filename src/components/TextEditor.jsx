import React from 'react'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import PropTypes from 'prop-types'
import { Menu, Dropdown, Typography } from 'antd'
import EditableTitle from '../components/EditableTitle'

const { Title } = Typography

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

class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = { editorHtml: '', visible: false }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(html) {
    this.setState({ editorHtml: html })
  }

  handleMenuClick = e => {
    if (e.key === '3') {
      this.setState({ visible: false })
    }
  }

  handleVisibleChange = flag => {
    this.setState({ visible: flag })
  }

  render() {
    return (
      <div className='text-editor'>
        <div id='toolbar'>
          <button className='ql-categoryColor'>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key='0'>
                    <a href='http://www.alipay.com/'>1st menu item</a>
                  </Menu.Item>
                  <Menu.Item key='1'>
                    <a href='http://www.taobao.com/'>2nd menu item</a>
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item key='3'>3rd menu item</Menu.Item>
                </Menu>
              }
              trigger={['click']}
            >
              <a
                className='ant-dropdown-link'
                onClick={e => e.preventDefault()}
              >
                <span className='ql-category'></span>
              </a>
            </Dropdown>
          </button>
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
            <EditableTitle />
          </Title>
        </div>
        <ReactQuill
          onChange={this.handleChange}
          placeholder={this.props.placeholder}
          modules={Editor.modules}
          formats={Editor.formats}
          value={this.state.editorHtml}
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

export default Editor
