<template>
  <div class="setup-container">
    <h1>网站初始化配置</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-item">
        <label>网站标题：</label>
        <input v-model="form.siteTitle" placeholder="请输入网站标题" required>
      </div>
      <div class="form-item">
        <label>管理员密码：</label>
        <input type="password" v-model="form.adminPassword" placeholder="请设置管理员密码" required>
      </div>
      <button type="submit" class="submit-btn">完成初始化</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const form = ref({
  siteTitle: '',
  adminPassword: ''
});
const router = useRouter();

const handleSubmit = async () => {
  try {
    // 调用服务端初始化接口（需提前在服务端实现）
    await axios.post('/api/setup', form.value);
    router.push('/'); // 初始化成功后跳转到首页
  } catch (error) {
    alert(error.response?.data?.message || '初始化失败，请重试');
  }
};
</script>

<style scoped>
.setup-container {
  max-inline-size: 500px;
  margin: 5rem auto;
  padding: 2rem;
  box-shadow: 0 0 10px #eee;
}
.form-item {
  margin-block-end: 1.5rem;
}
label {
  display: inline-block;
  inline-size: 80px;
}
input {
  padding: 0.5rem;
  inline-size: 300px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.submit-btn {
  background: var(--primary-color);
  color: var(--text-light);
  border: none;
  border-radius: var(--border-radius);
  padding: var(--spacing-sm) var(--spacing-lg);
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  background: var(--secondary-color);
  transform: translateY(-2px);
  box-shadow: var(--box-shadow);
}
</style>