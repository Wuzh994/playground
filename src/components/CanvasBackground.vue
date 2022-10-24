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
    ['rgba(255, 0, 0, 1)', 'rgba(0, 0, 255, 1)'],
    ['rgba(0, 255, 0, 1)', 'rgba(0, 255, 0, 1)'],
    ['rgba(0, 0, 255, 1)', 'rgba(255, 0, 0, 1)'],
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
      // const _x =
      // let linear = ctx.createLinearGradient(x, 0, 200, 200)
      const _x = Math.floor(x)
      const _y = Math.floor(y)
      console.log(_x, _y)
      // const _offset = Math.floor(Math.PI*r/12)
      const _offset = Math.floor(Math.PI*r/8)
      console.log(_offset)
      let linear = ctx.createLinearGradient(_x, _y, _x + _offset, _y + _offset)
      // let linear = ctx.createLinearGradient(x, y, x + Math.PI*r/6, y + Math.PI*r/6)

      // TODO
      // console.log(c1, c2)
      linear.addColorStop(0,c1);
      linear.addColorStop(1,c2);

      ctx.lineWidth = 50
      ctx.beginPath()
      // 圆环
      ctx.arc(x, y, r, 0, Math.PI * 2, true);
      // 上色
      ctx.strokeStyle = linear
      ctx.closePath()
      ctx.stroke();
      linear = null
    }

    // y轴坐标
    const pointY = (n = 1) => (2 * n - 1) * radius
    // 根据高度画圆环
    // for (let i = 1; i < Math.floor(wrapperHeight.value / (2 * radius)) + 1; i++) {
    //   // 左侧 x=0 右侧 x=窗口大小
    //   console.log('==> ', (i-1) % colors.length)
    //   draw(colors[(i-1) % colors.length], i % 2 === 0 ? wrapperWidth.value / 2 : 0, pointY(i))
    // }
    draw(colors[0], 2*radius, pointY(1))
    draw(colors[1], wrapperWidth.value / 2, pointY(2))

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
