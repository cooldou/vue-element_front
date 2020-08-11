import Vue from 'vue'
import Vuebar from 'vuebar'
import ElementUI from 'element-ui'
import VueResize from 'vue-resize'
import VueAMap from 'vue-amap'
import Fullscreen from 'vue-fullscreen'

import 'element-ui/lib/theme-chalk/index.css'
import 'vue-resize/dist/vue-resize.css'

import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

import dayjs from 'dayjs'

function createElement() {
  const round = document.createElement('div')
  round.className = 'v-spinner'
  const div3 = document.createElement('div')
  div3.className = 'v-ring v-ring1'
  const div31 = document.createElement('div')
  div31.className = 'v-ring v-ring2'
  const div32 = document.createElement('div')
  div32.className = 'v-ring v-ring3'
  div3.appendChild(div31)
  div3.appendChild(div32)
  round.appendChild(div3)

  return round
}

Vue.use(Vuebar)
Vue.use(ElementUI)
Vue.use(VueResize)
Vue.use(VueAMap)
Vue.use(Fullscreen)

const requireComponent = require.context(
  './components/inputs',
  false,
  /[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const componentName = upperFirst(
    camelCase(
      fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
    )
  )

  Vue.component(
    componentName,
    componentConfig.default || componentConfig
  )
})

Vue.directive('loading', {
  bind: (el, binding) => {
    const tempDiv = document.createElement('div')
    tempDiv.className = 'loading-spinner-container'
    tempDiv.appendChild(createElement())
    const curStyle = window.getComputedStyle(el)
    const position = curStyle.position
    if (position === 'absolute' || position === 'relative') {
      el.style.position = position
    } else {
      if (el.className.indexOf('el-dialog__wrapper') === -1) {
        el.style.position = 'relative'
      }
    }
    el.loadingElement = tempDiv
    if (binding.value) {
      el.appendChild(tempDiv)
    }
  },
  update: (el, binding, vnode) => {
    if (binding.value) {
      if (el.loadingElement.parentNode === null) {
        el.appendChild(el.loadingElement)
      }
    } else {
      if (el === el.loadingElement.parentNode) {
        el.removeChild(el.loadingElement)
      }
    }
  }
})

VueAMap.initAMapApiLoader({
  key: '1ea48c3c929868fa5f39b425455b7b05',
  plugin: [
    'AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale',
    'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor',
    'AMap.CircleEditor', 'AMap.Geocoder', 'AMap.Driving', 'AMap.Circle'
  ],
  v: '1.4.4'
})

Vue.filter('strftime', (value, format = 'YYYY-MM-DD') => {
  if (!value) return '';

  return dayjs(value).format(format)
});

Vue.filter('riskLevel', value => {
  switch (value) {
  case 1:
    return '重大风险'
  case 2:
    return '较大风险'
  case 3:
    return '一般风险'
  case 4:
    return '低风险'
  }
})

Vue.filter('hiddenDangerLevel', value => {
  switch (value) {
  case 0:
    return '无';
  case 1:
    return '重大隐患';
  case 2:
    return '一般隐患'
  }
})

Vue.prototype.$resolveRoutePath = function(path) {
  return `/${this.$route.meta.primaryNavPath}/${path}`
}

Vue.config.productionTip = false

Vue.prototype.dateDesc = function (data) {// 转时间戳
  return data ? dayjs(data).format('YYYY-MM-DD') : ''
}

Vue.prototype.dateTimeDesc = function (data) {// 转时间戳
  return data ? dayjs(data).format('YYYY-MM-DD HH:mm') : ''
}

Vue.prototype.$replaceLoadingElement = function (instance) {
  // 替换elementUI的loading 效果 （该方法用于服务方式）
  const loading = ElementUI.Loading.service({
    target: instance.$el.querySelector('.el-message-box')
  })
  let htmlList = document.getElementsByClassName('el-loading-mask')
  if (htmlList && htmlList.length) {
    let loadingHtml = htmlList[0]
    loadingHtml.innerHTML = ''
    loadingHtml.appendChild(createElement())
  }
  return loading
}
