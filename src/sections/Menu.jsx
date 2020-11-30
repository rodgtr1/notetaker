import React, { Component } from 'react'
import { Layout, Menu } from 'antd'
import Profile from '../components/Profile'
import {connect} from 'react-redux'
import capitalize from '../utils/capitalize'

import {
  FileOutlined,
  TagsOutlined,
  BarsOutlined,
  BgColorsOutlined
} from '@ant-design/icons'

const { Sider } = Layout
const { SubMenu } = Menu

class MenuSection extends Component {

  state = {
    collapsed: false
  }

  onCollapse = collapsed => {
    console.log(collapsed)
    this.setState({ collapsed })
  }

  render() {
    // const categories = this.props.categories
    const { collapsed } = this.state
    return (
      <Sider
        className='notes-menu'
        collapsible
        collapsed={collapsed}
        onCollapse={this.onCollapse}
        style={{ padding: '20px 0' }}
      >
        <Profile />
        <Menu
          inlineIndent={20}
          className='notes-options'
          theme='dark'
          defaultOpenKeys={['sub1']}
          mode='inline'
        >
          <SubMenu key='sub1' icon={<BarsOutlined />} title='CATEGORIES'>
            {/* {categories
            ? categories.map((category, index) => <Menu.Item key={index}>{capitalize(category)}</Menu.Item>) : 'No Categories'
            } */}
          </SubMenu>
          <SubMenu key='sub2' icon={<TagsOutlined />} title='TAGS'>
            <Menu.Item key='4'>Team 1</Menu.Item>
            <Menu.Item key='5'>Team 2</Menu.Item>
          </SubMenu>
          <SubMenu key='sub3' icon={<BgColorsOutlined />} title='COLORS'>
            <Menu.Item key='6'>Team 1</Menu.Item>
            <Menu.Item key='7'>Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key='8' icon={<FileOutlined />}>
            Files
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }
}

function mapStateToProps(state) {
  const { notes } = state.note
  const categories = {}
  notes.forEach((element, index) => {
    categories[element.category] = 1
  });
  console.log(categories)
  // const categories = notes && notes.map(note => note.category)
  return { categories: categories ? categories : null }
}

export default connect(mapStateToProps)(MenuSection)
