import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// 全局注册 Element Plus 图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 1. Pinia 全局状态管理
app.use(createPinia())
// 2. 路由
app.use(router)
// 3. Element Plus 组件库（实验阶段使用全局注册，中文语言包）
app.use(ElementPlus, { locale: zhCn })

app.mount('#app')
