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
      class="map-dialog-container">
      <div class="map-wrapper">
        <baidu-map :ak="appKey"
          class="map-view"
          :center="mapCenter"
          :scroll-wheel-zoom="true"
          @click="handleMapClick">
          <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
          <bm-marker :position="{ lng: map.longitude, lat: map.latitude }"
            v-if="map.longitude && map.latitude">
          </bm-marker>
          <bm-local-search
            :keyword="map.keyword"
            :auto-viewport="true"
            :panel="false"
            @searchcomplete="handleSearchComplete">
          </bm-local-search>
        </baidu-map>

        <div class="search-form" v-if="!readonly && !disabled">
          <el-input placeholder="搜索名称" @input="handleKeywordChange">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </div>

      <div class="form-buttons" slot="footer" v-if="!readonly && !disabled">
        <el-button type="primary" size="small" @click="confirmSelect">确定</el-button>
        <el-button size="small" @click="visible = false">取消</el-button>
      </div>
    </el-dialog>
  </el-form-item>
</template>

<script>
  import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
  import { BmLocalSearch, BmMarker, BmNavigation } from 'vue-baidu-map'
  import inputMixin from '@/mixins/input-mixin'
  import { getSession } from '@/modules/authentication'

  export default {
    name: 'LocationInput',

    components: {
      BaiduMap,
      BmLocalSearch,
      BmMarker,
      BmNavigation
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
        }
      }
    },

    computed: {
      appKey() {
        return process.env.BAIDU_MAP_APP_KEY
      },

      mapCenter() {
        const { user } = getSession()
        return user.gisDistrictName || user.riskDistrictName || '成都市'
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

      handleKeywordChange(value) {
        if (this.searched) return

        this.searched = true
        this.map.keyword = value
      },

      handleMapClick({ point }) {
        if (this.readonly || this.disabled) return

        this.map.longitude = point.lng
        this.map.latitude = point.lat
        let geocoder = new BMap.Geocoder()
        geocoder.getLocation(point, rs => {
          this.address = rs.address
        })
      },

      handleSearchComplete(result) {
        if (!this.searched) return

        if (result && result.Ar && result.Ar.length > 0) {
          const first = result.Ar[0]

          this.map.longitude = first.point.lng
          this.map.latitude = first.point.lat
          this.address = this.address ? this.address : first.address

        } else {
          this.map.longitude = null
          this.map.latitude = null
          // this.address = null
        }
        this.searched = false
        this.map.keyword = null
      },

      confirmSelect() {
        this.visible = false

        if (this.map.longitude && this.map.latitude) {
          this.$emit('input', {
            longitude: this.map.longitude,
            latitude: this.map.latitude
          })
        } else {
          this.$emit('input', null)
        }
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
        }
      }
    }

    .el-dialog__footer {
      padding-top: 0;
    }
  }

</style>

