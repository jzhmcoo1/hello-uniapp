<template>
  <view class="page-container">
    <view class="uni-card">
      <view class="uni-card-title">
        <text class="uni-title">测试手势事件</text>
      </view>
      <view class="uni-card-content">
        <view v-for="(value, name) in guestureEventTest" :key="name">
          {{ name }}: {{ value }}
        </view>
        <button @tap="handleTap" @longtap="handleLongTap" @longpress="handleLongPress" @touchstart="handleTouchStart"
          @touchmove="handleTouchMove" @touchend="handleTouchEnd">
          用我测试手势事件 👀
        </button>
      </view>
    </view>

    <view class="uni-card">
      <view class="uni-card-title">
        <text class="uni-title">测试事件修饰符stop</text>
      </view>
      <view class="uni-card-content">
        <view class="parent" @tap="parentTap">
          <view class="son" @tap.stop="sonTap">
            son使用了stop
          </view>
        </view>
      </view>
    </view>

    <view class="uni-card">
      <view class="uni-card-title">
        <text class="uni-title">测试事件修饰符capture</text>
      </view>
      <view class="uni-card-content">
        <view class="parent" @tap.capture="parentTap">
          <view class="son" @tap="sonTap">
            parent使用了capture，触发比son早
          </view>
        </view>
      </view>
    </view>

    <view class="uni-card">
      <view class="uni-card-title">
        <text class="uni-title">测试动画事件</text>
      </view>
      <view class="uni-card-content">
        <view v-for="(value, name) in animationEventTest" :key="name">
          {{ name }}: {{ value }}
        </view>
        <view ref="boxView" @animationstart="handleAnimationStart" @animationiteration="handleAnimationIteration"
          @animationend="handleAnimationEnd" :class="{
            box: true,
            'box-animation': boxAnimation
          }"></view>
        <button @tap="startAnimation">
          点击开始动画 👀
        </button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'mp-event-handler',
  data() {
    return {
      guestureEventTest: {
        tap: 0,
        longtap: 0,
        longpress: 0,
        touchstart: 0,
        touchmove: 0,
        touchend: 0,
      },
      boxAnimation: false,
      animationEventTest: {
        animationstart: 0,
        animationiteration: 0,
        animationend: 0,
      }
    }
  },
  methods: {
    parentTap(e) {
      console.log('parentTap',e)
    },
    sonTap(e) {
      console.log('sonTap',e)
    },
    startAnimation() {
      this.boxAnimation = !this.boxAnimation
    },
    handleAnimationStart() {
      this.animationEventTest.animationstart++
    },
    handleAnimationIteration() {
      this.animationEventTest.animationiteration++
    },
    handleAnimationEnd() {
      this.animationEventTest.animationend++
      this.boxAnimation = false
    },
    handleTap() {
      this.guestureEventTest.tap++
    },
    handleLongTap() {
      this.guestureEventTest.longtap++
    },
    handleLongPress() {
      this.guestureEventTest.longpress++
    },
    handleTouchStart() {
      this.guestureEventTest.touchstart++
    },
    handleTouchMove() {
      this.guestureEventTest.touchmove++
    },
    handleTouchEnd() {
      this.guestureEventTest.touchend++
    },
  }
}
</script>

<style scoped>
.box-animation {
  animation: fade 1s ease-in-out 2;
}

@keyframes fade {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.parent {
  width: 200px;
  height: 200px;
  background-color: #f00;
}

.son {
  width: 100px;
  height: 100px;
  background-color: #0f0;
}
</style>