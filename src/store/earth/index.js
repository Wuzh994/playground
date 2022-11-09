import { defineStore } from 'pinia'

export const useEarthStore = defineStore('earthStore', {
  state: () => ({
    cesiumViewer: null,
  }),
  actions: {
    updateCesiumViewer(viewer) {
      this.cesiumViewer = viewer
    },
  },
})
