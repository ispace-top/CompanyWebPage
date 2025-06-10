<template>
  <footer class="footer">
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
  background: var(--primary-color);
  padding: var(--spacing-lg) 0;
  color: var(--text-light);
  text-align: center;
}
</style>