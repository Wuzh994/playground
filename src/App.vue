<script setup>
import { onMounted, ref } from 'vue'
import anime from 'animejs/lib/anime.es.js';
import ASwiper from './components/ASwiper.vue';
import CanvasBackground from './components/CanvasBackground.vue';

function randomValues(offset = 20) {
  anime({
    targets: '.random-demo .circle',
    translateY: function() {
      return offset
    },
    duration: 1000,
    easing: 'easeInOutQuad',
    direction: 'alternate',
  });
}

function debounce(fn, daley = 500) {
  let timer = null
  return function () {
    if(timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn()
    }, daley)
  }
}

onMounted(() => {
  // window.addEventListener('scroll', debounce(randomValues))
})
</script>

<template>
  <CanvasBackground />
  <!-- <ASwiper /> -->
  <!-- <div class="random-demo">
    <div v-for="i in 6" :key="i" class="item">
      <div class="circle"></div>
    </div>
  </div> -->
</template>

<style scoped>
.random-demo {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
}
.random-demo .circle {
  position: relative;
  width: 40vw;
  height: 40vw;
  border-radius: 50%;
  opacity: 0.5;
}

.item {
  display: flex;
}
.item:nth-child(2n-1) {
  position: relative;
  right: -8vw;
  justify-content: flex-end;

}

.item:nth-child(2n) {
  position: relative;
  left: -8vw;
  justify-content: flex-start;
}

.item:nth-child(1) .circle,
.item:nth-child(4) .circle {
  background: linear-gradient(to right top, #b0f0e9, #eefaf9);
}

.item:nth-child(2) .circle,
.item:nth-child(5) .circle {
  background: linear-gradient(to right top, #b8d5f4, #f6fafd);
}

.item:nth-child(3) .circle,
.item:nth-child(6) .circle {
  background: linear-gradient(to right top, #f9df87, #fcfbf8);
}
</style>
