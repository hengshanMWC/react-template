/** 基础页面结构 - 有头部，有底部，有侧边导航 */
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'

import Footer from '../components/Footer'

const { Content } = Layout

// ==================
// 本组件
// ==================
export default function AppContainer(): JSX.Element {
  return (
    <Layout>
      <Content>
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  )
}
