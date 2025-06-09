<template>
  <div class="home">
    <!-- 头部组件 -->
    <Header :site-info="siteInfo" />
    <!-- 轮播图（仅当配置开启时显示） -->
    <Banner v-if="siteInfo.component_config.banner" :banner-url="siteInfo.banner_url" />
    <!-- 产品介绍（仅当配置开启时显示） -->
    <ProductIntro v-if="siteInfo.component_config.product_intro" />
    <!-- 客户案例（仅当配置开启时显示） -->
    <CustomerCase v-if="siteInfo.component_config.customer_case" />
    <!-- 在线咨询 -->
    <OnlineConsult :company-info="companyInfo" />
    <!-- 底部 -->
    <Footer :site-info="siteInfo" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getSiteInfo, getCompanyInfo } from '@/services/api'
import Header from '@/components/Header.vue'
import Banner from '@/components/Banner.vue'
import ProductIntro from '@/components/ProductIntro.vue'
import CustomerCase from '@/components/CustomerCase.vue'
import OnlineConsult from '@/components/OnlineConsult.vue'
import Footer from '@/components/Footer.vue'

// 网站信息（从服务端获取）
const siteInfo = ref({})
// 公司信息（从服务端获取）
const companyInfo = ref({})

// 初始化数据
onMounted(async () => {
  try {
    const siteRes = await getSiteInfo()
    siteInfo.value = siteRes.data || {}

    const companyRes = await getCompanyInfo()
    companyInfo.value = companyRes.data || {}
  } catch (error) {
    console.error('数据加载失败:', error)
  }
})
</script>

<style scoped>
.home { min-block-size: 100vh; }
</style>