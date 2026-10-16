# 实验四 · 状态管理与 UI 组件库应用（Pinia + Element Plus）

在**实验三**（Vue3 + Vue Router 个人主页）基础上：
1. 引入 **Pinia** 全局状态管理，新增文章列表、文章管理页面，结合路由守卫实现登录访问控制；
2. 引入 **Element Plus** 组件库，用布局/菜单/表格/表单/对话框/时间线等组件全面重构界面。

## 一、运行方式

```bash
# 进入项目目录
cd experiment4

# 安装依赖（首次）
npm install

# 启动开发服务器
npm run dev
# 浏览器访问 http://localhost:5173
```

登录账号：`longyuanxiang`　密码：`123456`

## 二、项目结构

```
experiment4/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.js              # 注册 Pinia + Router
    ├── App.vue
    ├── router/
    │   └── index.js         # 路由 + 全局前置守卫（beforeEach）
    ├── stores/              # ★ 实验四核心：三个 Store
    │   ├── user.js          # 用户 Store（登录状态 + 个人信息）
    │   ├── project.js       # 项目 Store（项目 CRUD）
    │   └── article.js       # 文章 Store（文章 CRUD）
    ├── components/
    │   ├── PageHeader.vue / PageFooter.vue
    │   ├── PersonCard / PersonDetail / PersonEdit
    │   ├── SkillSearch.vue
    │   └── ProjectCard.vue
    └── views/
        ├── Home.vue            # 首页（个人信息/技能/项目，均来自 Store）
        ├── About.vue / NotFound.vue / Project.vue
        ├── Login.vue           # 登录（调用 userStore.login）
        ├── Admin.vue           # 后台管理外壳（登录后可见）
        ├── AdminEditInfo.vue   # 编辑个人信息（调用 updateInfo）
        ├── ProjectList.vue / ProjectDetail.vue   # 项目展示（用 projectStore）
        ├── ProjectManage.vue   # ★ 项目管理（增删改查，需登录）
        ├── ArticleList.vue / ArticleDetail.vue   # ★ 文章展示（公开）
        └── ArticleManage.vue   # ★ 文章管理（增删改查，需登录）
```

## 三、三个 Store 的数据结构

| Store | state | getters | actions |
| --- | --- | --- | --- |
| `user` | `userInfo`(对象)、`token`(登录标记) | `isLogin`、`userName`、`stuNo` | `login()`、`logout()`、`updateInfo()` |
| `project` | `projects`(数组)、`nextId` | `projectCount`、`getProjectById(id)`、`categoryList` | `addProject()`、`updateProject()`、`deleteProject()`、`persist()` |
| `article` | `articles`(数组)、`nextId` | `articleCount`、`getArticleById(id)`、`categoryList` | `addArticle()`、`updateArticle()`、`deleteArticle()`、`persist()` |

## 四、关键知识点与对应代码位置

1. **Pinia 注册**：`main.js` 中 `app.use(createPinia())`。
2. **定义 Store**：`stores/*.js` 用 `defineStore('user' | 'project' | 'article', {...})`。
3. **state / getters / actions**：
   - `state`：响应式数据（相当于组件的 data）；
   - `getters`：基于 state 的派生计算值（相当于 computed），带缓存；
   - `actions`：修改状态的唯一推荐入口，支持同步/异步。
4. **storeToRefs**：`Home.vue`、`AdminEditInfo.vue`、`ProjectList.vue` 等用
   `const { userInfo, projects } = storeToRefs(store)` 解构，解构后仍保持响应式；actions 直接 `store.login()` 使用。
5. **localStorage 持久化**：
   - 初始化：`state: () => ({ data: JSON.parse(localStorage.getItem(key)) || 默认 })`；
   - 修改后：在 `actions` 内 `localStorage.setItem(key, JSON.stringify(this.data))`。
   - 涉及键：`user_info`、`user_token`、`project_list`、`article_list` 等。
