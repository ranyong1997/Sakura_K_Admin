<script setup lang="ts">
import AMapLoader from '@amap/amap-jsapi-loader'
import { shallowRef, ref } from 'vue'
import { getSystemSettingsApi } from '@/api/vadmin/system/settings'
import { getUserLoginDistributeApi } from '@/api/dashboard/map/index'

defineOptions({
  name: 'DashboardMap'
})

let map = shallowRef()
let AMap = shallowRef()

// AMap.Map 参数大全：https://lbs.amap.com/api/javascript-api/reference/map
// InfoWindow 参数大全：https://lbs.amap.com/api/javascript-api/reference/infowindow#InfoWindow
// 标记点添加动画：https://blog.csdn.net/qq_39417037/article/details/124040318
const setValues = async () => {
  const infoWindow = new AMap.value.InfoWindow({
    offset: new AMap.value.Pixel(2, 15),
    closeWhenClickMap: true,
    isCustom: true,
    anchor: 'top-left'
  })
  const res = await getUserLoginDistributeApi()
  if (res) {
    const markers = res.data.map((item) => {
      const center = item.center
      let circleMarker = ref()
      if (item.total > 40) {
        circleMarker.value = new AMap.value.Marker({
          position: center,
          offset: new AMap.value.Pixel(0, 15) //点偏移量
        })
        // 创建标记点的div
        var markerDiv = document.createElement('div')
        // 设置标记点className,用于设置点的样式（动画）
        markerDiv.className = 'alarmDevice'
        // 将标记点div，设置为标记点内容
        circleMarker.value.setContent(markerDiv)
      } else {
        circleMarker.value = new AMap.value.CircleMarker({
          center: center,
          radius: item.total > 30 ? 20 : item.total / 2, // 3D视图下，CircleMarker半径不要超过64px
          strokeColor: '#f05b72',
          strokeWeight: 2,
          strokeOpacity: 0.5,
          fillColor: '#f05b72',
          fillOpacity: 0.5,
          zIndex: 10,
          bubble: true,
          cursor: 'pointer',
          clickable: true
        })
      }
      // 鼠标移入标记点事件
      circleMarker.value.on('mouseover', () => {
        infoWindow.setContent(
          `<div class="description">
              <div class="name-box">
                <span class="point"></span>
                <span class="name">${item.name}</span>
              </div>
              <span>${item.total}</span>
            </div>`
        )
        infoWindow.open(map.value, center)
      })
      // 鼠标移出标记点
      circleMarker.value.on('mouseout', () => {
        infoWindow.close(map.value, center)
      })
      return circleMarker.value
    })
    map.value.add(markers)
  }
}

</script>

<template>
  <div id="map-container"></div>
</template>

<style scoped lang="less">
#map-container {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 800px;
}

#map-container :deep(.description) {
  background-color: #fff;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  border: 2px solid #f05b72;
  border-radius: 5px;
  font-size: 14px;
}

#map-container :deep(.point) {
  display: inline-block;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background-color: #f05b72;
  margin-bottom: 1px;
  margin-right: 2px;
}

#map-container :deep(.name-box) {
  display: inline;
  margin-right: 8px;
}

#map-container :deep(.alarmDevice) {
  text-align: center;
  margin: 0 auto;
  width: 30px;
  height: 30px;
  background-color: #f13737;
  box-shadow: 0px 0px 15px #f61212;
  border-radius: 50%;
  -webkit-animation-name: 'alarmDeviceBreath'; /*动画属性名，也就是我们前面keyframes定义的动画名*/
  -webkit-animation-duration: 1s; /*动画持续时间*/
  -webkit-animation-timing-function: ease; /*动画频率，和transition-timing-function是一样的*/
  -webkit-animation-delay: 0s; /*动画延迟时间*/
  -webkit-animation-iteration-count: infinite; /*定义循环资料，infinite为无限次*/
  -webkit-animation-direction: alternate; /*定义动画方式*/
}
</style>

<style>
@keyframes alarmDeviceBreath {
  0% {
    margin-left: 0;
    margin-top: 0;
    width: 30px;
    height: 30px;
    box-shadow: 0px 0px 15px #f61212;
    opacity: 1.2;
  }

  100% {
    margin-left: 5px;
    margin-top: 5px;
    width: 20px;
    height: 20px;
    box-shadow: 0px 0px 10px #f61212;
    opacity: 0.6;
  }
}
</style>
