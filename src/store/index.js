const KEY = 'token'
export default {
  // 设置用户信息
  setUser (user) {
    const jsonStr = JSON.stringify(user)
    window.sessionStorage.setItem(KEY, jsonStr)
  },
  // 获取用户信息
  getUser () {
    const jsonStr = window.sessionStorage.getItem(KEY) || '{}'
    return JSON.parse(jsonStr)
  },
  // 删除用户信息
  delUser () {
    window.sessionStorage.removeItem(KEY)
  }
}
