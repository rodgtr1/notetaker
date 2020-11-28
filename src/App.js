import React from 'react'
import { Layout, Row } from 'antd'
import { Provider } from 'react-redux'

import MenuSection from './sections/Menu'
import ListSection from './sections/List'
import BodySection from './sections/Body'
import configureStore from './redux/configureStore'
import './App.scss'

const { Content } = Layout

const store = configureStore()

const App = () => {
  return (
    <Provider store={store}>
      <Layout>
        <MenuSection />
        <Content>
          <Row>
            <ListSection />
            <BodySection />
          </Row>
        </Content>
      </Layout>
    </Provider>
  )
}

export default App
