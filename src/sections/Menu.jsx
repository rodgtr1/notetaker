import React, { Component } from 'react'
import { Layout, Menu, Badge, Modal } from 'antd'
import Profile from '../components/Profile'
import { connect } from 'react-redux'
import capitalize from '../helpers/capitalize'
import { filterByCategory, resetFilter } from '../redux/note/noteActions'

import {
  ClearOutlined,
  TagsOutlined,
  BarsOutlined,
  BgColorsOutlined,
  PlusOutlined
} from '@ant-design/icons'

const { Sider } = Layout
const { SubMenu } = Menu

class MenuSection extends Component {
  state = {
    collapsed: false,
    categories: {},
    isModalVisible: false
  }

  onCollapse = collapsed => {
    this.setState({ collapsed })
  }

  handleOk = () => {
    this.setState({ isModalVisible: false })
  }

  handleCancel = () => {
    this.setState({ isModalVisible: false })
  }

  showCategoryModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible })
  }

  componentDidMount() {
    document
      .getElementById('tags-plus')
      .addEventListener('click', this.showCategoryModal)
  }

  componentWillUnmount() {
    document
      .getElementById('tags-plus')
      .removeEventListener('click', this.showCategoryModal)
  }

  render() {
    const { collapsed } = this.state
    const { isModalVisible } = this.state
    const categories = this.props.categories

    return (
      <Sider
        className='notes-menu'
        collapsible
        collapsed={collapsed}
        onCollapse={this.onCollapse}
        style={{ padding: '20px 0' }}
      >
        <Profile />
        <Modal
          title='Basic Modal'
          visible={isModalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
        <Menu
          inlineIndent={20}
          className='notes-options'
          theme='dark'
          defaultOpenKeys={['sub1']}
          mode='inline'
        >
          <SubMenu key='sub1' title='CATEGORIES'>
            {categories ? (
              categories.map((category, index) => (
                <Menu.Item
                  onClick={() => this.props.filterByCategory(category[0])}
                  key={index}
                >
                  {capitalize(category[0])}
                  <span>
                    <Badge count={category[1]} className='site-badge-count-4' />
                  </span>
                </Menu.Item>
              ))
            ) : (
              <Menu.Item key={1}>No Categories</Menu.Item>
            )}
          </SubMenu>
          <span>
            <PlusOutlined id='tags-plus' />
          </span>
          <SubMenu key='sub2' title='TAGS'>
            <Menu.Item key='4'>Team 1</Menu.Item>
            <Menu.Item key='5'>Team 2</Menu.Item>
          </SubMenu>
          <SubMenu key='sub3' title='COLORS'>
            <Menu.Item key='6'>Team 1</Menu.Item>
            <Menu.Item key='7'>Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key='8' icon={<ClearOutlined />}>
            <span onClick={() => this.props.resetFilter()}>Reset</span>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }
}

function mapStateToProps(state, dispatch) {
  const categories = Object.entries(state.note.categories)
    ? Object.entries(state.note.categories)
    : null
  return { categories: categories }
}

const mapDispatchToProps = dispatch => {
  return {
    filterByCategory: category => {
      dispatch(filterByCategory(category))
    },
    resetFilter: () => dispatch(resetFilter())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuSection)
// export default MenuSection
