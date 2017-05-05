<template>
  <div id="pwd">
      <div class="edit-input">
        <div class="edit-input-group">
          <input class="edit-input-group__inner" type="password" placeholder="原密码" v-model="oldpwd" />
        </div>
        <div class="edit-input-group">
          <input class="edit-input-group__inner" type="password" placeholder="新密码" v-model="newpwd" />
        </div>
      </div>
      <div class="user-btn">
        <button type="button" class="change" @click="changepwd">修改密码</button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'pwd',
  data () {
    return {
      oldpwd: '',
      newpwd: ''
    }
  },
  methods: {
    changepwd: function() {
      this.$http.post(APIURL+'auth/change_pwd', {newpwd:this.newpwd,oldpwd:this.oldpwd}).then((response) => { 
        console.log("修改成功")
        setTimeout(
          ()=>this.$router.push({
          'path':'/user'
          }),100)
      }, (response) => {
            alert('修改出错了！')
      });
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
  button.change{
    filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=275,finishy=0) progid:DXImageTransform.Microsoft.gradient(startcolorstr=#fc8d43,endcolorstr=#f77050,gradientType=0); 
    -ms-filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=275,finishy=0) progid:DXImageTransform.Microsoft.gradient(startcolorstr=#fc8d43,endcolorstr=#f77050,gradientType=0); 
    background:#f77050; /* 一些不支持背景渐变的浏览器 */  
    background:-moz-linear-gradient(left, #fc8d43, rgba(247, 111, 80, 1));  
    background:-webkit-gradient(linear, 0 0, 0 right, from(#fc8d43), to(rgba(247, 111, 80, 1)));  
  }
  .edit-input {
    margin-bottom: 0.625rem
  }
  .edit-input-group {
    line-height: normal;
    display: table;
    width: 7.675rem;
    border-collapse: separate;
    margin: 0 auto;
    margin-bottom: 10px;
    position: relative;
    font-size: 14px;
  }
  .edit-input-group__inner {
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
    padding: 3px 10px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
    vertical-align: middle;
    display: table-cell;
  }
</style>
