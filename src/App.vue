<template>
  <div class="app">
    <Header />
    <div class="main-container">
      <Sidebar />
      <main class="content">
        <router-view @open-drawer="showDrawer = true" />
      </main>
    </div>
    <ApiDetailDrawer v-if="showDrawer" @close="showDrawer = false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import ApiDetailDrawer from './components/ApiDetailDrawer.vue'

const showDrawer = ref(false)
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
