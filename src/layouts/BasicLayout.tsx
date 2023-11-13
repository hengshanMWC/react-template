/** 基础页面结构 - 有头部、底部、侧边导航 */

// ==================
// 第三方库
// ==================
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'

// ==================
// 自定义的东西
// ==================
import './BasicLayout.less'

// ==================
// 组件
// ==================
import Header from '@/components/Header'
import MenuCom from '@/components/Menu'
import Footer from '@/components/Footer'
import Bread from '@/components/Bread'

const { Content } = Layout

// ==================
// 本组件
// ==================
function BasicLayoutCom(): JSX.Element {
  const [collapsed, setCollapsed] = useState(false) // 菜单栏是否收起
  return (
    <Layout className="page-basic" hasSider>
      <MenuCom collapsed={collapsed} />

      <Layout className="min-w-[700px]">
        <Header
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
        />
        <Bread />
        <Content className="content">
          <Outlet />
        </Content>
        <Footer />
      </Layout>
    </Layout>
  )
}

export default BasicLayoutCom
