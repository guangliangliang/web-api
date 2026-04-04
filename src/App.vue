<template>
  <div class="app">
    <Header @search="handleSearch" />
    <div class="main-container">
      <Sidebar @category-change="handleCategoryChange" />
      <main class="content">
        <router-view 
          @open-drawer="showDrawer = true" 
          @api-selected="handleApiSelected"
          :selected-category="selectedCategory"
          :search-query="searchQuery"
        />
      </main>
    </div>
    <ApiDetailDrawer 
      v-if="showDrawer" 
      @close="showDrawer = false"
      :selected-api="selectedApi"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import ApiDetailDrawer from './components/ApiDetailDrawer.vue'
import type { ApiItem } from './types'

const showDrawer = ref(false)
const selectedApi = ref<ApiItem | null>(null)
const selectedCategory = ref('all')
const searchQuery = ref('')

const handleApiSelected = (api: ApiItem) => {
  selectedApi.value = api
}

const handleCategoryChange = (categoryId: string) => {
  selectedCategory.value = categoryId
}

const handleSearch = (query: string) => {
  searchQuery.value = query
}
</script>

<style scoped>
.app {
  width: 100%;
  min-height: 100vh;
  background: var(--bg-dark);
  color: var(--text-primary);
}

.main-container {
  display: flex;
  max-width: 1920px;
  margin: 0 auto;
  padding: 20px;
  gap: 20px;
}

.content {
  flex: 1;
  min-width: 0;
}

@media (max-width: 768px) {
  .main-container {
    flex-direction: column;
    padding: 10px;
  }
}
</style>
