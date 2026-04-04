<template>
  <aside class="sidebar">
    <div class="category-section card">
      <h3 class="section-title">接口分类</h3>

      <!-- 加载状态 -->
      <div v-if="loading" class="loading-container">
        <el-skeleton :rows="8" animated />
      </div>

      <!-- 错误状态 -->
      <div v-else-if="error" class="error-container">
        <el-empty description="获取分类失败" />
        <el-button type="primary" size="small" @click="fetchCategoriesData"
          >重试</el-button
        >
      </div>

      <!-- 分类列表 -->
      <div v-else class="category-list">
        <div
          v-for="category in categories"
          :key="category.id"
          class="category-item"
          :class="{ active: activeCategory === category.id }"
          @click="handleCategoryClick(category.id)"
        >
          <el-icon :size="18" class="category-icon">
            <component :is="getCategoryIcon(category.name)" />
          </el-icon>
          <span class="category-name">{{ category.name }}</span>
          <span class="category-count">{{ category.count }}</span>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as ElementPlusIcons from "@element-plus/icons-vue";
import { fetchCategories } from "../mock";
import type { ApiCategory } from "../types";

const emit = defineEmits(["categoryChange"]);

const activeCategory = ref("all");
const categories = ref<ApiCategory[]>([]);
const loading = ref(false);
const error = ref(false);

const fetchCategoriesData = async () => {
  loading.value = true;
  error.value = false;

  try {
    const data = await fetchCategories();
    categories.value = data;
  } catch (err) {
    console.error("Failed to fetch categories:", err);
    error.value = true;
  } finally {
    loading.value = false;
  }
};

const handleCategoryClick = (categoryId: string) => {
  activeCategory.value = categoryId;
  emit("categoryChange", categoryId);
};

// 为不同分类映射图标
const getCategoryIcon = (categoryName: string): string => {
  const iconMap: Record<string, string> = {
    '全部接口': 'Folder',
    '生活查询': 'HomeFilled',
    '识别服务': 'Camera',
    '实用工具': 'Tools',
    '邮件查询': 'Message'
  };
  return iconMap[categoryName] || 'Folder';
};

onMounted(() => {
  fetchCategoriesData();
});
</script>

<style scoped>
.sidebar {
  width: 280px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.category-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.category-item:hover {
  background: var(--bg-light);
}

.category-item.active {
  background: rgba(124, 58, 237, 0.15);
  color: var(--primary-color);
}

.category-icon {
  flex-shrink: 0;
  color: inherit;
}

.category-name {
  flex: 1;
  font-size: 14px;
  font-weight: 500;
}

.category-count {
  font-size: 13px;
  color: var(--text-muted);
  background: var(--bg-light);
  padding: 2px 8px;
  border-radius: 12px;
  min-width: 32px;
  text-align: center;
}

.category-item.active .category-count {
  background: rgba(124, 58, 237, 0.2);
  color: var(--primary-color);
}

.promo-section {
  text-align: center;
}

.promo-icon {
  margin-bottom: 12px;
  display: flex;
  justify-content: center;
}

.promo-title {
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 8px;
}

.promo-desc {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 16px;
}

.promo-btn {
  width: 100%;
}

.loading-container {
  padding: 16px 0;
}

.error-container {
  padding: 20px 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
  }
}
</style>
