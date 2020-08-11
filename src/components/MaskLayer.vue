<template>
  <div class="mask-layer-container">
    <div>
      <img src="static/images/mask-layer.png" alt="" />
      <div>模块暂未开放</div>
    </div>
  </div>
</template>
<style lang="scss">
  .mask-layer-container {
    height: 100%;
    width: 100%;
    background-color: #333;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1001;
    display: flex;
    justify-content: center;
    align-items: center;
    > div {
      > div {
        font-size: 16px;
        text-align: center;
        color: #fff;
      }
    }
  }
</style>
