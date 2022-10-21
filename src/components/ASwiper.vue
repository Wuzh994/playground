<script setup>
import { onMounted, ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const swiperRef = ref(null)
// 取值为轮播长度
const activeIndex = ref(3)
onMounted(() => {
  // console.log(swiperRef)
  swiperRef.value.$el.swiper.slideTo(activeIndex.value)
})

// const modules = []
const onSwiper = (swiper) => {
  // console.log(swiper)
}
const onSlideChange = (swiper) => {
  // console.log('slideChange')
  // console.log(swiper)
  activeIndex.value = swiper.activeIndex
}

function handleDot(e) {
  const { index } = e.target.dataset
  swiperRef.value.$el.swiper.slideTo(index)

}
</script>

<template>
  <div class="a-swiper">
    <ul class="swiper-dots" @click="handleDot">
      <li class="dot" :class="activeIndex === 0 ? 'dot-active' : ''" data-index="0">1</li>
      <li class="dot" :class="activeIndex === 1 ? 'dot-active' : ''" data-index="1">2</li>
      <li class="dot" :class="activeIndex === 2 ? 'dot-active' : ''" data-index="2">3</li>
      <li class="dot" :class="activeIndex === 3 ? 'dot-active' : ''" data-index="3">4</li>
    </ul>
    <swiper
      ref="swiperRef"
      :slides-per-view="1"
      :space-between="50"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <!-- <slot> -->
        <swiper-slide>1</swiper-slide>
        <swiper-slide>2</swiper-slide>
        <swiper-slide>3</swiper-slide>
        <swiper-slide>4</swiper-slide>
      <!-- </slot> -->
    </swiper>
  </div>
</template>

<style lang="less" scoped>
.a-swiper {
  display: flex;
  flex-direction: column;
  align-items: center;
  .swiper-dots {
    position: relative;
    display: flex;
    list-style: none;
    padding: 0;
    // margin: 0;
    &::after {
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 3px;
      border-radius: 1px;
      content: '';
      background-color: #DDEDFF;
    }
    .dot {
      margin: 0 33px;
      width: 16px;
      height: 16px;
      border: 1px solid #ccc;
      border-radius: 50%;
      background-color: #90C2FC;
      text-align: center;
      cursor: pointer;
      z-index: 1;
    }
    .dot-active {
      background-color: #007AFF;
      animation: wave 2s linear infinite;
    }

    @keyframes wave {
      0% {
        box-shadow: none;
        opacity: 1;
      }
      25% {
        box-shadow: 0 0 8px #007AFF;
        opacity: 0.5;
      }
      50% {
        box-shadow: 0 0 16px #007AFF;
        opacity: 1;
      }
      75% {
        box-shadow: 0 0 8px #007AFF;
        opacity: 0.5;
      }
      100% {
        box-shadow: none;
        opacity: 1;
      }
    }
  }
  .swiper {
    width: 500px;
    height: 200px;
    border: 1px solid #ccc;
  }
}
</style>
