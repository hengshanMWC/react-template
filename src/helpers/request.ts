import type { CreateAxiosDefaults } from 'axios'
import axios from 'axios'
import { message } from 'antd'
import { createBusinessRequest } from '@/sdk'
import { baseUrl, timeout } from '@/config'

import { useUserStore } from '@/stores/user'
import { getToken } from '@/util/user'

const config: CreateAxiosDefaults = {
  timeout,
  baseURL: baseUrl,
}

const request = axios.create(config)
const refreshTokenRequest = axios.create(config)

createBusinessRequest(request, undefined, {
  getToken,
  tokenExpire() {
    window.location.href = '/login'
    return useUserStore.getState().clear()
  },
  serverError(error) {
    if (error.code === 500) {
      message.error('网络错误!')
    }
    else if (error.code === 404) {
      message.error('接口404')
    }
    else if (error.code === 429) {
      message.error('您太快了,请稍后重试!')
    }
    else if (error.code === 403) {
      message.error('您无权访问')
    }
    else if (error.code === 400 || error.code === 422) {
      message.error(error.response.data.message)
    }
  },
})

export {
  request,
  refreshTokenRequest,
}
