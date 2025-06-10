<template>
  <div class="admin-container">
    <h1>管理后台</h1>
    <div class="admin-content">
      <nav class="admin-nav">
        <router-link to="/admin/site">网站设置</router-link>
        <router-link to="/admin/company">公司信息</router-link>
        <router-link to="/admin/notifications">通知管理</router-link>
      </nav>
      <div class="admin-main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
// 管理后台主视图
</script>

<style scoped>
.admin-container {
  max-inline-size: 1200px;
  margin: 2rem auto;
  padding: 1rem;
}

.admin-content {
  display: flex;
  margin-block-start: 2rem;
}

.admin-nav {
  inline-size: 200px;
  padding: 1rem;
  background: #f8f8f8;
  border-radius: 4px;
}

.admin-nav a {
  display: block;
  padding: 0.5rem 1rem;
  margin-block-end: 0.5rem;
  text-decoration: none;
  color: #333;
}

.admin-nav a.router-link-active {
  background: #2D3446;
  color: white;
  border-radius: 4px;
}

.admin-main {
  flex: 1;
  padding: 0 2rem;
}
</style>