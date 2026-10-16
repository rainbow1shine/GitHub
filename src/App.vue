<template>
  <!-- 根组件：仅保留路由出口，各页面内部自行组织布局 -->
  <RouterView />
</template>

<script setup></script>

<style>
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  font-family: 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
  background: #f5f7fa;
}
html.dark body {
  background: #141414;
}
</style>
