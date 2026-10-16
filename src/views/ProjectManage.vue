<template>
  <el-card class="manage">
    <template #header>
      <div class="card-head">
        <span>🗂️ 项目管理（增删改查，共 {{ projectStore.projectCount }} 个）</span>
        <el-button type="primary" :icon="Plus" @click="openAdd">新增项目</el-button>
      </div>
    </template>

    <!-- el-table 表格 -->
    <el-table :data="projectStore.projects" stripe border>
      <el-table-column prop="id" label="ID" width="60" />
      <el-table-column prop="title" label="标题" min-width="180" />
      <el-table-column label="分类" width="100">
        <template #default="{ row }">
          <el-tag size="small" type="success" effect="plain">{{ row.category }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="tech" label="技术栈" min-width="160" />
      <el-table-column label="操作" width="150">
        <template #default="{ row }">
          <el-button size="small" type="primary" @click="openEdit(row)">编辑</el-button>
          <el-popconfirm title="确定删除该项目吗？" @confirm="projectStore.deleteProject(row.id)">
            <template #reference>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-empty v-if="projectStore.projects.length === 0" description="暂无项目" />

    <!-- el-dialog 对话框 -->
    <el-dialog v-model="dialogVisible" :title="editing ? '编辑项目' : '新增项目'" width="520px">
      <el-form :model="form" label-width="70px">
        <el-form-item label="标题">
          <el-input v-model="form.title" placeholder="项目标题" />
        </el-form-item>
        <el-form-item label="分类">
          <el-input v-model="form.category" placeholder="前端 / 后端 / 全栈等" />
        </el-form-item>
        <el-form-item label="介绍">
          <el-input v-model="form.desc" type="textarea" :rows="2" placeholder="项目介绍" />
        </el-form-item>
        <el-form-item label="技术栈">
          <el-input v-model="form.tech" placeholder="如 Vue3、Vite、Pinia" />
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
import { useProjectStore } from '../stores/project'

const projectStore = useProjectStore()

const dialogVisible = ref(false)
const editing = ref(false)
const editingId = ref(null)
const form = reactive({ title: '', category: '', desc: '', tech: '' })

const openAdd = () => {
  editing.value = false
  editingId.value = null
  Object.assign(form, { title: '', category: '', desc: '', tech: '' })
  dialogVisible.value = true
}

const openEdit = (row) => {
  editing.value = true
  editingId.value = row.id
  Object.assign(form, { title: row.title, category: row.category, desc: row.desc, tech: row.tech })
  dialogVisible.value = true
}

const save = () => {
  if (!form.title.trim()) {
    ElMessage.warning('标题不能为空')
    return
  }
  if (editing.value) {
    projectStore.updateProject(editingId.value, { ...form })
    ElMessage.success('项目修改成功')
  } else {
    projectStore.addProject({ ...form })
    ElMessage.success('项目新增成功')
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
