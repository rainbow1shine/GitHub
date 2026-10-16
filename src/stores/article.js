import { defineStore } from 'pinia'

const KEY = 'article_list'     // 文章列表存储键
const NEXT_KEY = 'article_next_id'

// 读取本地存储中的文章列表
function loadList() {
  try {
    const data = JSON.parse(localStorage.getItem(KEY))
    return Array.isArray(data) ? data : null
  } catch {
    return null
  }
}

// 生成今天的日期字符串
function today() {
  const d = new Date()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${mm}-${dd}`
}

/**
 * 文章 Store：负责文章信息的全局共享与增删改查（CRUD）。
 * - state    ：articles（文章数组）、nextId（自增主键）
 * - getters  ：articleCount、getArticleById、categoryList
 * - actions  ：addArticle / updateArticle / deleteArticle（内部统一调用 persist 持久化）
 */
export const useArticleStore = defineStore('article', {
  state: () => ({
    // 无历史数据时提供默认文章
    articles:
      loadList() || [
        { id: 1, title: 'Vue3 组合式 API 学习笔记', author: '龙远湘', category: '技术', summary: '记录 script setup、ref、reactive、computed 的用法与心得体会。', content: '在实验一、实验二的基础上，我逐步掌握了组合式 API。ref 用于基本类型的响应式，reactive 用于对象，computed 负责派生计算。', createdAt: '2026-10-01' },
        { id: 2, title: 'Pinia 状态管理入门', author: '龙远湘', category: '技术', summary: 'Store 的 state、getters、actions 以及 storeToRefs 的使用。', content: 'Pinia 是 Vue3 官方推荐的全局状态管理库。通过 defineStore 定义 Store，state 存数据、getters 派生、actions 改状态，再结合 localStorage 实现持久化。', createdAt: '2026-10-08' },
      ],
    nextId: Number(localStorage.getItem(NEXT_KEY)) || 3,
  }),

  getters: {
    // 文章总数
    articleCount: (state) => state.articles.length,
    // 根据 id 查找文章
    getArticleById: (state) => (id) => state.articles.find((a) => a.id === Number(id)),
    // 分类列表（去重）
    categoryList: (state) => [...new Set(state.articles.map((a) => a.category).filter(Boolean))],
  },

  actions: {
    // 统一持久化
    persist() {
      localStorage.setItem(KEY, JSON.stringify(this.articles))
      localStorage.setItem(NEXT_KEY, String(this.nextId))
    },

    // 新增文章（作者取用户 Store 中的姓名，可自行替换）
    addArticle(payload) {
      this.articles.unshift({
        id: this.nextId++,
        author: '龙远湘',
        createdAt: today(),
        title: payload.title,
        category: payload.category || '默认',
        summary: payload.summary || '',
        content: payload.content || '',
      })
      this.persist()
    },

    // 修改文章
    updateArticle(id, payload) {
      const idx = this.articles.findIndex((a) => a.id === Number(id))
      if (idx !== -1) {
        this.articles[idx] = { ...this.articles[idx], ...payload, id: Number(id) }
        this.persist()
      }
    },

    // 删除文章
    deleteArticle(id) {
      this.articles = this.articles.filter((a) => a.id !== Number(id))
      this.persist()
    },
  },
})
