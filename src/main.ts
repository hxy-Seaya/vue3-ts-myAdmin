import { createApp } from 'vue'

import 'normalize.css'
import router from './router'
import pinia from './store'
//引入模板的全局的样式
import '@/styles/index.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
//svg插件需要配置代码
import 'virtual:svg-icons-register'
//引入自定义插件对象：注册整个项目全局组件
import gloalComponent from '@/components'
//引入路由鉴权文件
import './permisstion'

import App from './App.vue'

const app = createApp(App)

app.use(router)
app.use(pinia)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus, {
  locale: zhCn, //element-plus国际化
})
//安装自定义插件
app.use(gloalComponent)
console.log(import.meta.env)

//测试代码：测试假接口能否使用
// import axios from 'axios'
// axios({
//   url: '/api/user/login',
//   method: 'post',
//   data: {
//     username: 'admin',
//     password: '111111',
//   },
// })

app.mount('#app')
