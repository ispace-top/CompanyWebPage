<template>
  <div class="article-detail">
    <h1>{{ article.title }}</h1>
    <div class="content">{{ article.content }}</div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getArticleDetail } from '@/services/api';

const article = ref({});

onMounted(async () => {
  const res = await getArticleDetail(/* 文章ID */);
  article.value = res.data;
  document.title = `文章详情 - ${article.value.title}`; // 动态设置标题
});
</script>