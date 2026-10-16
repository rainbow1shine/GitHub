import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // GitHub Pages 基准路径：必须等于你的仓库名（前后带斜杠）
  // 部署后访问地址为 https://rainbow1shine.github.io/GitHub/
  base: '/GitHub/',
  server: {
    port: 5173,
    open: false,
  },
})
