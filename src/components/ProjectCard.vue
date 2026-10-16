<template>
  <div class="project-card">
    <h3 class="p-title"><slot name="title">项目</slot></h3>
    <div class="p-body"><slot>暂无内容</slot></div>
    <div class="p-footer"><slot name="footer"></slot></div>
  </div>
</template>

<script setup></script>

<style scoped>
.project-card {
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  background: #fafcff;
}
.p-title {
  margin: 0 0 8px;
}
.p-body {
  color: #444;
  font-size: 14px;
}
.p-footer {
  margin-top: 12px;
}
.p-footer button {
  padding: 6px 12px;
  border: 1px solid #1677ff;
  color: #1677ff;
  background: #fff;
  border-radius: 6px;
  cursor: pointer;
}
.p-footer button:hover {
  background: #1677ff;
  color: #fff;
}
</style>
