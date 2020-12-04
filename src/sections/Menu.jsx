import React, { Component } from 'react'
import { Layout, Menu, Badge, Modal } from 'antd'
import Profile from '../components/Profile'
import { connect } from 'react-redux'
import capitalize from '../helpers/capitalize'
import { filterByCategory, resetFilter } from '../redux/note/noteActions'

import { ClearOutlined, PlusOutlined } from '@ant-design/icons'
import CategoryManagement from '../components/CategoryManagement'

const { Sider } = Layout
const { SubMenu } = Menu

class MenuSection extends Component {
  state = {
    collapsed: false,
    categories: {},
    isCategoriesModalVisible: false
  }

  onCollapse = collapsed => {
    this.setState({ collapsed })
  }

  handleCategoriesOk = () => {
    this.setState({ isCategoriesModalVisible: false })
  }

  handleCategoriesCancel = () => {
    this.setState({ isCategoriesModalVisible: false })
  }

  showCategoriesModal = () => {
    this.setState({ isCategoriesModalVisible: !this.state.isTagsModalVisible })
  }

  componentDidMount() {
    document
      .getElementById('categories-plus')
      .addEventListener('click', this.showCategoriesModal)
  }

  componentWillUnmount() {
    document
      .getElementById('categories-plus')
      .removeEventListener('click', this.showCategoriesModal)
  }

  render() {
    const { collapsed } = this.state
    const { isTagsModalVisible } = this.state
    const { isCategoriesModalVisible } = this.state
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
          title='Tags'
          visible={isTagsModalVisible}
          onOk={this.handleTagsOk}
          onCancel={this.handleTagsCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
        <Modal
          title='Categories'
          visible={isCategoriesModalVisible}
          onOk={this.handleCategoriesOk}
          onCancel={this.handleCategoriesCancel}
        >
          <CategoryManagement />
        </Modal>
        <Menu
          inlineIndent={20}
          className='notes-options'
          theme='dark'
          defaultOpenKeys={['sub1']}
          mode='inline'
        >
          <span>
            <PlusOutlined id='categories-plus' />
          </span>
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
