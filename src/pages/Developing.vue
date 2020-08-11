<template>
  <div class="page developing-container">
    <div>
      <img src="static/images/developing.png">
      <div>{{content}}</div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Developing',
    props: {
      content: {
        type: String,
        default: '模块暂未开放'
      }
    }
  }
</script>
<style lang="scss" scoped>
  .developing-container {
    display: flex;
    justify-content: center;
    align-items: center;
    >div {
      display: flex;
      flex-direction: column;
      >div {
        text-align: center;
        font-size: 18px;
        font-weight: 900;
        color: #304053;
        margin-top: 20px;
      }
    }
  }
</style>

