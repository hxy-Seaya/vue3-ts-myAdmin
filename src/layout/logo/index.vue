<template>
  <div
    class="logo"
    :class="{ fold: LayOutSettingStroe.fold }"
    v-if="setting.logoHidden"
  >
    <img :src="setting.logo" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
//引入设置标题与logo这配置文件
import setting from '@/setting'
import useLayOutSettingStore from '@/store/modules/setting'
//数据
//仓库
let LayOutSettingStroe = useLayOutSettingStore()
defineOptions({
  name: 'Logo',
})
</script>

<style scoped lang="scss">
.logo {
  box-sizing: border-box;
  width: 100%;
  height: $base-menu-logo-height;
  color: white;
  display: flex;
  align-items: center;
  padding: 10px 10px 0;
  img {
    width: auto;
    height: 90%;
  }
  p {
    font-size: $base-logo-title-fontSize;
    margin-left: 20px;
    opacity: 1;
    visibility: visible;
    transition:
      opacity 0.2s ease,
      visibility 0.2s ease;
    transition-delay: 0.2s; // 展开时延迟出现（可选）
  }
}
.logo.fold p {
  opacity: 0;
  visibility: hidden;
  transition: none; // 立即消失，无过渡
}
</style>
