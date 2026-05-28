<template>
  <div class="tabber">
    <div class="tabber_left">
      <Breadcrumb />
    </div>
    <div class="tabber_right">
      <Set />
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from './breadcrumb/index.vue'
import Set from './set/index.vue'
</script>

<style scoped lang="scss">
.tabber {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  .tabber_left {
    display: flex;
    align-items: center;
    margin: 20px;
  }

  .tabber_right {
    display: flex;
    align-items: center;
    margin: 20px;
  }
}
</style>
