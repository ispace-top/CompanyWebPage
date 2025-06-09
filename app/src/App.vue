<template>
  <div v-if="loading" class="loading-screen">
    <p>加载中...</p>
  </div>
  <div v-else-if="error" class="error-screen">
    <p>加载失败: {{ error }}</p>
    <button @click="retry">重试</button>
  </div>
  <div v-else>
    <Header :site-info="siteInfo" />
    <router-view />
    <Footer :site-info="siteInfo" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getSiteInfo } from '@/services/api';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

const siteInfo = ref({});
const loading = ref(true);
const error = ref(null);

const fetchData = async () => {
  try {
    loading.value = true;
    error.value = null;
    console.log('[App] 开始获取网站信息');
    const res = await getSiteInfo();
    siteInfo.value = res.data || {};
    console.log('[App] 网站信息获取成功', siteInfo.value);
  } catch (err) {
    console.error('[App] 获取网站信息失败:', err);
    error.value = err.message || '未知错误';
  } finally {
    loading.value = false;
  }
};

const retry = () => fetchData();

onMounted(fetchData);
</script>

<style>
.loading-screen, .error-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  block-size: 100vh;
  flex-direction: column;
}
</style>