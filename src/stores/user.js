import { defineStore } from 'pinia'

// 本地存储键名
const USER_KEY = 'user_info'      // 个人信息
const TOKEN_KEY = 'user_token'    // 登录标记

// 读取本地存储中的个人信息（作为 state 的初始默认值，实现刷新恢复）
function loadUser() {
  try {
    const data = JSON.parse(localStorage.getItem(USER_KEY))
    return data
  } catch {
    return null
  }
}

/**
 * 用户 Store：负责登录状态与个人信息的跨组件/跨页面共享。
 * - state    ：userInfo（个人信息）、token（登录标记）
 * - getters  ：isLogin（是否已登录）、userName、stuNo
 * - actions  ：login / logout / updateInfo（唯一推荐改状态入口）
 * 持久化方案：state 初始化从 localStorage 读取，actions 修改后写回 localStorage。
 */
export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo:
      loadUser() || {
        avatar: '1.png',
        name: '龙远湘',
        stuId: '249981024',
        className: '24计科2班',
        desc: '计算机科学与技术专业，Web前端框架程序设计课程学生',
        email: 'long@qq.com',
      },
    // 登录标记：有值即视为已登录（这里用 mock token 演示）
    token: localStorage.getItem(TOKEN_KEY) || '',
  }),

  getters: {
    // 是否已登录
    isLogin: (state) => !!state.token,
    // 登录用户名（用于页面展示）
    userName: (state) => state.userInfo?.name || '',
    // 学号
    stuNo: (state) => state.userInfo?.stuId || '',
  },

  actions: {
    /**
     * 登录。校验预设账号密码，成功后写入 token 并持久化。
     * @param {{username:string, password:string}} form 登录表单
     * @returns {{ok:boolean, msg?:string}}
     */
    login(form) {
      // 预设正确账号密码（可自行修改）
      const correctUser = { username: 'longyuanxiang', password: '123456' }
      if (form.username === correctUser.username && form.password === correctUser.password) {
        this.token = 'mock-token-' + Date.now()
        localStorage.setItem(TOKEN_KEY, this.token) // actions 内同步持久化
        return { ok: true }
      }
      return { ok: false, msg: '账号或密码错误，请重试' }
    },

    // 退出登录：清空 token 并移除本地存储
    logout() {
      this.token = ''
      localStorage.removeItem(TOKEN_KEY)
    },

    /**
     * 更新个人信息（对象合并），并同步写入 localStorage。
     * @param {object} payload 需更新的字段
     */
    updateInfo(payload) {
      this.userInfo = { ...this.userInfo, ...payload }
      localStorage.setItem(USER_KEY, JSON.stringify(this.userInfo))
    },
  },
})
