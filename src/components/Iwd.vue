<template>
  <div id="iwd">
      <div class="user-btn">
        <button type="button" class="change" @click="changePwd" >修改密码</button>
        <button type="button" class="check" @click="check">库存查询</button>
        <button type="button" class="update">检查更新</button>
      </div>
      <div class="user-btn second">
        <button type="button" class="logout" @click="isLogout">退出登录</button>
      </div>
  </div>
</template>

<script>
export default  {
  name: 'iwd',
  methods: {
    isLogout: function() {
      this.token = window.localStorage.getItem("access_token");
      this.$http.get(APIURL+'auth/logout', {token: this.token}).then((response) => { 
      console.log(this.token);
      });
      window.localStorage.removeItem("userData");
      window.localStorage.removeItem("access_token");
      setTimeout(
        ()=>this.$router.push({
        'path':'/login'
        }),500)
    },
    changePwd: function() {
      setTimeout(
        ()=>this.$router.push({
        'path':'/user/pwd'
        }),100)
    },
    check: function(){
      setTimeout(
        ()=>this.$router.push({
        'path':'/check'
        }),100)
    }
  }
}
</script>

<style scoped>
  .user-btn > button{
    font-size: inherit;
    border-color: transparent;
    background-color: transparent;
    color: #fff;
    border-top: 0;
    border-bottom: 0;
    display: block;
    margin: -10px;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 0;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    margin: 0 auto;
    padding: 10px 15px;
    font-size: 19px;
    border-radius: 5px;
    width: 7.675rem;
    height: 1.25rem;
    margin-bottom: 0.25rem
  }
  .second{
    position: absolute;
    bottom: 1.0rem;
    left: 0;
    right: 0;
    margin: 0 auto;
  }
  .user-btn > button.check{
    background: #26A2FF
  }
  .user-btn > button.change{
    filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=275,finishy=0) progid:DXImageTransform.Microsoft.gradient(startcolorstr=#fc8d43,endcolorstr=#f77050,gradientType=0); 
    -ms-filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=275,finishy=0) progid:DXImageTransform.Microsoft.gradient(startcolorstr=#fc8d43,endcolorstr=#f77050,gradientType=0); 
    background:#f77050; /* 一些不支持背景渐变的浏览器 */  
    background:-moz-linear-gradient(left, #fc8d43, rgba(247, 111, 80, 1));  
    background:-webkit-gradient(linear, 0 0, 0 right, from(#fc8d43), to(rgba(247, 111, 80, 1)));  
  }
  .user-btn > button.update{
    filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=275,finishy=0) progid:DXImageTransform.Microsoft.gradient(startcolorstr=#24e1b4,endcolorstr=#08d3c9,gradientType=0); 
    -ms-filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=275,finishy=0) progid:DXImageTransform.Microsoft.gradient(startcolorstr=#24e1b4,endcolorstr=#08d3c9,gradientType=0); 
    background:#08d3c9; /* 一些不支持背景渐变的浏览器 */  
    background:-moz-linear-gradient(left, #24e1b4, rgba(8, 211, 201, 1));  
    background:-webkit-gradient(linear, 0 0, 0 right, from(#24e1b4), to(rgba(8, 211, 201, 1)));  
  }
  .user-btn > button.logout{
    filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=275,finishy=0) progid:DXImageTransform.Microsoft.gradient(startcolorstr=#ff6c6e,endcolorstr=#fe5b70,gradientType=0); 
    -ms-filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=275,finishy=0) progid:DXImageTransform.Microsoft.gradient(startcolorstr=#ff6c6e,endcolorstr=#fe5b70,gradientType=0); 
    background:#fe5b70; /* 一些不支持背景渐变的浏览器 */  
    background:-moz-linear-gradient(left, #ff6c6e, rgba(254, 91, 112, 1));  
    background:-webkit-gradient(linear, 0 0, 0 right, from(#ff6c6e), to(rgba(254, 91, 112, 1)));  
  }

</style>
