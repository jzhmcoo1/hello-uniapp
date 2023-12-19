<template>
  <view>
    <page-head :title="title"></page-head>
    <view class="uni-title uni-common-pl">输入区域高度自适应，不会出现滚动条</view>
    <view class="uni-textarea">
      <textarea @blur="bindTextAreaBlur" auto-height />
    </view>
    <view class="uni-title uni-common-pl">占位符字体是红色的textarea</view>
    <view class="uni-textarea">
      <textarea :value="value" @input="bindinput" placeholder-style="color:#F76260" placeholder="占位符字体是红色的" />
    </view>
    <button @tap="bindtap">点击复制文本</button>
  </view>
</template>
<script>
export default {
  data() {
    return {
      title: 'textarea',
      focus: false,
      value: '',
    }
  },
  methods: {
    bindTextAreaBlur: function (e) {
      console.log(e.detail.value)
    },
    bindinput(e) {
      this.value = e.detail.value
    },
    bindtap() {
      uni.setClipboardData({
        data: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis corporis cupiditate libero nostrum. A perspiciatis explicabo itaque eaque quaerat ipsa quam sint. Expedita quidem accusamus illo iure mollitia necessitatibus odit!',
        success: function () {
          uni.getClipboardData({
            success: function (res) {
              console.log(res.data) // data
            }
          })
        }
      })
    }
  }
}
</script>

<style></style>
