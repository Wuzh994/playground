<script setup>
  import { onMounted, ref, reactive } from 'vue'
  import { useScroll, useWindowSize } from '@vueuse/core'

  const el = ref(null)
  const size = reactive(useWindowSize())

  const colors = [
    ['rgba(43, 143, 254, 1)', 'rgba(216, 224, 252, 0.5)'],
    ['rgba(51, 87, 219, 1)', 'rgba(216, 224, 252, 0.5)'],
    ['rgba(217, 182, 130, 1)', 'rgba(238, 220, 184, 0.5)'],
  ]

  function initCanvas(canvas, width = 400, height = 400, _dpi = null) {
    const ctx = canvas.getContext('2d')

    const dpr = window.devicePixelRatio || 1
    const bsr = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1
    const dpi = _dpi || dpr / bsr

    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    canvas.width = dpi * width
    canvas.height = dpi * height
    ctx.scale(dpi, dpi)

    return { ctx, dpi }
  }

  onMounted(() => {
    const canvas = el.value
    const { ctx } = initCanvas(canvas, size.width, size.height)

    const draw = ([c1 = 'red', c2 = 'green'], x = 0, y = 200, r = 100) => {
      const linear = ctx.createLinearGradient(0,0,200,200)
      linear.addColorStop(0,c1);
      linear.addColorStop(1,c2);

      ctx.beginPath()
      // 圆环
      ctx.lineWidth = 50
      ctx.arc(x, y, r, 0, Math.PI * 2, true);
      // 上色
      ctx.strokeStyle = linear
      ctx.stroke();
      ctx.closePath()
    }

    // 圆环半径
    const radius = 100
    // y轴坐标
    const pointY = (n = 1) => (2 * n - 1) * radius

    for (let i = 1; i < Math.floor(size.width / 4 * radius) + 1; i++) {
      // 左侧 x=0 右侧 x=窗口大小
      draw(colors[(i-1) % colors.length], i % 2 === 0 ? size.width : '0', pointY(i))
    }

    window.addEventListener('scroll', () => {
      canvas.style.animationName = 'gg'
    })
  })
</script>

<template>
  <canvas ref="el"></canvas>
</template>

<style>
#app {
  overflow: hidden;
}

canvas {
  position: relative;
  transition: all 2s ease-in-out;
  animation: 3s linear 1s alternate;
}

@keyframes gg {
  0% {
    top: 0;
  }
  50% {
    top: -50px;
  }
  100% {
    top: 0;
  }
}
</style>
