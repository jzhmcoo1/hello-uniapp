<template>
	<view>
		<web-view :src="url" @message="getMessage"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// url: 'https://uniapp.dcloud.io/static/web-view.html'
				// uniapp的web-view页面中，没有引入小红书的sdk，按钮点击失效
				// 线上先使用小红书的域名
				url: 'https://www.xiaohongshu.com/miniapp/miniapp-webview?fullscreen=true&disableDragBack=yes&disableBackForwardNavigationGestures=true'

			}
		},
		onLoad(options) {
			if (options && options.url) {
				this.url = options.url;
			}
		},
		methods: {
			getMessage(event) {
				uni.showModal({
					content: JSON.stringify(event.detail),
					showCancel: false
				});
			}
		}
	}
</script>

<style>

</style>
