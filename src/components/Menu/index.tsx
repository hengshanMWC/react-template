/** 左侧导航 */

// ==================
// 第三方库
// ==================
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Layout, Menu as MenuAntd } from 'antd'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { cloneDeep } from 'lodash'

// ==================
// 自定义的东西
// ==================
import './index.less'
import type { ItemType } from 'antd/lib/menu/hooks/useItems'
import ImgLogo from '@/assets/logo.png'
import Icon from '@/components/Icon'
import type { Menu } from '@/stores/user'
import { useUserStore } from '@/stores/user'
import { title } from '@/config'

const { Sider } = Layout

interface Props {
  collapsed: boolean // 菜单咱开还是收起
}

// ==================
// 本组件
// ==================
export default function MenuCom(props: Props): JSX.Element {
  const navigate = useNavigate()
  const location = useLocation()
  const menus = useUserStore(state => state.menus)
  const [chosedKey, setChosedKey] = useState<string[]>([]) // 当前选中
  const [openKeys, setOpenKeys] = useState<string[]>([]) // 当前需要被展开的项

  // 当页面路由跳转时，即location发生改变，则更新选中项
  useEffect(() => {
    const paths = location.pathname.split('/').filter(item => !!item)
    setChosedKey([location.pathname])
    setOpenKeys(paths.map(item => `/${item}`))
  }, [location])

  // ==================
  // 私有方法
  // ==================

  // 菜单被选择
  const onSelect = (e: any) => {
    if (e?.key) {
      navigate(e.key)
    }
  }

  // 工具 - 递归将扁平数据转换为层级数据
  const dataToJson = useCallback(
    (one: Menu | undefined, data: Menu[]): Menu[] | undefined => {
      let kids
      if (!one) {
        // 第1次递归
        kids = data.filter((item: Menu) => !item.parent)
      }
      else {
        kids = data.filter((item: Menu) => item.parent === one.id)
      }
      kids.forEach((item: Menu) => (item.children = dataToJson(item, data)))
      return kids.length ? kids : undefined
    },
    [],
  )

  // 构建树结构
  const makeTreeDom = useCallback((data: Menu[]): any => {
    return data.map((item: Menu) => {
      if (item.children) {
        return {
          key: item.url,
          label:
            !item.parent && item.icon
              ? (
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
                )
              : (
                  item.title
                ),
          children: makeTreeDom(item.children),
        }
      }
      else {
        return {
          label: (
            <>
              {!item.parent && item.icon ? <Icon type={item.icon} /> : null}
              <span>{item.title}</span>
            </>
          ),
          key: item.url,
        }
      }
    })
  }, [])

  // ==================
  // 计算属性 memo
  // ==================

  /** 处理原始数据，将原始数据处理为层级关系 */
  const treeDom: ItemType[] = useMemo(() => {
    const d: Menu[] = cloneDeep(menus).filter(menus => !menus.hide)
    // 按照sort排序
    d.sort((a, b) => {
      return a.sorts - b.sorts
    })
    const sourceData: Menu[] = dataToJson(undefined, d) || []
    const treeDom = makeTreeDom(sourceData)
    return treeDom
  }, [menus, dataToJson, makeTreeDom])
  return (
    <Sider
      theme="light"
      width={256}
      className="sider"
      trigger={null}
      collapsible
      collapsed={props.collapsed}
    >
      <div className={`${props.collapsed ? 'menuLogo hide' : 'menuLogo'} p-2`}>
        <Link to="/">
          <img className="w-[40px]" src={ImgLogo} />
          {
            props.collapsed
              ? null
              : <span className="pl-2 text-lg">{title}</span>
          }
        </Link>
      </div>
      <MenuAntd
        mode="inline"
        items={treeDom}
        selectedKeys={chosedKey}
        {...(props.collapsed ? {} : { openKeys })}
        onOpenChange={(keys: string[]) => setOpenKeys(keys)}
        onSelect={onSelect}
      />
    </Sider>
  )
}
