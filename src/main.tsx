import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'

import 'normalize.css'
import 'uno.css'
import '@/styles/default.less'
import '@/styles/global.less'
import '@/styles/common.less'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import Router from './router'
import 'moment/dist/locale/zh-cn'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <HashRouter>
        <Router />
      </HashRouter>
    </ConfigProvider>
  </React.StrictMode>,
)
