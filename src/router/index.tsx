/** 根路由 */

// ==================
// 第三方库
// ==================
import { Navigate, Route, Routes } from 'react-router-dom'
import { message } from 'antd'
import loadable from '@loadable/component'

// ==================
// 自定义的东西
// ==================
import Loading from '../components/Loading'

import { HOME_PATH } from '@/constant'
import BasicLayoutCom from '@/layouts/BasicLayout'

// 全局提示只显示2秒
message.config({
  duration: 2,
})

// ==================
// 异步加载各路由模块
// ==================
const [
  NotFound,
  Home,
] = [
  () => import('../pages/ErrorPages/404'),
  () => import('../pages/Home'),
].map((item) => {
  return loadable(item as any, {
    fallback: <Loading />,
  })
})

function RouterCom(): JSX.Element {
  return (
    <Routes>
      <Route
        path="/"
        element={
            <BasicLayoutCom />
        }
      >
        <Route path="/" element={<Navigate to={HOME_PATH} />} />
        <Route path={HOME_PATH} element={<Home />} />
        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="404" />} />
      </Route>
    </Routes>
  )
}

export default RouterCom
