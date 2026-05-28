<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="rules"
          ref="ruleFormRef"
        >
          <h1>hello</h1>
          <h2>欢迎来到后台管理</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              class="login_btn"
              type="primary"
              size="default"
              @click="login"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useUserStore from '@/store/modules/user'
import { ElNotification } from 'element-plus'
import { getTime } from '@/utils/time'

//数据
//获取路由器
const router = useRouter()
const route = useRoute()
//收集账号密码
let loginForm = reactive({ username: 'admin', password: '111111' })
//定义变量控制按钮加载效果
let loading = ref(false)
//获取el-form组件
let ruleFormRef = ref()

//仓库
let useStore = useUserStore()

//回调方法
const login = async () => {
  //点击登录按钮以后干什么?
  //通知仓库发登录请求
  //请求成功->首页展示数据的地方
  //请求失败->弹出登录失败信息
  try {
    await ruleFormRef.value.validate()
  } catch (fields) {
    console.log('表单校验没通过', fields)
  }
  loading.value = true
  try {
    await useStore.userLogin(loginForm)
    loading.value = false
    let redirect: any = route.query.redirect
    router.push({ path: redirect || '/' })
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `HI,${getTime()}好`,
    })
  } catch (error) {
    loading.value = false
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}

//自定义校验
const validatorUserName = (_rule: any, value: any, callback: any) => {
  //rule:即为校验规则对象
  //value:即为表单元素文本内容
  //callback:规则放行函数，不符合条件callBack方法,注入错误提示信息
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('密码长度至少五位'))
  }
}

//定义表单检验需要配置对象
const rules = {
  username: [
    // {
    //   required: true,
    //   min: 5,
    //   max: 10,
    //   message: '用户名长度5-10位',
    //   trigger: 'change',
    // },
    { trigger: 'change', validator: validatorUserName },
  ],
  password: [
    {
      required: true,
      min: 6,
      max: 20,
      message: '密码至少6位',
      trigger: 'change',
    },
  ],
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;

  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: 100% 100%; // 强制拉伸铺满整个容器
    padding: 40px;

    h1 {
      color: white;
      font-size: 40px;
    }

    h2 {
      font-size: 20px;
      color: white;
      margin: 20px 0px;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>
