import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '../stores/user'

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
  },
  // 项目中心（嵌套路由）
  {
    path: '/project',
    component: () => import('../views/Project.vue'),
    children: [
      { path: '', name: 'ProjectList', component: () => import('../views/ProjectList.vue') },
      { path: 'detail/:id', name: 'ProjectDetail', component: () => import('../views/ProjectDetail.vue') },
    ],
  },
  // 文章列表（公开页面）
  {
    path: '/article',
    name: 'ArticleList',
    component: () => import('../views/ArticleList.vue'),
  },
  {
    path: '/article/detail/:id',
    name: 'ArticleDetail',
    component: () => import('../views/ArticleDetail.vue'),
  },
  // 后台管理（嵌套路由，meta.requiresAuth 需要登录）
  {
    path: '/admin',
    component: () => import('../views/Admin.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', redirect: { name: 'AdminEditInfo' } },
      {
        path: 'edit-info',
        name: 'AdminEditInfo',
        component: () => import('../views/AdminEditInfo.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'project-manage',
        name: 'ProjectManage',
        component: () => import('../views/ProjectManage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'article-manage',
        name: 'ArticleManage',
        component: () => import('../views/ArticleManage.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  // 404 兜底
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../views/NotFound.vue') },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

/**
 * 全局前置守卫：结合用户 Store 实现登录访问控制。
 * 注意：必须在守卫函数【内部】调用 useUserStore()（不能在模块顶层调用），
 * 以确保 Pinia 已完成初始化。
 */
router.beforeEach((to) => {
  const userStore = useUserStore()
  // 需要认证且未登录 → 自动跳转登录页，并带上原目标地址
  if (to.meta.requiresAuth && !userStore.isLogin) {
    return { name: 'Login', query: { redirect: to.fullPath } }
  }
  return true
})

export default router
