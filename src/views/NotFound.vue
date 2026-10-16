<template>
  <div class="page">
    <h1>404 页面不存在</h1>
    <button @click="$router.push('/home')">返回首页</button>
  </div>
</template>

<script setup></script>

<style scoped>
.page {
  padding: 2rem;
  text-align: center;
}
button {
  padding: 8px 16px;
  border: 1px solid #1677ff;
  color: #1677ff;
  background: #fff;
  border-radius: 6px;
  cursor: pointer;
}
</style>
