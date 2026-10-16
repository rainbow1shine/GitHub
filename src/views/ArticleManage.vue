<template>
  <el-card class="manage">
    <template #header>
      <div class="card-head">
        <span>📝 文章管理（共 {{ articleStore.articleCount }} 篇）</span>
        <!-- 新增按钮：打开对话框 -->
        <el-button type="primary" :icon="Plus" @click="openAdd">新增文章</el-button>
      </div>
    </template>

    <!-- el-table 表格展示文章列表 -->
    <el-table :data="articleStore.articles" stripe border>
      <el-table-column prop="id" label="ID" width="60" />
      <el-table-column prop="title" label="标题" min-width="180" />
      <el-table-column label="分类" width="100">
        <template #default="{ row }">
          <el-tag size="small" effect="plain">{{ row.category }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="日期" width="110" />
      <el-table-column label="操作" width="150">
        <template #default="{ row }">
          <el-button size="small" type="primary" @click="openEdit(row)">编辑</el-button>
          <!-- el-popconfirm 气泡确认删除 -->
          <el-popconfirm title="确定删除该文章吗？" @confirm="articleStore.deleteArticle(row.id)">
            <template #reference>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-empty v-if="articleStore.articles.length === 0" description="暂无文章" />

    <!-- el-dialog 对话框：新增 / 编辑 -->
    <el-dialog v-model="dialogVisible" :title="editing ? '编辑文章' : '新增文章'" width="520px">
      <el-form :model="form" label-width="70px">
        <el-form-item label="标题">
          <el-input v-model="form.title" placeholder="文章标题" />
        </el-form-item>
        <el-form-item label="分类">
          <el-input v-model="form.category" placeholder="技术 / 生活 / 学习等" />
        </el-form-item>
        <el-form-item label="摘要">
          <el-input v-model="form.summary" type="textarea" :rows="2" placeholder="一句话摘要" />
        </el-form-item>
        <el-form-item label="正文">
          <el-input v-model="form.content" type="textarea" :rows="4" placeholder="正文内容" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </template>
    </el-dialog>
  </el-card>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { useArticleStore } from '../stores/article'

const articleStore = useArticleStore()

const dialogVisible = ref(false)
const editing = ref(false)
const editingId = ref(null)
const form = reactive({ title: '', category: '', summary: '', content: '' })

const openAdd = () => {
  editing.value = false
  editingId.value = null
  Object.assign(form, { title: '', category: '', summary: '', content: '' })
  dialogVisible.value = true
}

const openEdit = (row) => {
  editing.value = true
  editingId.value = row.id
  Object.assign(form, {
    title: row.title,
    category: row.category,
    summary: row.summary,
    content: row.content,
  })
  dialogVisible.value = true
}

// 新增或修改：调用 Article Store 的 action
const save = () => {
  if (!form.title.trim()) {
    ElMessage.warning('标题不能为空')
    return
  }
  if (editing.value) {
    articleStore.updateArticle(editingId.value, { ...form })
    ElMessage.success('文章修改成功')
  } else {
    articleStore.addArticle({ ...form })
    ElMessage.success('文章新增成功')
  }
  dialogVisible.value = false
}
</script>

<style scoped>
.manage {
  margin-top: 16px;
}
.card-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
