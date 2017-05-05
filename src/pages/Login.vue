<template>
    <div class="login">
        <div class="login-bg">
           <img src="static/img/login.png">
        </div>
        <div class="login-input-group">
          <div class="login-input-group__prepend">
              <i class="el-icon-edit"></i>
          </div>
          <input class="login-input-group__inner" type="text" placeholder="请输入用户名" v-model="name" />
        </div>
        <div class="login-input-group">
          <div class="login-input-group__prepend">
              <i class="el-icon-edit"></i>
          </div>
          <input class="login-input-group__inner" type="password" placeholder="请输入密码" v-model="pwd" />
        </div>
        <div class="login-btn-group">
          <button type="button"  @click='isLogin("ac","")'>登录</button>
          <button type="button" @click='scantype'>扫描快捷登录</button>
        </div>
    </div>
</template>

<script>

  export default {
    data () {
      return {
        msg: 'Welcome to whelamc',
        name:'',
        pwd:'',
        error:''
      }
    },
    created: function () {
      // `this` 指向 vm 实例
      console.log('开始')
    },
    methods:{
      isLogin: function(a,b) {
        this.$http.post(APIURL+'auth/login', {userName: this.name,password: this.pwd,logintype: a,scan: b}).then((response) => { 
        this.data = response.body;
        this.token = this.data.data.token;
        this.name = this.data.data.username;
        window.localStorage.setItem("userData", this.name)
        window.localStorage.setItem("access_token", this.token)
        setTimeout(
          ()=>this.$router.push({
          'path':'/'
          }),500)
        }, (response) => {
            // 响应错误回调
            alert('登录出错了！ '+ response.status+ response.statusText)
        });
      },
      scantype: function(){
        window.broadcaster.addEventListener( "didShow", function( e ) {  
          var b = e.sentScanData;
          this.isLogin("st",b)
        })
      }
    }
  }

</script>

<style scoped>
  .login-bg{
      width: 100%; 
      margin: 0 auto;
      height: 100%;
      margin-bottom: 0.75rem
  }
  .login-bg img{
      width: 100%;
  }
  .login-btn-group{
      display: block;
      vertical-align: middle;
      background-color: #1bbbf3;
      border-radius: 4px;
      padding: 2px 1px;
      overflow: hidden;
      width: 6.575rem; 
      margin: 0 auto;
      margin-top: 0.75rem;
      margin-bottom: 0.75rem
  }
  .login-btn-group button:not(:last-child) {
      margin-right: -1px;
  }
  .login-btn-group button:first-child {
      background-color: inherit;
      color: #fff;
      font-size: 18px
  }
  .login-btn-group button:last-child {
      color: #808080;
      font-size: 14px;
  }
  .login-btn-group button + button {
      margin-left: 0;
  }
  .login-btn-group button {
      display: inline-block;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      background: #fff;
      border: 0;
      color: #1f2d3d;
      -webkit-appearance: none;
      text-align: center;
      box-sizing: border-box;
      outline: 0;
      margin: 0;
      padding: 10px 15px;
      border-radius: 4px;
      float: left;
      position: relative;
      height: 45px;
      width: 50%;
  }
  .login-input-group {
      line-height: normal;
      display: table;
      width: 6.575rem; 
      border-collapse: separate;
      margin: 0 auto;
      margin-bottom: 0.25rem;
      position: relative;
      font-size: 14px;
  }
  .login-input-group__prepend {
      background-color: #fbfdff;
      color: #97a8be;
      vertical-align: middle;
      display: table-cell;
      position: relative;
      border: 1px solid #bfcbd9;
      border-radius: 4px;
      padding: 0 10px;
      width: 1%;
      white-space: nowrap;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-right: 0;
  }
  .login-input-group__inner {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      background-color: #fff;
      background-image: none;
      border-radius: 4px;
      border: 1px solid #bfcbd9;
      box-sizing: border-box;
      color: #1f2d3d;
      display: block;
      font-size: inherit;
      height: 0.9rem;
      line-height: 1;
      outline: 0;
      padding: 0 10px;
      transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      width: 100%;
      vertical-align: middle;
      display: table-cell;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
  }
  .login-input-group__prepend .login-input-group__inner{
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
  }
  .login-input-group > .login-input-group__inner {
      vertical-align: middle;
      display: table-cell;
  }
  .login-input-group__inner:hover {
      border-color: #8391a5;
  }
  .login-input-group__prepend > button{
    font-size: inherit;
    border-color: transparent;
    background-color: transparent;
    color: inherit;
    border-top: 0;
    border-bottom: 0;
    display: block;
    margin: -10px;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #bfcbd9;
    color: #1f2d3d;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    padding: 10px 15px;
    font-size: 14px;
    border-radius: 4px;
  }
</style>
