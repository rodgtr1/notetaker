import React from 'react'
import { Layout, Row } from 'antd'
import MenuSection from './sections/Menu'
import ListSection from './sections/List'
import BodySection from './sections/Body'
import './App.scss'

const { Content } = Layout

const App = () => {
  return (
    <Layout>
      <MenuSection />
      <Content>
        <Row>
          <ListSection />
          <BodySection />
        </Row>
      </Content>
    </Layout>
  )
}

export default App
