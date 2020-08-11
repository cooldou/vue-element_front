<template>
  <div class="file-show-container">
    <iframe v-if="module" :src="`${threeModelPath}/${module}/${modelId}?token=${token}&modelPath=${modelPath}&heightValue=${heightValue}&threeModelSocket=${threeModelSocket}&t=${Date.parse(new Date())}`"></iframe>
  </div>
</template>
<script>
import { getSession, getConfigPath } from '@/modules/authentication'
  export default {
    name: 'ThereModuleFile',

    data(){
      return {
        modelId: 0,
        token: getSession().token,
        threeModelPath: getConfigPath().threeModulePath,
        threeModelSocket: getConfigPath().threeModelSocket,
        heightValue: 0
      }
    },
    props: {
      // 3D module
      module: {
        type: String,
        default: ''
      }
    },

    async created () {
      if (getSession().user.models && getSession().user.models.length) {
        this.modelPath = getSession().user.models[0].location
        this.modelId = getSession().user.models[0].id
        this.heightValue = getSession().user.models[0].heightValue
      } else {
        this.modelPath = ''
        this.modelId = 0
        this.heightValue = 0
      }
    }
  }
</script>
<style lang="scss">
  .file-show-container {
    width: 100%;
    height: 100%;
    iframe {
      width: 100%;
      height: 100%;
      border: 0;
    }
  }
</style>
