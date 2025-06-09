<template>
  <footer class="footer" :style="{ background: siteInfo.theme_color }">
    <div class="container">
      <p class="copyright">{{ siteInfo.copyright }}</p>
      <p class="record">{{ siteInfo.record_number }}</p>
    </div>
  </footer>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  siteInfo: {
    type: Object,
    default: () => ({
      copyright: '© 2024 企业名称 版权所有',
      record_number: '备案号：XXX-XXXXXX'
    })
  }
})
</script>

<style scoped>
.footer {
  padding: 2rem 0;
  color: white;
  text-align: center;
  margin-top: 2rem;
}
</style>