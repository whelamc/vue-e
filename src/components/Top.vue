<template>
    <div id="topN">
      <div class="top">
        <a @click="onRouterBack">返回</a>
        <p>{{ title }}</p>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'topN',
    data () {
      return {
        msg: 'Welcome to whelamc',
      }
    },
    methods: {
      onRouterBack () {
        this.$router.go(-1)
      },
    },
    props: ['title'],
  }

</script>

<style scoped>
  .top {
    background-color: #26a2ff;
    color: #fff;
    text-align: center;
    padding: 0.375rem 0;
    margin: 0 auto;
    position: relative;
  }
  .top > a {
    font-size: 16px;
    position: absolute;
    left: 0.5rem;
    text-decoration: none
  }
  .top > p {
    font-size: 0.5rem
  }
</style>
