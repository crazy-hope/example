<template>
  <div class="signIn">
    <div class="formBox">
      <h3>SIGN IN</h3>
      <el-form ref="signForm" label-width="80px" label-position="top" :model="signForm" :rules="rules">
        <el-form-item label="USERNAME:" prop="username">
          <el-input v-model="signForm.username"></el-input>
        </el-form-item>
        <el-form-item label="PASSWORD:" prop="password">
          <el-input type="password" v-model="signForm.password"></el-input>
        </el-form-item>
        <el-form-item label-width="0">
          <el-button type="primary" @click.native="handleSubmit('signForm')">Sign In</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SignIn',
  data() {
    return {
      signForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ],
      }
    }
  },
  created() {
    this.SET_TOKEN('')
    this.SET_IDENTITY_INDEX(-1)
    this.SET_SCENE_INDEX(-1)
  },
  methods: {
    handleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.signForm.username !== 'admin') {
            this.$message.error('用户名错误')
            return false
          }
          if(this.signForm.password !== 'admin123') {
            this.$message.error('密码错误')
            return false
          }
          this.$message.success('登录成功')
          this.SET_TOKEN(new Date().getTime())
          this.$router.push('/')
        } else {
          return false;
        }
      });
    }
  }
}
</script>
<style scoped lang="scss">
.signIn {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url('~@/assets/signBg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  .formBox {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 800px;
    height: 480px;
    border-radius: 10px;
    background: #FFFFFF;
    box-shadow: 0 0 10px rgba(0,0,0,0.3);
    margin-left: -400px;
    margin-top: -240px;
    padding: 30px;
    padding-left: 400px;
    background-image: url('~@/assets/img1.png');
    background-repeat: no-repeat;
    background-position: left center;
    background-size: auto 80%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    > * {
      width: 100%;
    }
    h3 {
      font-size: 36px;
      margin-bottom: 30px;
    }
  }
}

/deep/ .el-form--label-top .el-form-item__label {
  padding-bottom: 0;
}
</style>