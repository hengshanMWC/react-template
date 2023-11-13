/** 头部 */

// ==================
// 第三方库
// ==================
import React, { useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Dropdown, Layout, Tooltip, message } from 'antd'
import {
  FullscreenExitOutlined,
  FullscreenOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  SmileOutlined,
} from '@ant-design/icons'

// ==================
// 自定义的东西
// ==================
import './index.less'

// ==================
// 类型声明
// ==================
import type { MenuProps } from 'antd'
import { useUserStore } from '@/stores/user'

const { Header } = Layout

interface Element {
  webkitRequestFullscreen?: () => void
  webkitExitFullscreen?: () => void
  mozRequestFullScreen?: () => void
  mozCancelFullScreen?: () => void
  msRequestFullscreen?: () => void
  msExitFullscreen?: () => void
}

interface Props {
  collapsed: boolean // 菜单的状态
  onToggle: () => void // 菜单收起与展开状态切换
}

export default function HeaderCom(props: Props): JSX.Element {
  const [fullScreen, setFullScreen] = useState(false) // 当前是否是全屏状态
  const navigate = useNavigate()
  const { userInfo, clear } = useUserStore(state => ({ userInfo: state.userInfo, clear: state.clear }))
  // 进入全屏
  const requestFullScreen = useCallback(() => {
    const element: HTMLElement & Element = document.documentElement
    // 判断各种浏览器，找到正确的方法
    const requestMethod
      = element.requestFullscreen // W3C
      || element.webkitRequestFullscreen // Chrome等
      || element.mozRequestFullScreen // FireFox
      || element.msRequestFullscreen // IE11
    if (requestMethod) {
      requestMethod.call(element)
    }
    setFullScreen(true)
  }, [])

  // 退出全屏
  const exitFullScreen = useCallback(() => {
    // 判断各种浏览器，找到正确的方法
    const element: Document & Element = document
    const exitMethod
      = element.exitFullscreen // W3C
      || element.mozCancelFullScreen // firefox
      || element.webkitExitFullscreen // Chrome等
      || element.msExitFullscreen // IE11

    if (exitMethod) {
      exitMethod.call(document)
    }
    setFullScreen(false)
  }, [])

  // 退出登录
  const onMenuClick: MenuProps['onClick'] = (e) => {
    // 退出按钮被点击
    if (e.key === 'logout') {
      // 退出登录
      clear()
      message.success('退出成功')
      navigate('/login')
    }
  }

  return (
    <Header className="header">
      <MenuFoldOutlined
        className={props.collapsed ? 'trigger fold' : 'trigger'}
        onClick={() => props.onToggle()}
      />

      <div className="rightBox">
        <Tooltip placement="bottom" title={fullScreen ? '退出全屏' : '全屏'}>
          <div className="full all_center">
            {fullScreen
              ? (
              <FullscreenExitOutlined
                className="icon"
                onClick={exitFullScreen}
              />
                )
              : (
              <FullscreenOutlined
                className="icon"
                onClick={requestFullScreen}
              />
                )}
          </div>
        </Tooltip>
        {userInfo
          ? (
          <Dropdown
            menu={{
              className: 'menu',
              onClick: onMenuClick,
              items: [
                {
                  type: 'divider',
                },
                {
                  key: 'logout',
                  label: (
                    <>
                      <LogoutOutlined />
                      退出登录
                    </>
                  ),
                },
              ],
            }}
            placement="bottomRight"
          >
            <div className="all_center userhead">
              <SmileOutlined />
              <span className="username">{userInfo.username}</span>
            </div>
          </Dropdown>
            )
          : (
          <Tooltip placement="bottom" title="点击登录">
            <div className="full all_center">
              <Link to="/login">未登录</Link>
            </div>
          </Tooltip>
            )}
      </div>
    </Header>
  )
}
