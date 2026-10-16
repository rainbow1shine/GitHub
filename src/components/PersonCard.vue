<template>
  <div class="person-card">
    <div class="avatar-box">
      <!-- 头像图片加载失败时显示姓名首字兜底 -->
      <img
        v-if="person.avatar && !imgErr"
        :src="person.avatar"
        alt="头像"
        class="avatar"
        @error="imgErr = true"
      />
      <div v-else class="avatar avatar-fallback">{{ (person.name || '?').slice(0, 1) }}</div>
    </div>
    <div class="info">
      <h2>{{ person.name }}</h2>
      <p class="line">学号：{{ person.stuId }} ｜ 班级：{{ person.className }}</p>
      <p class="desc">{{ person.desc }}</p>
    </div>
    <div class="btns">
      <button @click="$emit('toggle-detail')">{{ isShowDetail ? '收起详情' : '查看详情' }}</button>
      <button @click="$emit('toggle-theme')">切换主题</button>
      <button @click="$emit('toggle-edit')">编辑信息</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  person: { type: Object, required: true },
  isShowDetail: Boolean,
})
defineEmits(['toggle-detail', 'toggle-theme', 'toggle-edit'])

const imgErr = ref(false)
</script>

<style scoped>
.person-card {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
}
.avatar-box {
  flex-shrink: 0;
}
.avatar {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  object-fit: cover;
  background: #eef4ff;
}
.avatar-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 34px;
  color: #1677ff;
  font-weight: bold;
}
.info {
  flex: 1;
  min-width: 220px;
}
.info h2 {
  margin: 0;
}
.line {
  color: #555;
  margin: 6px 0;
}
.desc {
  color: #666;
  font-size: 14px;
}
.btns {
  margin-top: 10px;
}
.btns button {
  margin-right: 8px;
  padding: 6px 12px;
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #fff;
}
.btns button:hover {
  border-color: #1677ff;
  color: #1677ff;
}
</style>
