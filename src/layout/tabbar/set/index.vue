<template>
  <el-button
    size="small"
    icon="Refresh"
    circle
    @click="updateRefsh"
  ></el-button>
  <el-button
    size="small"
    icon="FullScreen"
    circle
    @click="fullScreen"
  ></el-button>
  <el-button size="small" icon="Setting" circle></el-button>

  <img :src="userStore.userStateList.avatar" />

  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.userStateList.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import useLayOutSettingStore from '@/store/modules/setting'
import useUserStore from '@/store/modules/user'
import { useRouter, useRoute } from 'vue-router'
//数据
//路由
const router = useRouter()
const route = useRoute()
//仓库
let layOutSettingStore = useLayOutSettingStore()
let userStore = useUserStore()
//方法
const updateRefsh = () => {
  layOutSettingStore.refsh = !layOutSettingStore.refsh
}
const fullScreen = () => {
  //DOM对象的一个属性:可以用来判断当前是不是全屏模式[全屏:true,不是全屏:false]
  //可能会有兼容问题，可以使用插件
  let full = document.fullscreenElement
  if (!full) {
    //文档根节点的方法requestFullscreen,实现全屏模式
    document.documentElement.requestFullscreen()
  } else {
    //变为不是全屏模式->退出全屏模式
    document.exitFullscreen()
  }
}
const logout = () => {
  userStore.userLogout()
  router.push({ path: '/login', query: { redirect: route.path } })
}
</script>

<style scoped lang="scss">
img {
  margin: 0px 12px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
}
</style>
