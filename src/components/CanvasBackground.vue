<script setup>
  import { onMounted, ref, unref } from 'vue'
  import { useScroll, useElementBounding, useThrottleFn } from '@vueuse/core'

  // 偏移值
  const offset = 10
  // 圆环半径
  const radius = 100
  const wrapper = ref(null)

  // canvas
  const el = ref(null)
  const { directions } = useScroll(window)
  const { width: wrapperWidth, height: wrapperHeight } = useElementBounding(wrapper)

  const colors = [
    ['rgba(43, 143, 254, 1)', 'rgba(216, 224, 252, 0.54)'],
    ['rgba(51, 87, 219, 1)', 'rgba(216, 224, 252, 0.54)'],
    ['rgba(217, 182, 130, 1)', 'rgba(216, 224, 252, 0.54)'],
  ]

  function initCanvas(canvas, width = 400, height = 400, _dpi = null) {
    const _width = unref(width)
    const _height = unref(height)

    const ctx = canvas.getContext('2d')

    const dpr = window.devicePixelRatio || 1
    const bsr = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1
    const dpi = _dpi || dpr / bsr

    canvas.style.width = `${_width}px`
    canvas.style.height = `${_height}px`
    canvas.style.top = 0
    canvas.width = dpi * _width
    canvas.height = dpi * _height
    ctx.scale(dpi, dpi)

    return { ctx, dpi }
  }

  onMounted(() => {
    const canvas = el.value
    const { ctx } = initCanvas(canvas, wrapperWidth, wrapperHeight)

    // 画圆环
    const draw = ([c1, c2], x = 0, y = 200, r = 100) => {
      const x0 = Math.floor(x)
      const y0 = Math.floor(y)
      // TODO
      const _offset = Math.floor(Math.PI*r/3)
      const x1 = x0 + _offset
      const y1 = y0 + _offset

      let linear = ctx.createLinearGradient(x0, y0, x1, y1)
      linear.addColorStop(0,c1);
      linear.addColorStop(1,c2);

      ctx.beginPath()
      ctx.lineWidth = 50
      // 圆环
      ctx.arc(x, y, r, 0, Math.PI * 2, true);
      // 上色
      ctx.strokeStyle = linear
      ctx.stroke();
      ctx.closePath()
    }

    // 根据高度画圆环
    for (let i = 1; i < Math.floor(wrapperHeight.value / (2 * radius)) + 1; i++) {
      // 左侧 x=0 右侧 x=容器大小
      const _x = i % 2 === 0 ? wrapperWidth.value : 0
      const _y = i * 2 * radius
      draw(colors[(i-1) % colors.length], _x, _y)
    }

    const throttleFn = useThrottleFn(() => {
      const _top = +canvas.style.top.slice(0, -2)
      if (directions.top) {
        canvas.style.top = _top - offset + 'px'
      }
      if (directions.bottom) {
        canvas.style.top = _top + offset + 'px'
      }
    }, 100)
    window.addEventListener('scroll',throttleFn)
  })
</script>

<template>
  <div ref="wrapper">
    <canvas ref="el"></canvas>
  </div>
</template>

<style>
#app {
  overflow: hidden;
}

div {
  width: 100%;
  height: 2000px;
}
canvas {
  position: relative;
  transition: all 2s ease-in-out;
}
</style>
