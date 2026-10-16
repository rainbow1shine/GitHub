import { defineStore } from 'pinia'

const KEY = 'project_list'     // 项目列表存储键
const NEXT_KEY = 'project_next_id'

// 读取本地存储中的项目列表
function loadList() {
  try {
    const data = JSON.parse(localStorage.getItem(KEY))
    return Array.isArray(data) ? data : null
  } catch {
    return null
  }
}

/**
 * 项目 Store：负责项目信息的全局共享与增删改查（CRUD）。
 * - state    ：projects（项目数组）、nextId（自增主键）
 * - getters  ：projectCount、getProjectById、categoryList
 * - actions  ：addProject / updateProject / deleteProject（内部统一调用 persist 持久化）
 */
export const useProjectStore = defineStore('project', {
  state: () => ({
    // 无历史数据时提供默认项目（来自实验一、二、三）
    projects:
      loadList() || [
        { id: 1, title: '📘实验一：个人静态主页', desc: '实现静态个人信息展示，练习Vue基础指令', tech: 'HTML、CSS、Vue3-CDN', category: '前端' },
        { id: 2, title: '📗实验二：Vue组件化开发', desc: '学习单文件组件，props、emit、model、插槽', tech: 'Vue3 script-setup、Vite', category: '前端' },
        { id: 3, title: '📙实验三：Vue Router路由配置', desc: '学习命名路由、嵌套路由、动态路由与路由守卫', tech: 'Vue3、Vue Router、Vite', category: '前端' },
      ],
    nextId: Number(localStorage.getItem(NEXT_KEY)) || 4,
  }),

  getters: {
    // 项目总数
    projectCount: (state) => state.projects.length,
    // 根据 id 查找项目（getter 返回函数，支持传参）
    getProjectById: (state) => (id) => state.projects.find((p) => p.id === Number(id)),
    // 分类列表（去重）
    categoryList: (state) => [...new Set(state.projects.map((p) => p.category).filter(Boolean))],
  },

  actions: {
    // 统一持久化：把当前 projects 与 nextId 写入 localStorage
    persist() {
      localStorage.setItem(KEY, JSON.stringify(this.projects))
      localStorage.setItem(NEXT_KEY, String(this.nextId))
    },

    // 新增项目
    addProject(payload) {
      this.projects.push({
        id: this.nextId++,
        title: payload.title,
        desc: payload.desc,
        tech: payload.tech,
        category: payload.category || '默认',
      })
      this.persist()
    },

    // 修改项目
    updateProject(id, payload) {
      const idx = this.projects.findIndex((p) => p.id === Number(id))
      if (idx !== -1) {
        this.projects[idx] = { ...this.projects[idx], ...payload, id: Number(id) }
        this.persist()
      }
    },

    // 删除项目
    deleteProject(id) {
      this.projects = this.projects.filter((p) => p.id !== Number(id))
      this.persist()
    },
  },
})
