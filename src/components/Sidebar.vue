<template>
  <aside class="sidebar">
    <div class="category-section card">
      <h3 class="section-title">接口分类</h3>
      <div class="category-list">
        <div
          v-for="category in categories"
          :key="category.id"
          class="category-item"
          :class="{ active: activeCategory === category.id }"
          @click="activeCategory = category.id"
        >
          <el-icon :size="18" class="category-icon">
            <component :is="category.icon" />
          </el-icon>
          <span class="category-name">{{ category.name }}</span>
          <span class="category-count">{{ category.count }}</span>
        </div>
      </div>
    </div>

    <div class="promo-section card">
      <div class="promo-icon">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 2L10 14V46L30 58L50 46V14L30 2Z" fill="url(#promoGradient)" />
          <path d="M30 18L37.5 22.5V37.5L30 42L22.5 37.5V22.5L30 18Z" fill="#fff" opacity="0.8" />
          <defs>
            <linearGradient id="promoGradient" x1="30" y1="2" x2="30" y2="58" gradientUnits="userSpaceOnUse">
              <stop stop-color="#7c3aed" />
              <stop offset="1" stop-color="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <h3 class="promo-title">完全免费</h3>
      <p class="promo-desc">所有接口免费开放，无限制调用，无需注册</p>
      <el-button class="promo-btn" type="primary" size="default">查看使用指南</el-button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import * as ElementPlusIcons from '@element-plus/icons-vue'
import { categories } from '../mock'

const activeCategory = ref('all')
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

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
  }
}
</style>
