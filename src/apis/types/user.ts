// 个人
export interface FetchLoginData {
  username: string
  password: string
}
export interface FetchLoginResult {
  token: string
}

export interface UserInfo extends FetchBaseResultApi {
  username: string
  nickname: string
  avatar: string
}
