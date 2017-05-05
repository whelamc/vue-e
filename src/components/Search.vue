<template>
  <div id="search">
    <div class="modal">
      {{msg}}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'search',
    data() {
      return {
        msg: "hello modal"
      }
    }
  }
</script>

<style>
  .modal {
    width: 200px;
    height: 200px;
    background-color: #ccc;
    margin: 0 auto;
  } 
</style>
