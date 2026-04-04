# 集成真实API接口计划

## 项目分析
用户已经开发了后端API接口，通过Swagger文档展示在 http://localhost:3001/api-docs/。现有的前端项目是一个基于Vue 3的FreeAPI展示平台，目前使用模拟数据。

## 后端API接口分析
从Swagger文档可以看到：
1. **用户端-分类**：GET /api/categories - 获取分类列表
2. **用户端-API**：
   - GET /api/apis - 获取API列表
   - GET /api/apis/{id} - 获取API详情
   - POST /api/apis/debug/{id} - 在线测试API
3. **生活查询**：GET /api/tools/life/weather - 天气查询

## 集成计划

### 1. 创建API服务层
- 创建 `src/services/api.ts` 文件
- 实现API调用函数，包括：
  - 获取分类列表
  - 获取API列表
  - 获取API详情
  - 测试API

### 2. 替换模拟数据
- 修改 `src/mock/index.ts` 或创建新的数据源
- 将模拟数据替换为真实API调用
- 保持数据结构兼容

### 3. 完善Home页面
- 修改 `src/views/Home.vue`，使用真实API数据
- 实现分类筛选功能
- 优化API卡片展示

### 4. 完善API详情抽屉
- 实现 `src/components/ApiDetailDrawer.vue`
- 显示真实API详情
- 添加API测试功能

### 5. 完善侧边栏
- 更新 `src/components/Sidebar.vue`，使用真实分类数据
- 实现分类点击功能

### 6. 添加错误处理
- 实现API调用错误处理
- 添加加载状态
- 添加错误提示

### 7. 优化用户体验
- 添加页面加载动画
- 实现数据缓存
- 优化响应速度

## 技术实现
- 使用Fetch API或Axios进行API调用
- 保持TypeScript类型安全
- 遵循Vue 3 Composition API最佳实践
- 确保代码结构清晰可维护

这个计划将使前端项目与后端API完全集成，提供真实的API接口展示和测试功能。