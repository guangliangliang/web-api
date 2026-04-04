<template>
  <div class="home-page">
    <div class="header-section">
      <h2 class="page-title">探索免费 API 接口</h2>
      <p class="page-subtitle">
        覆盖 AI、数据、开发、生活等多个领域，免费、稳定、开箱即用
      </p>
    </div>

    <div class="filter-section card">
      <div class="filter-tabs">
        <el-button
          v-for="filter in filters"
          :key="filter.key"
          :type="activeFilter === filter.key ? 'primary' : 'default'"
          size="small"
          @click="handleFilterChange(filter.key)"
        >
          {{ filter.label }} {{ filter.count }}
        </el-button>
      </div>
    </div>

    <!-- 加载状态 -->
    <div v-if="loading" class="loading-container">
      <el-skeleton :rows="3" animated />
      <div class="api-grid">
        <el-skeleton
          :rows="4"
          animated
          v-for="i in 6"
          :key="i"
          class="api-card card"
        />
      </div>
    </div>

    <!-- 错误提示 -->
    <div v-else-if="error" class="error-container">
      <el-empty description="获取API列表失败" />
      <el-button type="primary" @click="fetchApisData">重试</el-button>
    </div>

    <!-- API列表 -->
    <div v-else class="api-grid">
      <div
        v-for="api in apiList"
        :key="api.id"
        class="api-card card"
        @click="handleApiClick(api)"
      >
        <div class="api-header">
          <div class="api-icon-wrapper">
            <div class="api-icon">
              <el-icon v-if="api.icon" :size="20">
                <component :is="api.icon" />
              </el-icon>
              <span v-else class="api-first-char">{{ api.firstChar }}</span>
            </div>
            <div class="api-info">
              <div class="api-name">
                {{ api.name }}
                <span v-if="api.is_free === 1" class="tag tag-free">免费</span>
              </div>
              <p class="api-desc">{{ api.description }}</p>
            </div>
          </div>
        </div>

        <div class="api-path">
          <span
            :class="['tag', api.method === 'POST' ? 'tag-post' : 'tag-get']"
          >
            {{ api.method }}
          </span>
          <span class="path-text">{{ api.path }}</span>
        </div>
      </div>
    </div>

    <div class="pagination">
      <p class="pagination-text">共 {{ apiList.length }} 个接口</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import * as ElementPlusIcons from "@element-plus/icons-vue";
import { fetchApis } from "../mock";

const props = defineProps<{
  selectedCategory: string;
  searchQuery: string;
}>();

const emit = defineEmits(["openDrawer", "apiSelected"]);

const activeFilter = ref("all");
const apiList = ref([]);
const loading = ref(false);
const error = ref(false);

const filters = [
  { key: "all", label: "全部", count: 0 },
  { key: "free", label: "免费", count: 0 },
  { key: "http", label: "HTTP", count: 0 },
  { key: "get", label: "GET", count: 0 },
  { key: "post", label: "POST", count: 0 },
];

const fetchApisData = async (category?: string) => {
  loading.value = true;
  error.value = false;

  try {
    const data = await fetchApis(category);

    // 应用搜索过滤
    let filteredData = data;
    if (props.searchQuery) {
      const query = props.searchQuery.toLowerCase();
      filteredData = data.filter(
        (api: any) =>
          api.name.toLowerCase().includes(query) ||
          api.description.toLowerCase().includes(query) ||
          api.path.toLowerCase().includes(query),
      );
    }

    apiList.value = filteredData;

    // 更新筛选器计数
    filters[0].count = filteredData.length;
    filters[1].count = filteredData.filter(
      (api: any) => api.is_free === 1,
    ).length;
    filters[2].count = filteredData.length; // HTTP 计数
    filters[3].count = filteredData.filter(
      (api: any) => api.method === "GET",
    ).length;
    filters[4].count = filteredData.filter(
      (api: any) => api.method === "POST",
    ).length;
  } catch (err) {
    console.error("Failed to fetch APIs:", err);
    error.value = true;
  } finally {
    loading.value = false;
  }
};

const handleFilterChange = (filterKey: string) => {
  activeFilter.value = filterKey;

  // 刷新数据，让搜索和分类过滤重新应用
  fetchApisData(props.selectedCategory);
};

const handleApiClick = (api: any) => {
  emit("apiSelected", api);
  emit("openDrawer");
};

// 监听分类变化
watch(
  () => props.selectedCategory,
  (newCategory) => {
    fetchApisData(newCategory);
  },
  { immediate: true },
);

// 监听搜索关键词变化
watch(
  () => props.searchQuery,
  () => {
    fetchApisData(props.selectedCategory);
  },
);

onMounted(() => {
  fetchApisData(props.selectedCategory);
});
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
  background: linear-gradient(
    90deg,
    var(--text-primary) 0%,
    var(--primary-hover) 100%
  );
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
  background: linear-gradient(
    90deg,
    var(--primary-color) 0%,
    var(--primary-hover) 100%
  );
  border-color: var(--primary-color);
  color: #fff;
}

.loading-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.error-container {
  text-align: center;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
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
  transition: all 0.2s ease;
}

.api-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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

.api-first-char {
  font-size: 18px;
  font-weight: 600;
  color: var(--primary-color);
  text-transform: uppercase;
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