6. **路由守卫 + Store**：`router/index.js` 的 `beforeEach` 中**在守卫函数内部**调用
   `useUserStore()`（确保 Pinia 已初始化），读取 `isLogin`：
   ```js
   router.beforeEach((to) => {
     const userStore = useUserStore()
     if (to.meta.requiresAuth && !userStore.isLogin) {
       return { name: 'Login', query: { redirect: to.fullPath } }
     }
   })
   ```
   `/admin` 及子路由设置 `meta: { requiresAuth: true }`，未登录自动跳转登录页。

## 五、actions 的调用时机（供实验报告填写）

| action | 调用时机 | 触发场景 |
| --- | --- | --- |
| `userStore.login(form)` | 点击「登录」按钮 | `Login.vue` 校验账号密码 |
| `userStore.logout()` | 点击「退出登录」 | `Admin.vue` |
| `userStore.updateInfo(info)` | 点击「保存修改」 | `AdminEditInfo.vue` |
| `projectStore.addProject / updateProject / deleteProject` | 提交表单 / 点编辑 / 点删除 | `ProjectManage.vue` |
| `articleStore.addArticle / updateArticle / deleteArticle` | 提交表单 / 点编辑 / 点删除 | `ArticleManage.vue` |

## 六、Element Plus 组件清单（共 20+ 种，满足"不少于 10 种"要求）

在 `main.js` 中**全局注册** Element Plus（`app.use(ElementPlus, { locale: zhCn })`）并全局注册所有图标。

| 组件 | 作用 | 使用位置 |
| --- | --- | --- |
| `el-container` / `el-header` / `el-main` / `el-footer` | 整体布局（头部导航 / 主内容 / 底部） | Home.vue、PageHeader、PageFooter |
| `el-menu` / `el-menu-item` | 顶部导航菜单（router 模式，index=路由路径） | PageHeader.vue |
| `el-icon` | 菜单/按钮中的图标 | PageHeader、Admin、各按钮 |
| `el-row` / `el-col` | 响应式栅格（左右两栏、文章卡片网格） | Home、ArticleList |
| `el-card` | 卡片容器（个人信息卡、项目卡、文章卡、管理面板） | Home、Admin、各列表/详情/管理页 |
| `el-avatar` | 头像展示 | Home |
| `el-descriptions` / `el-descriptions-item` | 描述列表（个人信息、文章元信息、项目详情） | Home、ArticleDetail、ProjectDetail、AdminEditInfo |
| `el-tag` | 标签（班级、学号、分类标签） | Home、列表/管理/详情 |
| `el-rate` | 评分（只读展示前端技能熟练度） | Home |
| `el-timeline` / `el-timeline-item` | **时间线**：展示个人成长经历 | Home |
| `el-divider` | 分割线 | Home、ArticleDetail |
| `el-input` | 输入框（搜索框、登录/编辑表单） | Home、Login、AdminEditInfo、对话框表单 |
| `el-button` | 按钮（主按钮/链接按钮/危险按钮） | 全站 |
| `el-form` / `el-form-item` | 表单（登录、个人信息编辑、对话框内新增/编辑） | Login、AdminEditInfo、ArticleManage、ProjectManage |
| `el-table` / `el-table-column` | 表格列表（项目列表、文章列表、后台管理列表） | Home、ProjectList、ArticleManage、ProjectManage |
| `el-dialog` | **对话框**：新增/编辑文章、新增/编辑项目 | ArticleManage、ProjectManage |
| `el-popconfirm` | 删除前的气泡确认 | ArticleManage、ProjectManage |
| `el-radio-group` / `el-radio-button` | 文章分类筛选切换 | ArticleList |
| `el-empty` | 空数据提示 | 各列表/详情页 |
| `ElMessage` | 消息提示（登录成功/保存/删除等，脚本中调用） | Login、Admin、AdminEditInfo、管理页 |

## 七、用 Vue DevTools 观察

1. 安装浏览器扩展「Vue.js devtools」→ 打开页面。
2. 「Pinia」面板可看到 `user / project / article` 三个 Store 的实时 state。
3. 在管理页新增/删除文章或项目、登录/退出，观察对应 Store 的 state 即时变化；
   在「Components」面板查看组件内解构出的响应式数据同步刷新。

架构示意参见 `docs/architecture.html`（浏览器打开即可）。
