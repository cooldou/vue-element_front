<template>
  <transition name='fade'>
    <div class='image-zoom' v-if='visible' ref='image'>
      <div class='img-layer'></div>
      <div class='img-box' :style="{width:width,height:height}">
        <img :src='src' />
        <i class="el-icon-close" @click="$emit('close')"></i>
      </div>
    </div>
  </transition>
</template>

<script>

export default {
  name: 'ImageZoom',

  components: {
    
  },

  props: {
    width: {
      type: String,
      default: "50%"
    },
    height: {
      type: String,
      default: "50%"
    },

    visible: {
      type: Boolean,
      default: false
    },
    
    src: {
      type: String,
      default: ''
    }
  },
}
</script>

<style lang="scss">
  .image-zoom {
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    top:0;
    left:0;
    z-index:998;

    .img-layer {
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 999;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.7);
      overflow: hidden;
    }

    .img-box {
      width:50%;
      height:50%;
      background:white;
      z-index: 1000;
      position: relative;

      img {
        width:100%;
        height:100%;
      }
      
      .el-icon-close {
        position:absolute;
        top:10px;
        right:10px;
        font-size: 24px;
        font-weight:bold;
        color:#909399;
        cursor:pointer;
      }
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: all .2s linear;
    opacity: 1;
  }
  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
</style>
