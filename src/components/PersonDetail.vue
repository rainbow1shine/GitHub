<template>
  <div class="detail">
    <p><strong>姓名：</strong>{{ person.name }}</p>
    <p><strong>学号：</strong>{{ person.stuId }}</p>
    <p><strong>班级：</strong>{{ person.className }}</p>
    <p><strong>简介：</strong>{{ person.desc }}</p>
    <p><strong>邮箱：</strong>{{ person.email }}</p>
  </div>
</template>

<script setup>
defineProps({
  person: { type: Object, required: true },
})
</script>

<style scoped>
.detail {
  margin-top: 16px;
  padding: 14px;
  background: #f7f9fc;
  border-radius: 10px;
  font-size: 14px;
}
.detail p {
  margin: 6px 0;
}
</style>
