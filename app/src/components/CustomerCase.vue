<template>
  <section class="customer-case">
    <h2>客户案例</h2>
    <div v-if="cases.length > 0">
      <div v-for="(item, index) in cases" :key="index" class="case-item">
        <img :src="item.logo" alt="客户logo" class="client-logo">
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
      </div>
    </div>
    <p v-else>暂无客户案例</p>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const cases = ref([])
</script>

<style scoped>
.customer-case {
  padding: 2rem 0;
  text-align: center;
}
.case-item {
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #eee;
}
.client-logo {
  max-height: 60px;
  margin-bottom: 1rem;
}
</style>