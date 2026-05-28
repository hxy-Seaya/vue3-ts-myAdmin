<template>
  <el-icon @click="changeIcon">
    <component :is="LayOutSettingStroe.fold ? 'Expand' : 'Fold'"></component>
  </el-icon>
  <el-breadcrumb :separator-icon="ArrowRight">
    <!-- 面包动态展示路由名字与标题 -->
    <el-breadcrumb-item
      v-for="item in route.matched"
      :key="item.path"
      v-show="item.meta.title"
      :to="item.path"
    >
      <!-- 图标 -->
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      <!-- 面包屑展示匹配路由的标题 -->
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'
import useLayOutSettingStore from '@/store/modules/setting'
//数据
let route = useRoute()
//仓库
let LayOutSettingStroe = useLayOutSettingStore()
//方法
const changeIcon = () => {
  LayOutSettingStroe.fold = !LayOutSettingStroe.fold
  console.log(route)
}
</script>

<style scoped lang="scss">
.el-icon {
  margin-right: 10px;
}
</style>
