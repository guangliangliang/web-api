<template>
  <el-drawer
    v-model="visible"
    :size="560"
    direction="rtl"
    :show-close="false"
    :with-header="false"
    class="api-detail-drawer"
    @close="handleClose"
  >
    <div class="drawer-header">
      <div class="header-left">
        <div class="header-icon">
          <el-icon size="22"><ChatDotRound /></el-icon>
        </div>
        <div class="header-info">
          <h3 class="drawer-title">
            AI 对话 <span class="tag tag-free">免费</span>
          </h3>
          <p class="drawer-subtitle">智能对话聊天，支持上下文连续对话</p>
        </div>
      </div>
      <el-button
        circle
        :bg="false"
        icon="Close"
        class="close-btn"
        @click="handleClose"
      >
      </el-button>
    </div>

    <el-tabs v-model="activeTab" class="detail-tabs" type="card">
      <el-tab-pane label="接口文档" name="doc" />
      <el-tab-pane label="在线调试" name="debug" />
      <el-tab-pane label="代码示例" name="code" />
    </el-tabs>

    <div class="tab-content">
      <div class="api-url-section">
        <el-tag
          :type="detail.method === 'POST' ? 'danger' : 'primary'"
          size="large"
          >{{ detail.method }}</el-tag
        >
        <div class="url-text">{{ detail.url }}</div>
        <el-button circle :bg="false" class="copy-btn">
          <el-icon size="16"><Copy /></el-icon>
        </el-button>
      </div>

      <div class="section">
        <h4 class="section-title">请求参数</h4>
        <el-table
          :data="detail.params"
          :show-header="true"
          border
          stripe
          size="small"
        >
          <el-table-column prop="name" label="参数名" width="120" />
          <el-table-column prop="required" label="必填" width="80">
            <template #default="{ row }">
              <el-tag v-if="row.required" type="danger" size="small">是</el-tag>
              <span v-else class="text-muted">否</span>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="类型" width="100" />
          <el-table-column prop="description" label="说明" />
        </el-table>
      </div>

      <div class="section">
        <div class="section-header">
          <h4 class="section-title">请求体</h4>
          <el-button type="text" size="small" class="text-muted"
            >示例</el-button
          >
        </div>
        <div class="code-block">
          <pre><code>{{ detail.requestExample }}</code></pre>
        </div>
      </div>

      <el-button type="primary" class="send-btn" size="large">
        <el-icon><Promotion /></el-icon>
        发送请求
      </el-button>

      <div class="section">
        <div class="section-header">
          <h4 class="section-title">响应说明</h4>
          <div class="response-info">
            <el-tag type="success" size="small">200 OK</el-tag>
            <span class="text-small">932ms</span>
            <span class="text-small">1.2kb</span>
          </div>
        </div>
        <div class="code-block">
          <pre><code>{{ detail.responseExample }}</code></pre>
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { apiDetail } from "../mock";

const emit = defineEmits(["close"]);

const visible = ref(true);
const activeTab = ref("doc");
const detail = apiDetail;

const handleClose = () => {
  visible.value = false;
  setTimeout(() => emit("close"), 300);
};
</script>

<style scoped>
:deep(.api-detail-drawer .el-drawer) {
  background: var(--bg-dark) !important;
  color: var(--text-primary) !important;
  border-left: 1px solid var(--border-color) !important;
}

:deep(.api-detail-drawer .el-drawer__body) {
  padding: 0 !important;
  background: var(--bg-dark) !important;
}

/* 标签页样式 */
:deep(.detail-tabs .el-tabs) {
  --el-tabs-header-padding: 0;
}

:deep(.detail-tabs .el-tabs__nav-wrap) {
  margin: 0 !important;
  background: var(--bg-dark) !important;
  padding: 16px 24px 0 24px !important;
}

:deep(.detail-tabs .el-tabs__nav-wrap::after) {
  background-color: var(--border-color) !important;
}

:deep(.detail-tabs .el-tabs__item) {
  color: var(--text-secondary) !important;
  background: var(--bg-light) !important;
  border: 1px solid var(--border-color) !important;
  border-bottom: none !important;
  border-radius: 6px 6px 0 0 !important;
  height: 36px !important;
  line-height: 36px !important;
  padding: 0 18px !important;
}

:deep(.detail-tabs .el-tabs__item.is-active) {
  background: var(--primary-color) !important;
  color: #fff !important;
  border-color: var(--primary-color) !important;
}

:deep(.detail-tabs .el-tabs__content) {
  display: none !important;
}

/* 表格样式 */
:deep(.el-table) {
  --el-table-bg-color: var(--bg-light) !important;
  --el-table-text-color: var(--text-primary) !important;
  --el-table-border-color: var(--border-color) !important;
  --el-table-header-bg-color: var(--bg-card) !important;
  --el-table-header-text-color: var(--text-secondary) !important;
  --el-table-row-hover-bg-color: var(--bg-card) !important;
  --el-table-tr-bg-color: var(--bg-light) !important;
  border: 1px solid var(--border-color) !important;
  border-radius: 8px !important;
  overflow: hidden !important;
}

