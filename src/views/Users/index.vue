<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 用户搜索和用户添加 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入用户信息">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表 -->
        <template>
          <el-table
            :data="userlist"
            border
            style="width: 100%">
            <el-table-column
              prop="username"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="email"
              label="邮箱"
              width="180">
            </el-table-column>
            <el-table-column
              prop="mobile"
              label="电话">
            </el-table-column>
            <el-table-column
              prop="role_name"
              label="角色">
            </el-table-column>
            <el-table-column
              prop="mg_state"
              label="状态">
            </el-table-column>
            <el-table-column
              label="操作">
            </el-table-column>
          </el-table>
        </template>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 获取用户列表的参数
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      userlist: [],
      total: 0
    }
  },
  created() {
    this.getUsersList()
  },
  methods: {
    async getUsersList() {
      const { data } = await this.$axios.get('/users', { params: this.queryInfo })
      // console.log(data)
      this.userlist = data.data.users
      this.total = data.data.total
      console.log(this.userlist)
    }
  }
}
</script>

<style lang="less" scoped>
  
</style>