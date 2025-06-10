<template>
  <div class="home">
    <!-- 移除重复的Header组件 -->
    <!-- 轮播图（仅当配置开启时显示） -->
    <Banner v-if="siteInfo.component_config?.banner" :banner-url="siteInfo.banner_url" />
    <!-- 产品介绍（仅当配置开启时显示） -->
    <ProductIntro v-if="siteInfo.component_config?.product_intro" />
    <!-- 客户案例（仅当配置开启时显示） -->
    <CustomerCase v-if="siteInfo.component_config?.customer_case" />
    <!-- 在线咨询 -->
    <OnlineConsult :company-info="companyInfo" />
    <!-- 移除重复的Footer组件 -->
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getSiteInfo, getCompanyInfo } from '@/services/api'
import Header from '@/components/Header.vue'
import Banner from '@/components/Banner.vue'
import CustomerCase from '@/components/CustomerCase.vue'
import OnlineConsult from '@/components/OnlineConsult.vue'
import ProductIntro from '@/components/ProductIntro.vue'
import Footer from '@/components/Footer.vue'

// 网站信息（从服务端获取）
const siteInfo = ref({
  component_config: {} // 添加默认空对象
})

// 公司信息（从服务端获取）
const companyInfo = ref({})

// 初始化数据
onMounted(async () => {
  try {
    const siteRes = await getSiteInfo()
    console.log('网站信息:', siteRes.data)
    siteInfo.value = siteRes.data || DEFAULT_SITEINFO
    // 确保component_config存在
    if (!siteInfo.value.component_config) {
      siteInfo.value.component_config = {}
    }
    siteInfo.value.nav_menus = [
      { name: '首页', path: '' }, 
      { name: '产品简介', path: '' }, 
      { name: '客户案例', path: '' }, 
      { name: '关于我们', path: '' }, 
    ]
    const companyRes = await getCompanyInfo()
    companyInfo.value = companyRes.data || {}
  } catch (error) {
    console.error('数据加载失败:', error)
  }
})
</script>

<style scoped>
.home {
  min-block-size: 100vh;
}
</style>