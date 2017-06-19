<template>
  <el-row>
    <el-col :span="8">
      &nbsp;
    </el-col>
    <el-col :span="8">
      <el-form :model="registerInfo" :rules="rules" ref="registerInfo" width="100%" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="registerInfo.code"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="registerInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="registerInfo.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="registerInfo.confirmPwd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onCreate">注册</el-button>
        </el-form-item>
      </el-form>
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
          }],
          name: [{
            required: true,
            message: '账户名称不能为空',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '账户名称不能为空',
            trigger: 'blur'
          }],
          confirmPwd: [{
            required: true,
            message: '账户名称不能为空',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      async onCreate(formName) {
        this.$refs.registerInfo.validate(valid => {
          const regInfo = this.registerInfo
          if (!valid) return;
          if (regInfo.password != regInfo.confirmPwd) {
            this.$message.error('两次输入密码不一致');
          } else {
            register({
              code: this.registerInfo.code,
              name: this.registerInfo.name,
              password: this.registerInfo.password
            }).then(res => {
              if (res.success) {
                console.log(res.info)
              }
            })
          }
        });
      }
    }
  }

</script>