:deep(.el-table th) {
  background: var(--bg-card) !important;
  color: var(--text-secondary) !important;
  border-bottom: 1px solid var(--border-color) !important;
  border-right: 1px solid var(--border-color) !important;
}

:deep(.el-table td) {
  background: var(--bg-light) !important;
  color: var(--text-primary) !important;
  border-bottom: 1px solid var(--border-color) !important;
  border-right: 1px solid var(--border-color) !important;
}

:deep(.el-table tr:hover > td) {
  background: var(--bg-card) !important;
}

:deep(.el-table tr:last-child td) {
  border-bottom: none !important;
}

:deep(.el-table td:last-child, :deep(.el-table th:last-child)) {
  border-right: none !important;
}

/* 标签样式 */
:deep(.el-tag--primary) {
  background-color: #3b82f6 !important;
  border-color: #3b82f6 !important;
  color: #fff !important;
}

:deep(.el-tag--danger) {
  background-color: var(--primary-color) !important;
  border-color: var(--primary-color) !important;
  color: #fff !important;
}

:deep(.el-tag--success) {
  background-color: var(--success-color) !important;
  border-color: var(--success-color) !important;
  color: #fff !important;
}

/* 按钮样式 */
:deep(.el-button) {
  color: var(--text-primary) !important;
}

:deep(.el-button:hover) {
  color: var(--primary-color) !important;
  background-color: transparent !important;
}

:deep(.send-btn) {
  background: linear-gradient(
    90deg,
    var(--primary-color) 0%,
    var(--primary-hover) 100%
  ) !important;
  border: none !important;
  color: #fff !important;
}

:deep(.send-btn:hover) {
  opacity: 0.9 !important;
  color: #fff !important;
}

:deep(.api-detail-drawer .el-drawer__body) {
  padding: 0;
}

:deep(.detail-tabs .el-tabs__content) {
  display: none;
}

:deep(.el-table th) {
  background: var(--bg-card);
  color: var(--text-secondary);
}

:deep(.el-table td) {
  background: var(--bg-light);
  color: var(--text-primary);
}

:deep(.el-table tr:hover > td) {
  background: var(--bg-card);
}

:deep(.el-table),
:deep(.el-table__row) {
  --el-table-border-color: var(--border-color);
}

:deep(.el-tag--primary) {
  background-color: #3b82f6;
  border-color: #3b82f6;
}

:deep(.el-tag--danger) {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.drawer-header {
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
}

.header-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(124, 58, 237, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
  flex-shrink: 0;
}

.drawer-title {
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  margin: 0 0 4px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.drawer-subtitle {
  font-size: 13px;
  color: var(--text-secondary);
  margin: 0;
}

.close-btn {
  color: var(--text-secondary);
}

.close-btn:hover {
  color: #fff;
}

.detail-tabs {
  padding: 16px 24px 0 24px;
}

:deep(.detail-tabs .el-tabs__nav-wrap) {
  margin-bottom: 0;
}

:deep(.detail-tabs .el-tabs__nav-wrap::after) {
  background-color: var(--border-color);
}

:deep(.detail-tabs .el-tabs__item) {
  color: var(--text-secondary);
  background: var(--bg-light);
  border: 1px solid var(--border-color);
  border-bottom: none;
}

:deep(.detail-tabs .el-tabs__item.is-active) {
  background: var(--primary-color);
  color: #fff;
  border-color: var(--primary-color);
}

:deep(.el-tabs__content) {
  display: none !important;
}

:deep(.el-button) {
  color: var(--text-primary);
}

:deep(.el-button:hover) {
  color: var(--primary-color);
  background-color: transparent;
}

.tab-content {
  padding: 20px 24px;
  height: calc(100vh - 160px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.api-url-section {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: var(--bg-light);
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.url-text {
  flex: 1;
  font-family: monospace;
  font-size: 13px;
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.copy-btn {
  color: var(--text-secondary);
}

.copy-btn:hover {
  color: var(--primary-color);
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  margin: 0 0 12px 0;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.response-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.text-muted {
  color: var(--text-muted);
}

.text-small {
  font-size: 12px;
  color: var(--text-muted);
}

:deep(.el-table) {
  --el-table-bg-color: var(--bg-light);
  --el-table-border-color: var(--border-color);
  --el-table-text-color: var(--text-primary);
  --el-table-header-text-color: var(--text-secondary);
  --el-table-row-hover-bg-color: var(--bg-card);
  --el-table-tr-bg-color: var(--bg-light);
}

.code-block {
  background: var(--bg-light);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
  max-height: 280px;
  overflow-y: auto;
}

.code-block pre {
  margin: 0;
  color: var(--text-primary);
  font-family: monospace;
  font-size: 13px;
  line-height: 1.6;
}

.send-btn {
  width: 100%;
  font-size: 15px;
  font-weight: 500;
}

@media (max-width: 768px) {
  :deep(.api-detail-drawer .el-drawer) {
    width: 100% !important;
  }

  .tab-content {
    height: calc(100vh - 180px);
  }
}
</style>
