//小仓库:layout组件相关配置仓库
import { defineStore } from 'pinia'
import { reactive } from 'vue'

const useLayOutSettingStore = defineStore('SettingStore', () => {
  const SettingStoreList = reactive({
    fold: false, //用户控制菜单折叠还是收起控制
    refsh: false, //仓库这个属性用于控制刷新效果
  })
  return SettingStoreList
})

export default useLayOutSettingStore
