<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider" :class="{ fold: LayOutSettingStroe.fold }">
      <Logo />
      <!--展示菜单-->
      <el-scrollbar class="scrollbar">
        <el-menu
          :collapse="LayOutSettingStroe.fold"
          background-color="#001529"
          text-color="#fff"
          active-text-color="#ffd04b"
          :default-active="route.path"
        >
          <!--根据路由动态生成菜单-->
          <Menu :menuList="userStore.userStateList.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>

    <!-- 右侧区域（顶部栏 + 主内容） -->
    <div class="layout_right">
      <div class="layout_tabbar">
        <Tabbar />
      </div>
      <div class="layout_main">
        <Main />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from './logo/index.vue'
import Menu from '@/layout/menu/index.vue'
import Main from '@/layout/main/index.vue'
import Tabbar from '@/layout/tabbar/index.vue'
//获取用户相关的小仓库
import useUserStore from '@/store/modules/user'
import useLayOutSettingStore from '@/store/modules/setting'
//获取路由对象
import { useRoute } from 'vue-router'

//仓库
let userStore = useUserStore()
let LayOutSettingStroe = useLayOutSettingStore()

//获取路由对象
let route = useRoute()
</script>

<style scoped lang="scss">
.layout_container {
  display: flex; // 开启 flex 布局
  width: 100%;
  height: 100vh;
  background: white;

  // 左侧菜单：固定宽度，不压缩
  .layout_slider {
    display: flex;
    flex-direction: column;
    width: $base-menu-width;
    flex-shrink: 0;
    height: 100vh;
    background: $base-menu-background;
    transition: all 0.3s;

    &.fold {
      width: $base-menu-min-width;
    }

    // Logo 区域（不压缩）
    .logo {
      flex-shrink: 0;
    }

    // 滚动区域：自动占满剩余a高度
    .scrollbar {
      flex: 1;
      width: 100%;
      overflow: hidden; // 让 el-scrollbar 接管滚动
      // 可选：设置高度为 0 防止 flex 子项溢出
      min-height: 0;

      .el-menu {
        border-width: 0;
      }
    }
  }

  // 右侧容器：占据剩余宽度，并采用垂直 flex 布局
  .layout_right {
    flex: 1; // 自动占满剩余宽度
    display: flex;
    flex-direction: column;
    overflow: hidden; // 防止内容溢出影响整体布局

    // 顶部导航：固定高度，不压缩
    .layout_tabbar {
      flex-shrink: 0;
      height: $base-tabbar-height;
      color: black;
      // 不需要设置 left/width/fixed，flex 自动处理
    }

    // 主内容区：占据剩余高度，超出滚动
    .layout_main {
      flex: 1;
      overflow-y: auto; // 垂直滚动
      background-color: yellowgreen;
      padding: 20px;
      box-sizing: border-box; // 让 padding 包含在高度内
    }
  }
}
</style>
