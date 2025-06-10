<template>
  <header class="header">
    <div class="container">
      <!-- Logo区域 -->
      <div class="logo-area">
        <img 
          v-if="siteInfo.logo_url"
          :src="siteInfo.logo_url" 
          alt="企业Logo" 
          class="logo" 
        />
        <h1 class="title">{{ siteInfo.site_title }}</h1>
      </div>
      
      <!-- 导航菜单 -->
      <nav class="nav">
        <a 
          v-for="(menu, index) in siteInfo.nav_menus" 
          :key="index" 
          :href="menu.path" 
          class="nav-item"
        >
          {{ menu.name }}
        </a>
      </nav>
      
      <!-- 右侧功能区 -->
      <div class="actions">
        <button class="contact-btn">联系我们</button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  siteInfo: {
    type: Object,
    default: () => ({
      site_title: '企业官网',
      nav_menus: []
    })
  }
})
</script>

<style scoped>
.header {
  background: var(--primary-color);
  padding: 0.8rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  inset-block-start: 0;
  z-index: 100;
}

.container {
  max-inline-size: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
}

.logo-area {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo { 
  block-size: 45px;
  object-fit: contain;
}

.title { 
  margin: 0; 
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--text-light);
}

.nav {
  display: flex;
  gap: 1.8rem;
}

.nav-item {
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  font-size: 1.05rem;
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.3s ease;
}

.nav-item:hover {
  color: white;
}

.nav-item::after {
  content: '';
  position: absolute;
  inset-block-end: 0;
  inset-inline-start: 0;
  inline-size: 0;
  block-size: 2px;
  background: white;
  transition: width 0.3s ease;
}

.nav-item:hover::after {
  inline-size: 100%;
}

.contact-btn {
  background: transparent;
  color: white;
  border: 1.5px solid white;
  border-radius: 4px;
  padding: 0.5rem 1.2rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.contact-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}
</style>