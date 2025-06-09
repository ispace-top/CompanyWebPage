<template>
  <div class="error-page">
    <h1>系统错误</h1>
    <p>错误代码: {{ $route.query.code }}</p>
    <p>错误信息: {{ errorMessage }}</p>
    <button @click="goHome">返回首页</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const errorMessage = ref({
  'INIT_CHECK_FAIL': '初始化状态检查失败，请检查后端服务',
}[router.currentRoute.value.query.code] || '未知错误');

const goHome = () => router.push('/');
</script>