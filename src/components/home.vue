<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
        <el-col :span="22" @click.native="this.location.reload()">{{collapsed ? '' : sysName}}</el-col>
        <el-col :span="2">
          <i class="fa fa-align-justify" @click.prevent="collapse"></i>
        </el-col>
      </el-col>
      <el-col :span="4" class="userinfo">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner">{{sysUserName}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="logout">修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>
    <el-col class="main" :span="24">
      <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo">
          <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden && (item.type==userType || !item.type)">
            <el-submenu :index="index+''" v-if="!item.leaf">
              <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
              <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">
                {{child.name}}
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path" @click="$router.push(item.children[0].path)">
            <i :class="item.iconCls"></i>
            {{item.children[0].name}}
            </el-menu-item>
          </template>
        </el-menu>
      </aside>
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="breadcrumb-container">
            <el-breadcrumb separator="/" class="breadcrumb-inner">
              <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                {{ item.name }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>
  </el-row>
</template>

<script>
  import {
    checkSession,
    logout
  } from '../api/api'
  export default {
    name: 'home',
    data() {
      return {
        collapsed: false,
        sysName: '管理系统',
        userType: 'admin',
        sysUserName: ''
      }
    },
    methods: {
      logout() {
        logout().then(res => {
          if (res.success) {
            this.$message.success('注销成功')
            setTimeout(() => {
              this.$router.push({
                path: '/login'
              })
            }, 1000)
          }
        })
      }
    },
    mounted() {
      //验证session
      const token = sessionStorage.getItem('user')
      checkSession().then(res => {
        if (!(res.info.token == token)) {
          this.$router.push({
            path: '/login'
          })
        } else {
          document.body.style.background = 'none'
          this.sysUserName = res.info.user.name
        }
      })
    }
  }

</script>

<style lang="scss" scoped>
  $color-primary: rgba(0, 0, 0,0.4);
  .utils-bar {
    border-bottom: 2px solid rgba(255, 255, 255,0.9);
    padding: 6px 0 6px 0;
    margin-bottom: 6px;
  }
  .container {
    backgroud-color:white;
    position: absolute;
    top: 0px;
    left: 0;
    bottom: 0px;
    width: 100%;
    .header {
      height: 60px;
      line-height: 60px;
      background: $color-primary;
      color: #fff;
      .tools {
        width: 14px;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
      }
      .userinfo {
        text-align: right;
        padding-right: 35px;
        float: right;
        .userinfo-inner {
          font-size:16px;
          cursor: pointer;
          color: #fff;
          img {
            width: 40px;
            height: 40px;
            border-radius: 20px;
            margin: 10px 0px 10px 10px;
            float: right;
          }
        }
      }
      .logo {
        height: 60px;
        font-size: 22px;
        padding-left: 20px;
        padding-right: 20px;
        border-color: rgba(238, 241, 146, 0.3);
        border-right-width: 1px;
        border-right-style: solid;
        cursor: pointer;
        img {
          width: 40px;
          float: left;
          margin: 10px 10px 10px 18px;
        }
        .txt {
          color: #fff;
        }
      }
      .logo-width {
        width: 230px;
      }
      .logo-collapse-width {
        width: 60px
      }
    }
    .main {
      display: flex;
      position: absolute;
      top: 60px;
      bottom: 0px;
      overflow: hidden;
      aside {
        flex: 0 0 230px;
        width: 230px;
        .el-menu {
          height: 100%;
          .el-submenu__title.el-menu-item {
            padding-left: 20px;
            height: 56px;
            line-height: 56px;
            padding: 0 20px;
          }
        }
        .collapsed {
          width: 60px;
          .item {
            position: relative;
          }
          .submenu {
            position: absolute;
            top: 0px;
            left: 60px;
            z-index: 99999;
            height: auto;
            display: none;
          }
        }
      }
      .menu-collapsed {
        flex: 0 0 60px;
        width: 60px;
      }
      .menu-expanded {
        flex: 0 0 230px;
        width: 230px;
      }
      .content-container {
        flex: 1;
        overflow-y: scroll;
        padding: 20px;
        .breadcrumb-container {
          .title {
            width: 200px;
            float: left;
            color: #475669;
          }
          .breadcrumb-inner {
            line-height:36px;
            float: left;
          }
        }
        .content-wrapper {
          box-sizing: border-box;
        }
      }
    }
  }

</style>
