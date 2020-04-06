<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <el-col>
          <el-menu default-active="2" class="el-menu-vertical-demo">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-setting"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-aside>
      <el-container>
        <el-header>
          标题
          <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <el-main>
          <template>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column fixed prop="date" label="日期" width="150"></el-table-column>
              <el-table-column prop="name" label="姓名" width="120"></el-table-column>
              <el-table-column prop="province" label="省份" width="120"></el-table-column>
              <el-table-column prop="city" label="市区" width="120"></el-table-column>
              <el-table-column prop="address" label="地址"></el-table-column>
              <el-table-column prop="zip" label="邮编" width="120"></el-table-column>
              <el-table-column fixed="right" label="操作" width="250">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope)" type="text" size="small">删除</el-button>
                  <el-button type="text" size="small" @click="editor">编辑</el-button>
                  <el-button type="text" size="small">上架</el-button>
                  <el-button type="text" size="small">下架</el-button>
                  <el-button type="text" size="small">审核</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog title="编辑信息" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// import dialog from './dialog'
export default {
  // components: {dialog},
  methods: {
    handleClick(scope) {
      this.$confirm('确认删除？')
        .then(_ => {
          this.tableData.splice(scope.$index, 1);
        })
        .catch(_ => {});
    },
    editor() {
      this.dialogVisible = true;
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login")
    }
  },

  data() {
    return {
      dialogVisible: false,
      tableData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address:
            '上海市普陀区金沙江路 1518 弄海市普陀区金沙江路 1518 弄海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }
      ]
    };
  }
};
</script>
<style scoped>
.el-container {
  height: 100%;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  padding: 0;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

.el-menu {
  height: 100%;
}

.cellText {
  color: #5200ff;
}
.cellText:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>