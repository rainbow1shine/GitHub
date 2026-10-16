<template>
  <el-card class="edit-card">
    <template #header>
      <span>🔧 编辑个人信息</span>
    </template>
    <!-- el-form 表单组件 -->
    <el-form :model="userInfo" label-width="80px" style="max-width: 520px">
      <el-form-item label="姓名">
        <el-input v-model="userInfo.name" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="学号">
        <el-input v-model="userInfo.stuId" placeholder="请输入学号" />
      </el-form-item>
      <el-form-item label="班级">
        <el-input v-model="userInfo.className" placeholder="请输入班级" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="userInfo.email" placeholder="请输入邮箱" />
      </el-form-item>
      <el-form-item label="个人简介">
        <el-input v-model="userInfo.desc" type="textarea" :rows="4" placeholder="填写个人介绍" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveInfo">
          <el-icon><Check /></el-icon>保存修改
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
// storeToRefs 解构 userInfo，保持响应式
const { userInfo } = storeToRefs(userStore)

const saveInfo = () => {
  userStore.updateInfo({ ...userInfo.value })
  ElMessage.success('信息保存成功，已持久化到 localStorage！')
}
</script>

<style scoped>
.edit-card {
  margin-top: 16px;
}
</style>
