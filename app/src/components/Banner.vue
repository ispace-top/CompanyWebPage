<template>
  <section class="banner">
    <img 
      :src="bannerUrl" 
      alt="网站轮播图" 
      class="banner-img"
      v-if="bannerUrl"
    />
  </section>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  bannerUrl: { type: String, default: '' }
})
</script>

<style scoped>
.banner { height: 400px; overflow: hidden; }
.banner-img { width: 100%; height: 100%; object-fit: cover; }
</style>