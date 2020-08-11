<template>
  <div class="three-model-height100">
    <div class="three-model-container" v-if="modelPath">
      <div class="logo-container">
        <img src="static/images/3d-model-logo.png" alt="">
      </div>
      <div class="buttons-container" v-if="!hiddenController">
        <el-button type="" size="small" value="飞回企业" @click.stop="_flyHome()">飞回企业</el-button>
        <el-button type="" size="small" value="俯视图" @click.stop="_down()">俯视图</el-button>
        <el-button type="" size="small" value="前视图" @click.stop="_front()">前视图</el-button>
        <el-button type="" size="small" value="后视图" @click.stop="_back()">后视图</el-button>
        <el-button type="" size="small" value="左视图" @click.stop="_left()">左视图</el-button>
        <el-button type="" size="small" value="右视图" @click.stop="_right()">右视图</el-button>
        <el-button type="" size="small" value="右视图" @click.stop="_fullscreen()">{{this.fullscreen ? '收起' : '全屏'}}</el-button>
      </div>
      <div id="cesiumContainer" class="three-model-height100">
        <div class="ol-popup" v-if="popPointList" v-for="p in popPointList" :id="'ol-popup-item' + p.id" @click="handleClickPopItem(p)">
          <div class="popup-content">
            <div v-for="(item, idx) in p.infoData" :key="p.deviceId + '-' + idx">
              <div>{{item.name}}</div>
              <div class="number-content number-normal"
                :class="{'number-early': item.status === 2 || item.status === 3 ? true : false, 'number-warn': item.status === 1 || item.status === 4 || item.status === 5 ? true : false }">
                {{item.number}}
              </div>
              <div>{{item.deviceUnit}}</div>
            </div>
          </div>
        </div>

        <!-- <div class="ol-popup ol-camera" v-for="p in cameraList" :id="'ol-camera-item' + p.id">
          <div class="camera-content">
            <img src="static/models/images/camera.png" alt="" width="30">
            <video id="video" class="video-container" muted="" autoplay="" loop=""
              crossorigin="" controls="">
                <source src="static/models/video/ping.mp4" type="video/mp4">
            </video>
            <div class="buttons-container">
              <el-button type="" size="small" value="打开" @click.stop="_openCamera()" >打开</el-button>
              <el-button type="" size="small" value="关闭" @click.stop="_closeCamera()" >关闭</el-button>
            </div>
          </div>
          <div class="camera-name">{{p.name}}</div>
        </div> -->
      </div>
    </div>
    <developing v-else :content="'该企业未设置3D地图'"></developing>
  </div>
</template>

