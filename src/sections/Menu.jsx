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
    isTagsModalVisible: false,
    isCategoriesModalVisible: false
  }

  onCollapse = collapsed => {
    this.setState({ collapsed })
  }

  handleTagsOk = () => {
    this.setState({ isTagsModalVisible: false })
  }

  handleTagsCancel = () => {
    this.setState({ isTagsModalVisible: false })
  }

  showTagsModal = () => {
    this.setState({ isTagsModalVisible: !this.state.isTagsModalVisible })
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
    // document
    //   .getElementById('tags-plus')
    //   .addEventListener('click', this.showTagsModal)
    document
      .getElementById('categories-plus')
      .addEventListener('click', this.showCategoriesModal)
  }

  componentWillUnmount() {
    // document
    //   .getElementById('tags-plus')
    //   .removeEventListener('click', this.showTagsModal)
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
          {/* <span>
            <PlusOutlined id='tags-plus' />
          </span> */}
          {/* <SubMenu key='sub2' title='TAGS'>
            <Menu.Item key='4'>Team 1</Menu.Item>
            <Menu.Item key='5'>Team 2</Menu.Item>
          </SubMenu>
          <SubMenu key='sub3' title='COLORS'>
            <Menu.Item key='6'>Team 1</Menu.Item>
            <Menu.Item key='7'>Team 2</Menu.Item>
          </SubMenu> */}
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
