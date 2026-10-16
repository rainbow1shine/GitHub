<template>
  <el-header class="page-header" height="60px">
    <!-- 导航栏返回按钮 -->
    <el-button class="back-btn" circle @click="goBack">
      <el-icon><ArrowLeft /></el-icon>
    </el-button>
    <div class="logo">
      <el-icon><Guide /></el-icon>
      <span>龙远湘 · 个人主页</span>
    </div>
    <!-- Element Plus 菜单组件（router 模式：index 即为路由路径） -->
    <el-menu
      :default-active="activeIndex"
      class="nav-menu"
      mode="horizontal"
      router
      :ellipsis="false"
      background-color="#1677ff"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="/home">
        <el-icon><HomeFilled /></el-icon>首页
      </el-menu-item>
      <el-menu-item index="/about">
        <el-icon><InfoFilled /></el-icon>关于我
      </el-menu-item>
      <el-menu-item index="/project">
        <el-icon><FolderOpened /></el-icon>项目中心
      </el-menu-item>
      <el-menu-item index="/article">
        <el-icon><Document /></el-icon>文章
      </el-menu-item>
      <el-menu-item v-if="userStore.isLogin" index="/admin">
        <el-icon><Setting /></el-icon>后台管理
      </el-menu-item>
      <el-menu-item v-else index="/login">
        <el-icon><User /></el-icon>登录
      </el-menu-item>
    </el-menu>
  </el-header>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

// 返回上一页
const goBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/home')
  }
}

// 高亮当前路由对应的菜单项
const activeIndex = computed(() => {
  if (route.path.startsWith('/project')) return '/project'
  if (route.path.startsWith('/article')) return '/article'
  if (route.path.startsWith('/admin')) return '/admin'
  if (route.path.startsWith('/login')) return '/login'
  return route.path
})
</script>

<style scoped>
.page-header {
  display: flex;
  align-items: center;
  background: #1677ff;
  padding: 0 24px;
}
.back-btn {
  margin-right: 16px;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  border: none;
}
.back-btn:hover {
  background: rgba(255, 255, 255, 0.35);
  color: #fff;
}
.logo {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #fff;
  font-weight: bold;
  font-size: 17px;
  margin-right: 24px;
}
.nav-menu {
  flex: 1;
  border-bottom: none;
}
.nav-menu .el-menu-item {
  display: flex;
  align-items: center;
}
</style>
