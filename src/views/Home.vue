<template>
  <!-- Element Plus 布局组件：el-container / el-header / el-main / el-footer -->
  <el-container class="home-container" direction="vertical">
    <PageHeader />

    <el-main class="main-content">
      <el-row :gutter="20">
        <!-- 左列：个人信息卡片 + 成长时间线 -->
        <el-col :xs="24" :sm="24" :md="10">
          <!-- el-card 卡片容器 -->
          <el-card class="mb20">
            <template #header>
              <span>👤 个人信息</span>
            </template>
            <div class="profile">
              <!-- el-avatar 头像 -->
              <el-avatar :size="80" icon="UserFilled" class="avatar" />
              <div class="profile-info">
                <h2>{{ userInfo.name }}</h2>
                <el-tag size="small" type="primary">{{ userInfo.className }}</el-tag>
                <el-tag size="small" effect="plain" class="ml6">{{ userInfo.stuId }}</el-tag>
              </div>
            </div>
            <el-divider />
            <!-- el-descriptions 描述列表 -->
            <el-descriptions :column="1" border size="small">
              <el-descriptions-item label="姓名">{{ userInfo.name }}</el-descriptions-item>
              <el-descriptions-item label="学号">{{ userInfo.stuId }}</el-descriptions-item>
              <el-descriptions-item label="班级">{{ userInfo.className }}</el-descriptions-item>
              <el-descriptions-item label="邮箱">{{ userInfo.email }}</el-descriptions-item>
              <el-descriptions-item label="简介">{{ userInfo.desc }}</el-descriptions-item>
            </el-descriptions>
            <div class="mt12">
              前端技能熟练度：
              <!-- el-rate 评分组件（只读展示） -->
              <el-rate v-model="skillLevel" disabled show-score score-template="{value} 分" />
            </div>
          </el-card>

          <!-- 个人经历时间线（实验要求：个人信息页新增时间线） -->
          <el-card>
            <template #header>
              <span>📈 我的成长经历</span>
            </template>
            <!-- el-timeline 时间线 -->
            <el-timeline>
              <el-timeline-item timestamp="2024.09" placement="top" type="primary">
                入学重庆工程学院，计算机科学与技术专业
              </el-timeline-item>
              <el-timeline-item timestamp="2025.01" placement="top">
                实验一：完成个人静态主页
              </el-timeline-item>
              <el-timeline-item timestamp="2025.06" placement="top">
                实验二：Vue 组件化开发
              </el-timeline-item>
              <el-timeline-item timestamp="2025.12" placement="top">
                实验三：Vue Router 路由配置
              </el-timeline-item>
              <el-timeline-item timestamp="2026.10" placement="top" type="warning" :hollow="true">
                实验四：Pinia 状态管理 + Element Plus 组件库
              </el-timeline-item>
            </el-timeline>
          </el-card>
        </el-col>

        <!-- 右列：项目展示（el-table 列表） + 技能标签 -->
        <el-col :xs="24" :sm="24" :md="14">
          <el-card class="mb20">
            <template #header>
              <div class="card-head">
                <span>🗂️ 项目展示（共 {{ projectStore.projectCount }} 个）</span>
                <div class="head-right">
                  <!-- 明暗模式切换 -->
                  <el-switch
                    v-model="isDark"
                    inline-prompt
                    active-text="暗色"
                    inactive-text="亮色"
                    class="theme-switch"
                  />
                  <el-input
                    v-model="searchKey"
                    placeholder="搜索项目..."
                    :prefix-icon="Search"
                    style="width: 200px"
                    clearable
                  />
                </div>
              </div>
            </template>
            <!-- el-table 表格展示项目列表 -->
            <el-table :data="filteredProjects" stripe size="small">
              <el-table-column prop="title" label="项目" min-width="180" />
              <el-table-column label="分类" width="90">
                <template #default="{ row }">
                  <el-tag size="small" effect="plain">{{ row.category }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="90">
                <template #default="{ row }">
                  <el-button size="small" type="primary" link @click="goDetail(row.id)">
                    详情
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-empty v-if="filteredProjects.length === 0" description="没有匹配的项目" />
          </el-card>

          <el-card>
            <template #header>
              <span>🛠️ 技能标签</span>
            </template>
            <el-tag
              v-for="s in skillList"
              :key="s"
              class="skill-tag"
              effect="plain"
              type="success"
            >
              {{ s }}
            </el-tag>
          </el-card>
        </el-col>
      </el-row>
    </el-main>

    <PageFooter />
  </el-container>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { Search } from '@element-plus/icons-vue'
import PageHeader from '../components/PageHeader.vue'
import PageFooter from '../components/PageFooter.vue'
import { useUserStore } from '../stores/user'
import { useProjectStore } from '../stores/project'

const router = useRouter()
const userStore = useUserStore()
const projectStore = useProjectStore()

// storeToRefs 解构 state/getters，保持响应式
const { userInfo } = storeToRefs(userStore)
const { projects } = storeToRefs(projectStore)

const skillList = ref(['HTML', 'CSS', 'JavaScript', 'Vue3', 'Pinia', 'Element Plus', 'Python', 'MySQL', 'Git', 'Node'])
const searchKey = ref('')
const skillLevel = ref(4)

// 明暗模式切换：读取 localStorage 记忆用户选择
const isDark = ref(localStorage.getItem('theme') === 'dark')
watch(isDark, (val) => {
  document.documentElement.classList.toggle('dark', val)
  localStorage.setItem('theme', val ? 'dark' : 'light')
}, { immediate: true })

// 按关键词过滤项目
const filteredProjects = computed(() => {
  if (!searchKey.value.trim()) {
    return projectStore.projects
  }
  return projectStore.projects.filter((p) =>
    p.title.toLowerCase().includes(searchKey.value.toLowerCase()),
  )
})

const goDetail = (id) => {
  router.push({ name: 'ProjectDetail', params: { id } })
}

onMounted(() => {
  console.log('【onMounted】Home 页面已挂载')
})
</script>

<style scoped>
.home-container {
  min-height: 100vh;
}
.main-content {
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
}
.mb20 {
  margin-bottom: 20px;
}
.mt12 {
  margin-top: 12px;
}
.ml6 {
  margin-left: 6px;
}
.profile {
  display: flex;
  align-items: center;
  gap: 16px;
}
.avatar {
  background: #1677ff;
  flex-shrink: 0;
}
.profile-info h2 {
  margin: 0 0 6px;
}
.card-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}
.head-right {
  display: flex;
  align-items: center;
  gap: 10px;
}
.theme-switch {
  flex-shrink: 0;
}
.skill-tag {
  margin: 0 8px 8px 0;
}
</style>
