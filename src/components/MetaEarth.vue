<script setup>
import { ArcGisMapServerImageryProvider, Camera, Rectangle, Viewer } from 'cesium'
import { markRaw, onMounted, ref } from 'vue'
import { useEarthStore } from '@/store/earth'

const viewerRef = ref(null)
const unvisibleCreditRef = ref(null)
const earthStore = useEarthStore()

Camera.DEFAULT_VIEW_RECTANGLE = Rectangle.fromDegrees(
  75.0, // 东
  0.0, // 南
  140.0, // 西
  60.0, // 北
)

onMounted(() => {
  const viewer = new Viewer(viewerRef.value, {
    animation: false,
    timeline: false,
    geocoder: false,
    homeButton: false,
    scene3DOnly: true,
    baseLayerPicker: false,
    navigationHelpButton: false,
    fullscreenButton: false,
    infoBox: false,
    creditContainer: unvisibleCreditRef.value,
    imageryProvider: new ArcGisMapServerImageryProvider({
      url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
    }),
    msaaSamples: 4,
    selectionIndicator: false,
    contextOptions: {
      requestWebgl2: true,
    },
  })
  const rawViewer = markRaw(viewer)
  earthStore.updateCesiumViewer(rawViewer)
})
</script>

<template>
  <div ref="viewerRef" class="meta-earth" />
  <div v-show="false" ref="unvisibleCreditRef" />
</template>

<style scoped>
.meta-earth {
  width: 100%;
  height: 100%;
}
</style>
