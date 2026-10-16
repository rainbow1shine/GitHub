<template>
  <div class="page">
    <h2>项目详情页 id={{ projectId }}</h2>
    <el-card v-if="currentProject">
      <template #header>
        <span>{{ currentProject.title }}</span>
      </template>
      <el-descriptions :column="1" border>
        <el-descriptions-item label="项目介绍">{{ currentProject.desc }}</el-descriptions-item>
        <el-descriptions-item label="技术栈">{{ currentProject.tech }}</el-descriptions-item>
        <el-descriptions-item label="分类">
          <el-tag size="small" effect="plain">{{ currentProject.category }}</el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-empty v-else description="没有找到该项目" />

    <div class="btn-row">
      <el-button @click="goBack">返回上一页</el-button>
      <el-button type="primary" @click="goList">返回项目列表</el-button>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useProjectStore } from '../stores/project'

const route = useRoute()
const router = useRouter()
const projectStore = useProjectStore()

const projectId = Number(route.params.id)
// 使用 Project Store 的 getter 查询项目
const currentProject = projectStore.getProjectById(projectId)

const goBack = () => router.go(-1)
const goList = () => router.push({ name: 'ProjectList' })
</script>

<style scoped>
.page {
  padding: 24px;
  max-width: 700px;
  margin: 0 auto;
}
.btn-row {
  margin-top: 16px;
}
</style>
