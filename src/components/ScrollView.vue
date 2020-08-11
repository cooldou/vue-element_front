<template>
  <div class="scroll-view" v-bar>
    <div class="scroll-container">
      <div class="scroll-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScrollView'
}
</script>

<style lang="scss">
.vb {
  > .vb-dragger {
    z-index: 5;
    width: 12px;
    right: 0;

    > .vb-dragger-styler {
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      transform: rotate3d(0, 0, 0, 0);
      transition:
          background-color 100ms ease-out,
          margin 100ms ease-out,
          height 100ms ease-out;
      background-color: rgba(204, 204, 204, .3);
      margin: 5px 5px 5px 0;
      border-radius: 20px;
      height: calc(100% - 10px);
      display: block;
    }

    &:hover > .vb-dragger-styler {
      background-color: rgba(204, 204, 204, 1);
      margin: 0;
      height: 100%;
    }
  }

  &.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(204, 204, 204, .8);
  }

  &.vb-dragging > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(204, 204, 204, 1);
    margin: 0;
    height: 100%;
  }

  &.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(204, 204, 204, 1);
  }
}
</style>

