<template>
  <div>
    <h3>项目列表（共 {{ projectStore.projectCount }} 个）</h3>
    <!-- el-table 表格展示项目列表 -->
    <el-table :data="projects" stripe border style="max-width: 640px">
      <el-table-column prop="id" label="ID" width="70" />
      <el-table-column label="项目名称">
        <template #default="{ row }">
          <el-button type="primary" link @click="goDetail(row.id)">{{ row.title }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="分类" width="120">
        <template #default="{ row }">
          <el-tag size="small" effect="plain">{{ row.category }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useProjectStore } from '../stores/project'

const router = useRouter()
const projectStore = useProjectStore()
// storeToRefs 解构 state，保持响应式
const { projects } = storeToRefs(projectStore)

const goDetail = (id) => {
  router.push({ name: 'ProjectDetail', params: { id } })
}
</script>

<style scoped></style>
