<script setup>
import { onMounted } from 'vue'
import { Cartesian3, Math as _Math } from 'cesium'
import { useEarthStore } from '@/store/earth'
import { loadAssetsFile } from '@/utils'

const eartheStore = useEarthStore()

let positionEntity = null
let longitude = 118.15
let latitude = 24.48
let timer = null

function initLocation() {
  positionEntity = eartheStore.cesiumViewer.entities.add({
    position: Cartesian3.fromDegrees(longitude, latitude),
    billboard: {
      show: true,
      image: loadAssetsFile('icons/position.png'),
      width: 25,
      height: 25,
    },
  })
}

function operationHandle(direction, value) {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
  let rotation = _Math.PI_OVER_FOUR
  if (direction === 'horizontal')
    rotation = value < 0 ? _Math.PI_OVER_TWO : -_Math.PI_OVER_TWO

  if (direction === 'vertical')
    rotation = value < 0 ? _Math.PI : 2 * _Math.PI

  timer = setInterval(() => {
    if (direction === 'horizontal')
      longitude += value

    if (direction === 'vertical')
      latitude += value

    positionEntity.position = Cartesian3.fromDegrees(longitude, latitude)
    positionEntity.billboard.rotation = rotation
  }, 500)
}

onMounted(() => {
  initLocation()
})
</script>

<template>
  <div class="operation-panel">
    <button @click="operationHandle('vertical', 0.0005)">
      ↑
    </button>
    <div>
      <button @click="operationHandle('horizontal', -0.0005)">
        ←
      </button>
      <button @click="operationHandle('vertical', -0.0005)">
        ↓
      </button>
      <button @click="operationHandle('horizontal', 0.0005)">
        →
      </button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.operation-panel {
  position: fixed;
  right: 10px;
  bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
