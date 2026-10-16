<template>
  <div class="page">
    <el-card v-if="article">
      <template #header>
        <span>{{ article.title }}</span>
      </template>
      <el-descriptions :column="3" border size="small" class="mb16">
        <el-descriptions-item label="分类">{{ article.category }}</el-descriptions-item>
        <el-descriptions-item label="作者">{{ article.author }}</el-descriptions-item>
        <el-descriptions-item label="发布日期">{{ article.createdAt }}</el-descriptions-item>
      </el-descriptions>
      <p class="summary">摘要：{{ article.summary }}</p>
      <el-divider />
      <p class="content">{{ article.content }}</p>
    </el-card>
    <el-empty v-else description="没有找到该文章" />

    <el-button @click="$router.back()" class="mt16">返回文章列表</el-button>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useArticleStore } from '../stores/article'

const route = useRoute()
const articleStore = useArticleStore()

const id = Number(route.params.id)
// 使用 Article Store 的 getter 查询文章
const article = articleStore.getArticleById(id)
</script>

<style scoped>
.page {
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
}
.mb16 {
  margin-bottom: 16px;
}
.mt16 {
  margin-top: 16px;
}
.summary {
  color: #1677ff;
}
.content {
  line-height: 1.9;
  white-space: pre-wrap;
}
</style>
