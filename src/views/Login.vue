<template>
  <div class="login-wrap">
    <el-card class="login-card">
      <template #header>
        <h2 class="title">用户登录</h2>
      </template>
      <!-- el-form 表单组件 -->
      <el-form :model="form" label-width="60px">
        <el-form-item label="账号">
          <!-- el-input 输入框 -->
          <el-input v-model="form.username" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" placeholder="请输入密码" show-password />
        </el-form-item>
        <el-form-item>
          <!-- el-button 按钮 -->
          <el-button type="primary" :loading="loading" style="width: 100%" @click="handleLogin">
            登录
          </el-button>
        </el-form-item>
      </el-form>
      <p class="tip">演示账号：longyuanxiang / 123456</p>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '../stores/user'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const form = reactive({ username: '', password: '' })
const loading = ref(false)

const handleLogin = () => {
  if (!form.username || !form.password) {
    ElMessage.warning('账号和密码不能为空！')
    return
  }
  const res = userStore.login(form)
  if (res.ok) {
    loading.value = true
    ElMessage.success('登录成功，正在跳转后台...')
    setTimeout(() => {
      loading.value = false
      router.replace(route.query.redirect || '/admin')
    }, 800)
  } else {
    ElMessage.error(res.msg)
  }
}
</script>

<style scoped>
.login-wrap {
  display: flex;
  justify-content: center;
  padding-top: 80px;
}
.login-card {
  width: 400px;
}
.title {
  text-align: center;
  margin: 0;
}
.tip {
  color: #999;
  font-size: 12px;
  text-align: center;
}
</style>
