<template>
  <el-row>
    <el-col :span="9">
      &nbsp;
    </el-col>
    <el-col :span="6">
      <el-card class="box-card">
        <h2>登陆</h2>
        <el-form :model="formInfo" :rules="rules" ref="formInfo" label-width="80px" label-position="top">
          <el-form-item label="用户名" prop="code">
            <el-input v-model="formInfo.code" @keyup.enter.native="login" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" @keyup.enter.native="login" v-model="formInfo.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <div class="forget-password"><a href="javascript: void(0)">忘记密码</a></div>
          <el-form-item>
            <el-button type="primary" @click="login" class="fullWidthBtn">登陆</el-button>
          </el-form-item>
          <div class="register">如果是第一次访问本站，请先
            <a href="#/register">注册</a>
          </div>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  import {
    login
  } from '../api/api'
  export default {
    name: 'login',
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
        formInfo: {
          code: '',
          password: ''
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
          }]
        }
      }
    },
    methods: {
      async login(formName) {
        this.$refs.formInfo.validate(valid => {
          const formInfo = this.formInfo
          if (!valid) return
          login({
            code: formInfo.code,
            password: formInfo.password
          }).then(res => {
            if (res.success) {
              this.$message.success('登陆成功')
              sessionStorage.setItem('user', res.info)
              setTimeout(() => {
                this.$router.push({path: '/'})
              }, 1000)
            } else {
              this.$message.error(res.info)
            }
          })
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
    margin-top: 60px;
    h2 {
      font-weight: 400;
      font-size: 18px;
    }
    .el-form-item {
      text-align: left;
      color: #aaa;
      .fullWidthBtn {
        margin-top: 10px;
        width: $full-width
      }
      .el-form-item__label {
        color: #aaa;
      }
    }
    .forget-password {
      text-align: left;
      a {
        font-size: 13px;
        color: #999;
        text-decoration: none;
      }
    }
    .register {
      text-align: left;
      font-size: 13px;
      color: #999;
      a {
        text-decoration: none;
        color: #3498db;
      }
    }
  }

  a:hover {
    cursor: pointer;
  }

</style>
