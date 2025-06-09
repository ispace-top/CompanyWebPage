<template>
  <header class="header" :style="{ background: siteInfo.theme_color }">
    <div class="container">
      <img 
        :src="siteInfo.logo_url" 
        alt="企业Logo" 
        class="logo" 
        v-if="siteInfo.logo_url"
      />
      <h1 class="title">{{ siteInfo.site_title }}</h1>
      <nav class="nav">
        <a 
          v-for="menu in siteInfo.nav_menus" 
          :key="menu.path" 
          :href="menu.path" 
          class="nav-item"
        >
          {{ menu.name }}
        </a>
      </nav>
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
  padding: 1rem 0;
  color: white;
}
.container {
  max-inline-size: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 2rem;
}
.logo { block-size: 40px; }
.title { margin: 0; font-size: 1.5rem; }
.nav { margin-inline-start: auto; display: flex; gap: 2rem; }
.nav-item { color: white; text-decoration: none; }
</style>