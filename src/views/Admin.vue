<template>
  <div class="admin-page">
    <el-card>
      <template #header>
        <div class="card-head">
          <span>🛠️ 后台管理中心</span>
          <el-tag type="danger" size="small">需要登录访问</el-tag>
        </div>
      </template>
      <p>
        欢迎回来，<b>{{ userStore.userName }}</b>（学号 {{ userStore.stuNo }}）
      </p>
      <div class="btn-row">
        <el-button type="primary" @click="$router.push({ name: 'AdminEditInfo' })">
          <el-icon><Edit /></el-icon>编辑个人信息
        </el-button>
        <el-button type="success" @click="$router.push({ name: 'ProjectManage' })">
          <el-icon><Folder /></el-icon>项目管理
        </el-button>
        <el-button type="warning" @click="$router.push({ name: 'ArticleManage' })">
          <el-icon><Document /></el-icon>文章管理
        </el-button>
        <el-button type="danger" @click="logout">
          <el-icon><SwitchButton /></el-icon>退出登录
        </el-button>
      </div>
      <!-- 子路由出口：AdminEditInfo / ProjectManage / ArticleManage -->
      <RouterView />
    </el-card>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '../stores/user'

const router = useRouter()
const userStore = useUserStore()

const logout = () => {
  userStore.logout()
  ElMessage.success('已退出登录')
  router.push('/login')
}
</script>

<style scoped>
.admin-page {
  padding: 24px;
  max-width: 900px;
  margin: 0 auto;
}
.card-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.btn-row {
  margin: 16px 0;
}
.btn-row .el-button + .el-button {
  margin-left: 8px;
}
</style>
