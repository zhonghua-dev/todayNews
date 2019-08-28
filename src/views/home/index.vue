<template>
  <el-container class="my-container">
    <el-aside :width="isCollapse ? '64px' : '200px'">
      <div class="logo" :class="{miniLogo:isCollapse}"></div>
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#002033"
        text-color="#fff"
        :collapse="isCollapse"
        :collapse-transition="false"
        router
        active-text-color="#ffd04b">
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布管理</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <i @click="toggleAside()" class="icon el-icon-s-fold"></i>
        <span>江苏传智播客科技教育有限公司</span>
        <el-dropdown class="my-dropdown" @command="clickItem">
          <span class="el-dropdown-link">
            <img :src="photo" alt="">
            <span>{{ name }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="setting" icon="el-icon-setting">个人设置</el-dropdown-item>
            <el-dropdown-item command="logout" icon="el-icon-unlock">退出登陆</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import store from '@/store'

export default {
  created () {
    const user = store.getUser()
    // this.name = user.name
    this.photo = user.photo
  },
  data () {
    return {
      isCollapse: false,
      name: null,
      photo: ''
    }
  },
  methods: {
    toggleAside () {
      this.isCollapse = !this.isCollapse
    },
    setting () {
      this.$router.push('/setting')
    },
    logout () {
    // 清除用户信息
      store.delUser()
      // 跳转登录
      this.$router.push({ name: 'login' })
    },
    clickItem (command) {
      this[command]()
    }
  }
}
</script>

<style scoped lang="less">
  .my-container {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;

    .el-aside {
      background: #002033;

      .logo {
        width: 100%;
        height: 60px;
        background: url("../../assets/images/logo_admin.png") no-repeat center / 140px auto;
      }

      .miniLogo {
        background-image: url("../../assets/images/logo_admin_01.png");
        background-size: 36px auto;
      }

      .el-menu {
        border-right: 0;
      }
    }

    .el-header {
      border-bottom: 1px solid #ddd;
      line-height: 60px;

      .el-icon-s-fold {
        font-size: 24px;
        vertical-align: middle;
      }

      span {
        margin-left: 5px;
        vertical-align: middle;
      }

      .my-dropdown {
        float: right;

        img {
          width: 30px;
          vertical-align: middle;
          margin-right: 5px;
        }

        .el-dropdown-link, .el-icon-arrow-down {
          vertical-align: middle;
        }
      }
    }
  }
</style>
