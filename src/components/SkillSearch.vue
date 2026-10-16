<template>
  <div class="skill-search">
    <h3>技能清单（defineModel 双向绑定）</h3>
    <input v-model="searchKey" placeholder="输入关键词过滤技能..." />
    <div class="skills">
      <span v-for="s in skillList" :key="s" class="tag">{{ s }}</span>
    </div>
    <p v-if="skillList.length === 0" class="empty">没有匹配的技能</p>
  </div>
</template>

<script setup>
defineProps({
  skillList: { type: Array, default: () => [] },
})
// defineModel：父组件通过 v-model:search-key 双向绑定
const searchKey = defineModel('searchKey', { type: String, default: '' })
</script>

<style scoped>
.skill-search {
  margin-top: 18px;
}
.skill-search h3 {
  margin-bottom: 8px;
}
input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}
.tag {
  background: #eef4ff;
  color: #1677ff;
  padding: 4px 10px;
  border-radius: 14px;
  font-size: 13px;
}
.empty {
  color: #999;
}
</style>
