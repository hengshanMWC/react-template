import { create } from 'zustand'
import type { UserInfo } from '@/apis'
import { clearUserInfo } from '@/util/user'

type StoreUserInfo = Partial<UserInfo>

interface UseUserStore {
  userInfo: StoreUserInfo
  hasUserInfo: () => boolean
  setUserInfo: (userInfo: UserInfo) => void
  menus: Menu[]
  setMenus: (menus: Menu[]) => void
  clear: () => void
}

export const useUserStore = create<UseUserStore>((set, get) => {
  return {
    userInfo: {},
    menus: [],
    hasUserInfo: () => !!get().userInfo.id,
    setUserInfo: (userInfo: UserInfo) => set(() => ({ userInfo })),
    setMenus: (menus: Menu[]) => set(() => ({ menus })),
    clear: async () => {
      clearUserInfo()
      set(() => ({ userInfo: {} }))
    },
  }
})

// 菜单添加，修改时的参数类型
export interface MenuParam {
  id?: number // ID,添加时可以没有id
  title: string // 标题
  icon?: string // 图标
  url: string // 链接路径
  file?: string // 文件路径
  parent: number | null // 父级ID
  desc: string // 描述
  sorts: number // 排序编号
  conditions: number // 状态，1启用，-1禁用
  hide?: boolean // 是否隐藏
  children?: Menu[] // 子菜单
}

// 菜单对象
export interface Menu extends MenuParam {
  id: number // ID
}
