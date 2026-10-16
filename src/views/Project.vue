<template>
  <div class="page">
    <h1>项目中心</h1>
    <!-- 子路由出口：ProjectList / ProjectDetail -->
    <RouterView></RouterView>
  </div>
</template>

<script setup></script>

<style scoped>
.page {
  padding: 2rem;
  max-width: 700px;
  margin: 0 auto;
}
</style>
