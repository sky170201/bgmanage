<template>
  <el-container>
    <el-header class="home-header">
      <div class="header-top">
        <img class="header-logo" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586180820023&di=c761d0bd4a6797b7848051c1be67c45d&imgtype=0&src=http%3A%2F%2Fp0.ifengimg.com%2Fpmop%2F2017%2F1212%2FBDCE7926E3CE0D97FB867EBA4567A8BC82069C2C_size18_w553_h442.jpeg" alt="">
        <span>后台管理系统</span>
      </div>
      <el-button @click="logout" type="info">退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside class="home-aside" :width=" isCollapse ? '64px' : '200px'">
        <div class="collapse" @click="collapsebtn">|||</div>
        <el-menu
        background-color="#333644"
        text-color="#fff"
        active-text-color="#409eff"
        unique-opened
        :collapse-transition="false"
        :collapse="isCollapse"
        router
        :default-active="activePath"
        >
        <!-- 一级菜单 -->
        <el-submenu :index="item.id + ''" v-for="(item,i) in menulist" :key="i">
          <!-- 一级菜单模板区域 -->
          <template slot="title">
            <!-- 图标 -->
            <i :class="iconObj[item.id]"></i>
            <!-- 文本 -->
            <span>{{ item.authName }}</span>
          </template>

          <!-- 二级菜单 -->
          <el-menu-item 
            :index="'/' + item.path" 
            v-for="item in item.children" 
            :key="item.id"
            @click="saveNavStatus('/' + item.path)"
            >
            <template>
              <i class="el-icon-menu"></i>
              <span>{{item.authName}}</span>
            </template>
          </el-menu-item>
        </el-submenu>
      </el-menu>
      </el-aside>
      <el-main class="home-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      isCollapse:false,
      menulist: [],
      iconObj: {
        '125': 'iconfont icon-user1',
        '103': 'iconfont icon-quanxian',
        '101': 'iconfont icon-shopbag',
        '102': 'iconfont icon-icon-dingdan',
        '145': 'iconfont icon-data'
      },
      // 被激活的连接地址
      activePath: ''
    }
  },
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    // 保存链接激活状态
    saveNavStatus(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    },
    collapsebtn() {
      this.isCollapse = !this.isCollapse
    },
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList() {
      const { data } = await this.$axios.get('menus')
      if(data.meta.status !== 200) this.$message.error(data.meta.msg)
      this.menulist = data.data
      console.log(this.menulist)
    }
  }
}
</script>

<style lang="less" scoped>
  .el-container {
    height: 100%;
  }

  .home-header {
    background-color: #333644;
    display: flex;
    justify-content: space-between;
    padding-right: 20px;
    align-items: center;
    .header-top {
      display: flex;
      align-items: center;
      color: #ffffff;
      .header-logo {
        height: 50px;
        margin-right: 20px;
        border-radius: 8px;
      }
    }
  }

  .home-aside {
    background-color: #333644;
    .collapse {
      color: #ffffff;
      text-align: center;
      letter-spacing: 4px;
      cursor: pointer;
      background-color: #5D6C8F;
      padding: 5px 0;
    }
    el-menu {
      border-right: none;
    }
  }

  .home-main {
    background-color: #eeeeee;
  }

  .iconfont {
    margin-right: 10px;
  }
</style>