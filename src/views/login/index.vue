<template>
    <div class="container" ref="box">
        <el-card class="my-card">
            <img src="../../assets/images/logo_index.png" alt/>
            <el-form ref="loginForm" :model="loginForm" :rules="loginRules" status-icon>
                <el-form-item prop="mobile">
                    <el-input v-model="loginForm.mobile" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-input
                            v-model="loginForm.code"
                            placeholder="请输入验证码"
                            style="width:236px;margin-right:10px"
                    ></el-input>
                    <el-button>发送验证码</el-button>
                </el-form-item>
                <el-form-item>
                    <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button @click="login()" type="primary" style="width:100%">登 陆</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import store from '@/store'

export default {
  // mounted () {
  //   console.log(this.$refs.box)
  //   console.log(this.$refs.loginForm)
  // },
  data () {
    const checkMobile = (rule, value, callback) => {
      if (!/^1[3-9]\d{9}$/.test(value)) {
        return callback(new Error('请输入正确的手机号!'))
      }
      callback()
    }

    return {
      loginForm: {
        mobile: '15010000000',
        code: '246810'
      },
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'change' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '验证码为6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          try {
            const { data: { data } } = await this.$http.post('authorizations', this.loginForm)
            store.setUser(data)
            await this.$router.push('/')
          } catch (e) {
            this.$message.error('手机号或验证码错误 🙅')
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
    .container {
        background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;

        .my-card {
            width: 400px;
            height: 350px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);

            img {
                width: 200px;
                display: block;
                margin: 0 auto 30px;
            }
        }
    }
</style>
