<template>
  <div class="home-page">
    <div class="header-section">
      <h2 class="page-title">探索 156+ 个免费 API 接口</h2>
      <p class="page-subtitle">覆盖 AI、数据、开发、生活等多个领域，免费、稳定、开箱即用</p>
    </div>

    <div class="filter-section card">
      <div class="filter-tabs">
        <el-button
          v-for="filter in filters"
          :key="filter.key"
          :type="activeFilter === filter.key ? 'primary' : 'default'"
          size="small"
          @click="activeFilter = filter.key"
        >
          {{ filter.label }} {{ filter.count }}
        </el-button>
      </div>
    </div>

    <div class="api-grid">
      <div
        v-for="api in apiList"
        :key="api.id"
        class="api-card card"
        @click="handleApiClick(api)"
      >
        <div class="api-header">
          <div class="api-icon-wrapper">
            <div class="api-icon">
              <el-icon :size="20">
                <component :is="api.icon" />
              </el-icon>
            </div>
            <div class="api-info">
              <div class="api-name">
                {{ api.name }}
                <span v-if="api.isFree" class="tag tag-free">免费</span>
              </div>
              <p class="api-desc">{{ api.description }}</p>
            </div>
          </div>
        </div>

        <div class="api-path">
          <span :class="['tag', api.method === 'POST' ? 'tag-post' : 'tag-get']">
            {{ api.method }}
          </span>
          <span class="path-text">{{ api.path }}</span>
        </div>

        <div class="api-stats">
          <div class="stat-item">
            <el-icon size="14" class="stat-icon"><View /></el-icon>
            <span>{{ formatNumber(api.views) }}</span>
          </div>
          <div class="stat-item">
            <el-icon size="14" class="stat-icon"><Star /></el-icon>
            <span>{{ api.rating }}</span>
          </div>
          <div class="stat-item">
            <el-icon size="14" class="stat-icon"><StarFilled /></el-icon>
            <span>{{ api.score }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="pagination">
      <p class="pagination-text">共 156 个接口</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import * as ElementPlusIcons from '@element-plus/icons-vue'
import { apiList } from '../mock'

const emit = defineEmits(['openDrawer'])

const activeFilter = ref('all')
const filters = [
  { key: 'all', label: '全部', count: 156 },
  { key: 'free', label: '免费', count: 156 },
  { key: 'http', label: 'HTTP', count: 120 },
  { key: 'get', label: 'GET', count: 98 },
  { key: 'post', label: 'POST', count: 58 }
]

const formatNumber = (num: number) => {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + 'k'
  }
  return num.toString()
}

const handleApiClick = (api: any) => {
  emit('openDrawer')
}
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.header-section {
  margin-bottom: 8px;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 8px;
  background: linear-gradient(90deg, var(--text-primary) 0%, var(--primary-hover) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  font-size: 15px;
  color: var(--text-secondary);
  margin: 0;
}

.filter-tabs {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.filter-tabs :deep(.el-button) {
  background: var(--bg-light);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
}

.filter-tabs :deep(.el-button:hover) {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.filter-tabs :deep(.el-button.is-active) {
  background: linear-gradient(90deg, var(--primary-color) 0%, var(--primary-hover) 100%);
  border-color: var(--primary-color);
  color: #fff;
}

.api-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}

.api-card {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.api-header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.api-icon-wrapper {
  display: flex;
  gap: 12px;
  flex: 1;
}

.api-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: rgba(124, 58, 237, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
  flex-shrink: 0;
}

.api-info {
  flex: 1;
  min-width: 0;
}

.api-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.api-desc {
  font-size: 13px;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.api-path {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: var(--bg-light);
  border-radius: 8px;
  font-family: monospace;
  font-size: 13px;
}

.path-text {
  flex: 1;
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.api-stats {
  display: flex;
  align-items: center;
  gap: 20px;
  padding-top: 4px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: var(--text-muted);
}

.stat-icon {
  color: var(--text-muted);
}

.pagination {
  text-align: center;
  padding: 20px 0;
}

.pagination-text {
  color: var(--text-muted);
  font-size: 13px;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 24px;
  }

  .api-grid {
    grid-template-columns: 1fr;
  }
}
</style>
