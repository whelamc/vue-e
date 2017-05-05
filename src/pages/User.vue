<template>
    <div id="user">
      <topNav :title="title"></topNav>
      <div class="user-bg">
        <img src="static/img/user.png" alt="" />
        <img src="static/img/avater.png" class="avater" />
        <div class="user-info">
          <p>{{ name }}</p>
          <p>工号：{{ number }}</p>
        </div>
      </div>
      <router-view></router-view> 
      <div class="user-ver">
        <span>{{ version }}</span>
      </div>
    </div>
</template>

<script>
  import topNav from '@/components/Top'
  export default {
    name: 'user',
    data () {
      return {
        msg: 'Welcome to whelamc',
        title: '个人中心',
        version: '2.1.1668',
        name: 'whelam',
        number: '9527',
      }
    },
    methods: {
      changeNor: function() {

      }
    },
    components: { topNav }
  }

</script>

<style scoped>
  .user-bg{
    width: 100%; 
    margin: 0 auto;
    position: relative;
  }
  .user-bg img{
    width: 100%;
    margin-bottom: 0.2rem
  }
  img.avater{
    color: #fff;
    position: absolute;
    margin: 0 auto;
    bottom: 2.5rem;
    left: 0;
    right: 0;
    width: 2.5rem
  }
  .user-info {
    color: #fff;
    text-align: center;
    position: absolute;
    bottom: 1.25rem;
    left: 0;
    right: 0;
    margin: 0;
  }
  .user-info p{
    margin: 0;
    margin-bottom: 0.125rem;
    font-size: 19px;
  }
  .user-info p:last-child{
    font-size: 10px
  }
  .user-ver {
    color: #999;
    font-size: 14px;
    text-align: center;
    position: absolute;
    bottom: 0.45rem;
    left: 0;
    right: 0
  }
</style>
