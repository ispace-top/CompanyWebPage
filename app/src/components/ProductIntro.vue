<template>
  <section class="product-intro">
    <h2>产品与服务</h2>
    <div v-if="products.length > 0" class="product-list">
      <div v-for="(product, index) in products" :key="index" class="product-item">
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
      </div>
    </div>
    <p v-else>产品信息加载中...</p>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const products = ref([])
</script>

<style scoped>
.product-intro {
  padding: 2rem 0;
}
.product-item {
  margin: 1.5rem 0;
  padding: 1rem;
  border-left: 3px solid #2D3446;
}
</style>