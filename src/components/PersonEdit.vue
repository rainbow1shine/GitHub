<template>
  <div class="edit">
    <div class="row">
      <label>姓名</label>
      <input v-model="person.name" />
    </div>
    <div class="row">
      <label>学号</label>
      <input v-model="person.stuId" />
    </div>
    <div class="row">
      <label>班级</label>
      <input v-model="person.className" />
    </div>
    <div class="row">
      <label>简介</label>
      <textarea v-model="person.desc" rows="4"></textarea>
    </div>
    <div class="row">
      <label>邮箱</label>
      <input v-model="person.email" />
    </div>
    <p class="tip">
      此处修改会实时同步到全局 User Store 的 userInfo（演示跨组件共享）；如需持久化保存，请到「后台管理 → 编辑个人信息」调用 updateInfo action。
    </p>
  </div>
</template>

<script setup>
// person 直接绑定 User Store 中的 userInfo（reactive 对象，v-model 修改即更新 Store 状态）
defineProps({
  person: { type: Object, required: true },
})
</script>

<style scoped>
.edit {
  margin-top: 16px;
  padding: 14px;
  border: 1px dashed #ccc;
  border-radius: 10px;
}
.row {
  margin: 10px 0;
}
label {
  display: inline-block;
  width: 70px;
}
input,
textarea {
  width: 280px;
  max-width: 100%;
  padding: 6px;
}
.tip {
  color: #999;
  font-size: 12px;
}
</style>
