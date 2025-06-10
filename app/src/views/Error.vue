<template>
  <div class="error-container">
    <div class="error-card">
      <div class="error-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
      </div>
      <h1 class="error-title">系统错误</h1>
      
      <div class="error-details">
        <div class="error-code">
          <span class="label">错误代码:</span>
          <span class="value">{{ $route.query.code || 'N/A' }}</span>
        </div>
        
        <div class="error-message">
          <span class="label">错误信息:</span>
          <span class="value">{{ errorMessage }}</span>
        </div>
        
        <div v-if="$route.query.message" class="error-description">
          <span class="label">详情:</span>
          <span class="value">{{ decodeURIComponent($route.query.message) }}</span>
        </div>
      </div>
      
      <button class="home-button" @click="goHome">
        返回首页
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const errorMessage = ref('');

// 更新错误信息
const updateErrorMessage = () => {
  errorMessage.value = {
    'INIT_CHECK_FAIL': '初始化状态检查失败，请检查后端服务',
    'API_ERROR': '接口请求失败',
    'AUTH_FAIL': '认证失败，请重新登录'
  }[route.query.code] || '未知错误';
};

// 监听路由变化
watch(() => route.query, updateErrorMessage, { immediate: true });

const goHome = () => router.push('/');
</script>

<style scoped>
.error-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 1rem;
}

.error-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  max-width: 600px;
  width: 100%;
  text-align: center;
}

.error-icon {
  margin-bottom: 1.5rem;
}

.error-icon svg {
  width: 80px;
  height: 80px;
  fill: #ff6b6b;
}

.error-title {
  color: #2d3436;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
}

.error-details {
  text-align: left;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.2rem;
  margin-bottom: 1.8rem;
}

.error-details > div {
  margin-bottom: 0.8rem;
  display: flex;
}

.error-details > div:last-child {
  margin-bottom: 0;
}

.label {
  font-weight: 600;
  color: #495057;
  min-width: 80px;
}

.value {
  color: #e74c3c;
  flex: 1;
  word-break: break-word;
}

.home-button {
  background: #2D3446;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.home-button:hover {
  background: #3a4157;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(45, 52, 70, 0.2);
}

/* 响应式设计 */
@media (max-width: 600px) {
  .error-card {
    padding: 1.5rem;
  }
  
  .error-details > div {
    flex-direction: column;
  }
  
  .label {
    margin-bottom: 0.3rem;
  }
}
</style>