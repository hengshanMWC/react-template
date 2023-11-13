import { message } from 'antd'
import { useMemo } from 'react'

export function useOperate(id: ID | boolean | null) {
  const operateText = useMemo(() => id ? '编辑' : '新增', [id])
  return {
    operateText,
    operateSuccess() {
      message.success(`${operateText}成功`)
    },
    operateError() {
      message.error(`${operateText}失败`)
    },
  }
}
