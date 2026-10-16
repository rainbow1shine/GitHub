<template>
  <div class="page">
    <h2>📚 文章列表（共 {{ articleStore.articleCount }} 篇）</h2>

    <!-- 分类筛选按钮组 -->
    <div class="filter" v-if="articleStore.categoryList.length">
      <el-radio-group v-model="activeCategory" size="small">
        <el-radio-button label="">全部</el-radio-button>
        <el-radio-button v-for="c in articleStore.categoryList" :key="c" :label="c">
          {{ c }}
        </el-radio-button>
      </el-radio-group>
    </div>

    <el-row :gutter="16">
      <el-col v-for="a in filtered" :key="a.id" :xs="24" :sm="12" class="mb16">
        <el-card shadow="hover">
          <template #header>
            <div class="card-head">
              <span class="title">{{ a.title }}</span>
              <el-tag size="small" effect="plain">{{ a.category }}</el-tag>
            </div>
          </template>
          <p class="meta">{{ a.author }} · {{ a.createdAt }}</p>
          <p class="summary">{{ a.summary }}</p>
          <el-button type="primary" link @click="$router.push({ name: 'ArticleDetail', params: { id: a.id } })">
            阅读全文 →
          </el-button>
        </el-card>
      </el-col>
    </el-row>
    <el-empty v-if="filtered.length === 0" description="暂无文章" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useArticleStore } from '../stores/article'

const articleStore = useArticleStore()
const activeCategory = ref('')

// 按分类过滤（computed 派生）
const filtered = computed(() => {
  if (!activeCategory.value) return articleStore.articles
  return articleStore.articles.filter((a) => a.category === activeCategory.value)
})
</script>

<style scoped>
.page {
  padding: 24px;
  max-width: 1000px;
  margin: 0 auto;
}
.filter {
  margin: 16px 0;
}
.mb16 {
  margin-bottom: 16px;
}
.card-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title {
  font-weight: bold;
}
.meta {
  color: #999;
  font-size: 13px;
  margin: 0 0 8px;
}
.summary {
  color: #444;
}
</style>
