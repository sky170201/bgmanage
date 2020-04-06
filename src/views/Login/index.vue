<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-logo">
        <img src="@/assets/logo.png">
      </div>
      <el-form class="login-form" ref="loginForm" :model="form" :rules="rules">
        <el-form-item prop="username">
          <el-input 
            placeholder="请输入用户名"
            prefix-icon="iconfont icon-user"
            v-model="form.username">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            type="password"
            prefix-icon="iconfont icon-password"
            v-model="form.password">
          </el-input>
        </el-form-item>
        <el-form-item class="form-btn">
          <el-button>{{form.username}}</el-button>
          <el-button>{{form.password}}</el-button>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 8, message: '长度在 6 到 8 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    resetForm() {
      this.$refs.loginForm.resetFields()
    },
    login() {
      this.$refs.loginForm.validate( async valid => {
        if(!valid) { return }
        const { data } = await this.$axios.post('login',this.form)
        if(data.meta.status !== 200){
          this.$message.error('用户名或密码错误')
        }else {
          console.log(data)
          window.sessionStorage.setItem('token',data.data.token)
          this.$message({
            message: '登录成功',
            type: 'success',
            duration: 1000
          })
          this.$router.push('/home')
        }
      });
    }
  }
}
</script>

<style lang="less" scoped>
  .login-container {
    height: 100%;
    background-color: #2d4d6d;
  }

  .login-box {
    width: 450px;
    height: 300px;
    background-color: #ffffff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }

  .login-logo {
    width: 150px;
    height: 150px;
    border: 1px solid #eeeeee;
    border-radius: 50%;
    padding: 10px;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #ffffff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eeeeee;
    }
  }

  .login-form {
    margin-top:100px;
    padding: 20px;
    .form-btn {
      float: right;
    }
  }
</style>