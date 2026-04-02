<template>
  <header class="header">
    <div class="header-content">
      <div class="logo-section">
        <div class="logo">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 2L2 10V22L16 30L30 22V10L16 2Z"
              fill="url(#logoGradient)"
            />
            <path
              d="M16 10L22 14V20L16 24L10 20V14L16 10Z"
              fill="#fff"
              opacity="0.8"
            />
            <defs>
              <linearGradient
                id="logoGradient"
                x1="16"
                y1="2"
                x2="16"
                y2="30"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#7c3aed" />
                <stop offset="1" stop-color="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
          <div class="logo-text">
            <h1>FreeAPI</h1>
            <p>免费 · 开放 · 稳定</p>
          </div>
        </div>
      </div>

      <div class="search-section">
        <el-input
          class="search-input"
          placeholder="搜索接口名称、功能、关键词..."
          prefix-icon="Search"
          size="large"
        />
      </div>

      <div class="nav-section">
        <el-button type="text" class="nav-link">API 文档</el-button>
        <el-button type="text" class="nav-link">关于我们</el-button>
        <el-button :bg="false" class="theme-btn" @click="toggleTheme">
          {{ isDark ? "白天" : "黑夜" }}
        </el-button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const isDark = ref(true);

const toggleTheme = () => {
  isDark.value = !isDark.value;
  if (isDark.value) {
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
    localStorage.setItem("theme", "light");
  }
};

onMounted(() => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    isDark.value = false;
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
  } else {
    isDark.value = true;
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("dark");
  }
});
</script>

<style scoped>
.header {
  width: 100%;
  background: var(--bg-dark);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1920px;
  margin: 0 auto;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.logo-section {
  flex-shrink: 0;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.logo-text h1 {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.2;
}

.logo-text p {
  font-size: 12px;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.2;
}

.search-section {
  flex: 1;
  max-width: 600px;
}

.search-input :deep(.el-input__wrapper) {
  background: var(--bg-light);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: none;
}

.search-input :deep(.el-input__wrapper:hover) {
  border-color: var(--primary-color);
}

.search-input :deep(.el-input__inner) {
  color: var(--text-primary);
}

.search-input :deep(.el-input__prefix) {
  color: var(--text-muted);
}

.nav-section {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
}

.nav-link {
  color: var(--text-secondary);
  font-size: 15px;
  padding: 8px 12px;
}

.nav-link:hover {
  color: var(--primary-color);
}

.theme-btn {
  color: var(--text-secondary) !important;
  background: var(--bg-light) !important;
  border: 1px solid var(--border-color) !important;
  height: 40px !important;
  padding: 0 16px !important;
  font-size: 14px !important;
}

.theme-btn:hover {
  color: var(--primary-color) !important;
  border-color: var(--primary-color) !important;
}

@media (max-width: 768px) {
  .search-section {
    display: none;
  }

  .nav-section {
    gap: 10px;
  }
}
</style>
