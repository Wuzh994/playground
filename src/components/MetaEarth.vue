<script setup>
import { Viewer } from 'cesium'
import { onMounted } from 'vue'

onMounted(() => {
  const viewer = new Viewer('cesiumContainer')
})
</script>

<template>
  <div id="cesiumContainer" />
</template>

<style scoped>
html,
body,
#cesiumContainer {
  width: 100%;
  height: 100%;
}
</style>
