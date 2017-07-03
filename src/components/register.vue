<template>
  <el-row>
    <el-col :span="8">
      &nbsp;
    </el-col>
    <el-col :span="8">
      <el-card class="box-card">
        <h2>注册</h2>
        <el-form :model="registerInfo" :rules="rules" ref="registerInfo" label-width="80px" label-position="top">
          <el-form-item label="用户名" prop="code">
            <el-input v-model="registerInfo.code" placeholder="请输入用户名" @keyup.enter.native="onCreate"></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="name">
            <el-input v-model="registerInfo.name" placeholder="请输入昵称" @keyup.enter.native="onCreate"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="registerInfo.password" placeholder="请输入密码" @keyup.enter.native="onCreate"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPwd">
            <el-input type="password" v-model="registerInfo.confirmPwd" placeholder="请输入确认密码" @keyup.enter.native="onCreate"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onCreate" class="fullWidthBtn">注册</el-button>
          </el-form-item>
          <div class="login">
            如有账号，请点击
            <a @click="login">登陆</a>
          </div>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  import {
    register
  } from '../api/api'
  export default {
    name: 'register',
    data() {
      let checkCode = (rule, value, callback) => {
        if (!new RegExp('^[a-z]\w*', 'g').test(value)) {
          callback(new Error('用户名必须以小写字母开头'))
        } else {
          callback()
        }
      }
      let checkPassword = (rule, value, callback) => {
        if (!new RegExp('\([0-9][a-z][A-Z])*', 'g').test(value)) {
          callback(new Error('密码必须是数字，字母和下划线组合'))
        } else {
          callback()
        }
      }
      return {
        registerInfo: {
          code: '',
          name: '',
          password: '',
          confirmPwd: ''
        },
        rules: {
          code: [{
            required: true,
            message: '账户名称不能为空',
            trigger: 'blur'
          }, {
            min: 4,
            max: 10,
            message: '长度在 4 到 10 个字符',
            trigger: 'blur'
          }, {
            validator: checkCode,
            trigger: 'blur'
          }],
          name: [{
            required: true,
            message: '昵称不能为空',
            trigger: 'blur'
          }, {
            min: 2,
            max: 10,
            message: '长度在 2 到 10 个字符',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          }, {
            min: 6,
            max: 20,
            message: '长度在 6 到 20 个字符',
            trigger: 'blur'
          }, {
            validator: checkPassword,
            trigger: 'blur'
          }],
          confirmPwd: [{
            required: true,
            message: '确认密码不能为空',
            trigger: 'blur'
          }, {
            min: 6,
            max: 20,
            message: '长度在 6 到 20 个字符',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      async onCreate(formName) {
        this.$refs.registerInfo.validate(valid => {
          const regInfo = this.registerInfo
          if (!valid) return
          if (regInfo.password != regInfo.confirmPwd) {
            this.$message.error('两次输入密码不一致');
          } else {
            register({
              code: this.registerInfo.code,
              name: this.registerInfo.name,
              password: this.registerInfo.password
            }).then(res => {
              if (res.success) {
                this.$message.success('注册成功！')
                setTimeout(() => {
                  this.$router.push({
                    path: '/login'
                  })
                }, 1000)
              } else {
                this.$message.error(res.info);
              }
            })
          }
        })
      },
      login() {
        this.$router.push({
          path: '/login'
        })
      }
    },
    mounted() {
      document.body.style.background = 'radial-gradient(at center, #F2F3F9, #89A7BF)'
    }
  }

</script>

<style lang="scss" scoped>
  $full-width: 100%;
  .box-card {
    h2 {
      font-weight: 400;
      font-size: 18px;
    }
    .el-form-item {
      text-align: left;
      .fullWidthBtn {
        width: $full-width;
      }
    }
    .login {
      text-align: right;
      font-size: 13px;
      color: #999;
      a {
        color: #3498db;
      }
    }
  }

  a:hover {
    cursor: pointer;
  }

</style>