<script type="text/javascript">
  import Cesium from "cesium/Cesium";
  import widgets from "cesium/Widgets/widgets.css";
  import CesiumNavigation from "cesium-navigation-es6";
  import { getSession } from "@/modules/authentication";
  import Developing from '@/pages/Developing'

  export default {
    name: 'three-model-component',

    props: ['popPointList', 'hiddenController', 'isLookingDown'],

    data () {
      return {
        fullscreen: false
      }
    },

    components: {
      Developing
    },

    created () {
      if (getSession().user.models && getSession().user.models.length) {
        this.modelPath = getSession().user.models[0].location
      }
    },

    mounted () {
      this.initModel()
    },

    methods: {
      handleClickPopItem(item) {
        this.$emit('handleClickPopItem', item)
      },

      initModel () {
        if (this.modelPath) {
          this.viewer = new Cesium.Viewer('cesiumContainer',
            {
              requestRenderMode: true,
              maximumRenderTimeChange: Infinity,
              homeButton: false,
              sceneModePicker: false,
              baseLayerPicker: false,
              navigationHelpButton: false,
              animation: false,
              timeline: false,
              fullscreenButton: false,
              vrButton: false
            })
          this.tileset = this.viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
            url: `https://3d.models.sccitysafety.com/${this.modelPath}-Cesium/Scene/Production_1.json?${Date.parse(new Date())}`,
            modelMatrix: Cesium.Matrix4.IDENTITY,
            maximumScreenSpaceError: 1
          }))

          this.tileset.readyPromise.then(() => {
            let boundingSphere = this.tileset.boundingSphere
            // let height = -691 + 220
            let height = -691 + 355
            let cartographic = Cesium.Cartographic.fromCartesian(this.tileset.boundingSphere.center)
            let surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0)
            let offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, height)
            let translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3())
            let direction = this.isLookingDown ? new Cesium.HeadingPitchRange(90.0, -90.0, 0.0) : new Cesium.HeadingPitchRange(0.0, -0.5, boundingSphere.radius * 2)
            this.tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation)
            this.viewer.camera.viewBoundingSphere(boundingSphere, direction)
            this.viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY)

          }).otherwise((error) => {
            throw (error)
          })
        }
      },

      _openCamera() {
        if (!this.isload) {
          let vid = document.getElementById('video')
          this.extent = this.getCurrentExtent()

          this.polygon = this.viewer.entities.add({
            polygon: {
              hierarchy: this.extent,
              material: vid,
              classificationType: Cesium.ClassificationType.BOTH
            }
          })
          this.isload = true
        }
      },

      _closeCamera() {
        if (this.isload) {
          this.viewer.entities.remove(this.polygon)
          this.isload = false
        }
      },

      getCurrentExtent() {
        let extent = [] // 范围对象
        let scene = this.viewer.scene // 得到当前三维场景
        let canvas = scene.canvas

        extent.push(
          scene.pickPosition(
            // canvas左上角
            new Cesium.Cartesian2(1, 1)
          )
        )
        extent.push(
          scene.pickPosition(
            // canvas左下角
            new Cesium.Cartesian2(1, canvas.height - 1)
          )
        )
        extent.push(
          scene.pickPosition(
            // canvas右下角
            new Cesium.Cartesian2(canvas.width - 1, canvas.height - 1)
          )
        )
        extent.push(
          scene.pickPosition(
            // canvas右上角
            new Cesium.Cartesian2(canvas.width - 1, 1)
          )
        )

        return extent
      },

      _flyHome () {
        let geolocation = Cesium.Cartographic.fromCartesian(this.tileset.boundingSphere.center)
        let point = this.Cartesian3_to_WGS84(Cesium.Cartographic.toCartesian(geolocation))
        this.viewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(point.lng, point.lat, 2000),
          orientation: {
            // 即yaw, 围绕Y轴旋转 偏航角
            heading: Cesium.Math.toRadians(0.0),
            // 围绕X轴旋转 俯仰角
            pitch: Cesium.Math.toRadians(-90.0),
            // 围绕Z轴旋转 翻滚角
            roll: 0.0
          },
          complete: () => {
            // setTimeout(() => {
            //   this.viewer.camera.flyTo({
            //     destination: Cesium.Cartesian3.fromDegrees(point.lng, point.lat, 3000),
            //     orientation: {
            //       // 即yaw, 围绕Y轴旋转 偏航角
            //       heading: Cesium.Math.toRadians(-180.0),
            //       // 围绕X轴旋转 俯仰角
            //       pitch: Cesium.Math.toRadians(-60.0),
            //       // 围绕Z轴旋转 翻滚角
            //       roll: 0.0
            //     }
            //   })
            // }, 20)
          }
        })
      },

      _drawPoint () {
        this._down()
        // this.viewer.flyTo(building)
        let handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas)
        handler.setInputAction((movement) => {
          let tempPosition = this.getPointFromWindowPoint(movement.position)
          if (tempPosition) {
            let wgs84Point = this.Cartesian3_to_WGS84({
              x: tempPosition.x,
              y: tempPosition.y,
              z: tempPosition.z
            })
            this.fourColorObj.points.push(wgs84Point.lng)
            this.fourColorObj.points.push(wgs84Point.lat)
            this.fourColorObj.points.push(50)

            this._loadFourColorFigure()
          }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

        // 单击鼠标右键结束画点
        handler.setInputAction((movement) => {
          this.allPoints.push(this.fourColorObj.points)
          this.va = JSON.stringify(this.allPoints)
          this.fourColorObj.points = []
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
      },

      _clearDraw () {
        this.fourColorObj.points = []
        this.allPoints = []
        this.clearAll()
      },

      _down () {
        let geolocation = Cesium.Cartographic.fromCartesian(this.tileset.boundingSphere.center)
        geolocation.height = geolocation.height + this.tileset.boundingSphere.radius * 2
        this.viewer.camera.setView({
          destination: Cesium.Cartographic.toCartesian(geolocation),
          orientation: {
            heading: Cesium.Math.toRadians(90.0),
            pitch: Cesium.Math.toRadians(-90.0),
            roll: 0.0
          }
        })
      },
      _right () {
        let webmercator = new Cesium.WebMercatorProjection()
        let xyz = webmercator.project(Cesium.Cartographic.fromCartesian(this.tileset.boundingSphere.center))
        xyz.y = xyz.y - this.tileset.boundingSphere.radius * 2
        let geolocation = webmercator.unproject(xyz)
        geolocation.height = 1.8
        this.viewer.camera.setView({
          destination: Cesium.Cartographic.toCartesian(geolocation),
          orientation: {
            heading: Cesium.Math.toRadians(0.0),
            pitch: Cesium.Math.toRadians(0.0),
            roll: 0.0
          }
        })
      },
      _back () {
        let webmercator = new Cesium.WebMercatorProjection()
        let xyz = webmercator.project(Cesium.Cartographic.fromCartesian(this.tileset.boundingSphere.center))
        xyz.x = xyz.x + this.tileset.boundingSphere.radius * 2
        let geolocation = webmercator.unproject(xyz)
        geolocation.height = 1.8
        this.viewer.camera.setView({
          destination: Cesium.Cartographic.toCartesian(geolocation),
          orientation: {
            heading: Cesium.Math.toRadians(270),
            pitch: Cesium.Math.toRadians(0.0),
            roll: 0.0
          }
        })
      },

      _left () {
        let webmercator = new Cesium.WebMercatorProjection()
        let xyz = webmercator.project(Cesium.Cartographic.fromCartesian(this.tileset.boundingSphere.center))
        xyz.y = xyz.y + this.tileset.boundingSphere.radius * 2
        let geolocation = webmercator.unproject(xyz)
        geolocation.height = 1.8
        this.viewer.camera.setView({
          destination: Cesium.Cartographic.toCartesian(geolocation),
          orientation: {
            heading: Cesium.Math.toRadians(180.0),
            pitch: Cesium.Math.toRadians(0.0),
            roll: 0.0
          }
        })
      },

      _front () {
        let webmercator = new Cesium.WebMercatorProjection()
        let xyz = webmercator.project(Cesium.Cartographic.fromCartesian(this.tileset.boundingSphere.center))
        xyz.x = xyz.x - this.tileset.boundingSphere.radius * 2
        let geolocation = webmercator.unproject(xyz)
        geolocation.height = 1.8
        this.viewer.camera.setView({
          destination: Cesium.Cartographic.toCartesian(geolocation),
          orientation: {
            heading: Cesium.Math.toRadians(90),
            pitch: Cesium.Math.toRadians(0.0),
            roll: 0.0
          }
        })
      },

      _fullscreen () {
        this.$fullscreen.toggle(this.$el.querySelector('.three-model-container'), {
          wrap: false,
          callback: this.fullscreenChange
        })
      },

      _loadFourColorFigure () {
        if (this.fourColorObj.points.length > 2) {
          let building = this.viewer.entities.add({
            polygon: {
              hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights(this.fourColorObj.points),
              extrudedHeight: 0,
              perPositionHeight: true,
              material: Cesium.Color.RED.withAlpha(0.4),
              outline: true,
              outlineColor: Cesium.Color.BLACK
            }
          })
          this.viewer.scene.requestRender()
        }
      },

      fullscreenChange (fullscreen) {
        this.fullscreen = fullscreen
      },

      // 笛卡尔坐标系转WGS84坐标系
      Cartesian3_to_WGS84 (point) {
        let cartesian33 = new Cesium.Cartesian3(point.x, point.y, point.z)
        let cartographic = Cesium.Cartographic.fromCartesian(cartesian33)
        let lat = Cesium.Math.toDegrees(cartographic.latitude)
        let lng = Cesium.Math.toDegrees(cartographic.longitude)
        let alt = cartographic.height
        return {lat: lat, lng: lng, alt: alt}
      },

      getPointFromWindowPoint (point) {
        if (this.viewer.scene.terrainProvider.constructor.name === 'EllipsoidTerrainProvider') {
          return this.viewer.camera.pickEllipsoid(point, this.viewer.scene.globe.ellipsoid)
        } else {
          let ray = this.viewer.scene.camera.getPickRay(point)
          return this.viewer.scene.globe.pick(ray, this.viewer.scene)
        }
      },

      clearAll () {
        this.viewer.entities.removeAll()
        this.viewer.scene.requestRender()
      },
    }
  }
</script>
