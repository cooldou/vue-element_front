<template>
  <el-form-item :label="label"
    :prop="name"
    :required="required">
    <el-button type="text" class="location-select-button"
      @click="visible = true">
      <div class="location-result">
        <span v-if="displayValue">{{displayValue}}</span>
        <span v-else>点击选择</span>
        <img src="@/assets/icons/location.png" class="icon">
      </div>
    </el-button>

    <el-dialog :visible.sync="visible"
      :title="readonly || disabled ? '地理位置' : '选择地理位置'"
      width="820px"
      :modal="true"
      :append-to-body="true"
      @open="handleDialogOpen"
      ref="dialog"
      class="map-dialog-container"
      @close="clear">
      <div class="map-wrapper">
        <el-amap-search-box class="search-form" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
        <el-amap :events="handleEvents" vid="amap-container" :center="mapCenter" :zoom="17">
          <el-amap-marker :position="mapCenter"></el-amap-marker>
        </el-amap>
      </div>

      <div class="form-buttons" slot="footer" v-if="!readonly && !disabled">
        <el-button type="primary" size="small" @click="confirmSelect">确定</el-button>
        <el-button size="small" @click="clear">取消</el-button>
      </div>
    </el-dialog>
  </el-form-item>
</template>

<script>
  import inputMixin from '@/mixins/input-mixin'
  import { getSession } from '@/modules/authentication'

  export default {
    name: 'LocationInput',

    components: {
    },

    mixins: [inputMixin],

    data() {
      return {
        visible: false,

        address: null,

        map: {
          keyword: null,
          longitude: null,
          latitude: null
        },
        mapCopy: {
          longitude: 0,
          latitude: 0
        }
      }
    },

    computed: {
      mapCenter() {
        if (this.map.longitude && this.map.latitude) return [this.map.longitude, this.map.latitude]
        return [this.mapCopy.longitude, this.mapCopy.latitude]
      },

      searchOption () {
        const { user } = getSession()
        return {
          city: user.area || user.city || '成都市'
        }
      },

      handleEvents () {
        let thiss = this
        return {
          'complete': (e) => {
            let geocoderOne = new AMap.Geocoder()
            geocoderOne.getLocation(this.address, function(status, result) {
              if (status === 'complete' && result.info === 'OK') {
                if (result && result.geocodes.length) {
                  // thiss.map.longitude = result.geocodes[0].location.lng
                  // thiss.map.latitude = result.geocodes[0].location.lat
                  thiss.mapCopy.longitude = result.geocodes[0].location.lng
                  thiss.mapCopy.latitude = result.geocodes[0].location.lat
                }
              }
            })
          },
          'click': (e) => {
            this.map.longitude = e.lnglat.lng
            this.map.latitude = e.lnglat.lat
            let geocoder = new AMap.Geocoder()
            geocoder.getAddress([this.map.longitude, this.map.latitude], function(status, result) {
              if (status === 'complete' && result.info === 'OK') {
                if (result && result.regeocode) {
                  thiss.address = result.regeocode.formattedAddress
                }
              }
            })
          }
        }
      },

      displayValue() {
        if (this.address && this.map.longitude && this.map.latitude) {
          return this.address
        } else if (this.map.longitude && this.map.latitude) {
          return `${this.map.longitude},${this.map.latitude}`
        }
      }
    },

    methods: {
      handleDialogOpen() {
        this.searched = false
      },

      onSearchResult (pois) {
        if (pois && pois.length) {
          this.map.longitude = pois[0].location.lng
          this.map.latitude = pois[0].location.lat
          this.address = pois[0].address
        } else {
          this.map.longitude = this.value.longitude
          this.map.latitude = this.value.latitude
          this.address = this.value.address
        }
      },

      confirmSelect() {
        this.visible = false
        this.searched = true
        if (this.map.longitude && this.map.latitude) {
          this.$emit('input', {
            longitude: this.map.longitude,
            latitude: this.map.latitude
          })
        } else {
          this.$emit('input', {
            longitude: this.mapCopy.longitude,
            latitude: this.mapCopy.latitude
          })
        }
      },

      clear () {
        this.visible = false
      }
    },

    created() {
      if (this.value) {
        this.address = this.value.address
        this.map.longitude = this.value.longitude
        this.map.latitude = this.value.latitude
      }
    },

    watch: {
      value(val) {
        if (val) {
          this.address = val.address ? val.address : this.address
          this.map.longitude = val.longitude
          this.map.latitude = val.latitude
        } else {
          this.address = null
          this.map.longitude = null
          this.map.latitude = null
        }
      }
    }
  }
</script>

<style lang="scss">
  .location-select-button {
    padding: 8px 0;
  }

  .location-result {
    display: flex;
    align-items: center;

    .icon {
      width: 14px;
      height: 18px;
      margin-left: 8px;
    }
  }

  .map-dialog-container {
    .el-dialog__body {
      padding: 0;
      .map-wrapper {
        height: 530px;
        position: relative;

        .map-view {
          width: 100%;
          height: 100%;
        }

        .search-form {
          position: absolute;
          top: 10px;
          right: 17px;
          width: 280px;
          height: 30px;
          .search-box-wrapper {
            input {
              height: 100%;
            }
            .search-btn {
              background-color: #0094EE;
              color: white;
            }
          }
        }
      }
    }

    .el-dialog__footer {
      padding-top: 0;
    }
  }

</style>

