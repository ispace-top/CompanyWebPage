<template>
  <section class="online-consult">
    <h2>在线咨询</h2>
    <div class="contact-methods">
      <div v-if="companyInfo.phone" class="contact-item">
        <span>电话：</span>
        <a :href="`tel:${companyInfo.phone}`">{{ companyInfo.phone }}</a>
      </div>
      <div v-if="companyInfo.email" class="contact-item">
        <span>邮箱：</span>
        <a :href="`mailto:${companyInfo.email}`">{{ companyInfo.email }}</a>
      </div>
      <div v-if="companyInfo.wechat" class="contact-item">
        <span>微信：</span>
        {{ companyInfo.wechat }}
      </div>
    </div>
  </section>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  companyInfo: {
    type: Object,
    default: () => ({})
  }
})
</script>

<style scoped>
.online-consult {
  padding: 2rem;
  background: #f8f8f8;
}
.contact-item {
  margin: 0.5rem 0;
}
</style>