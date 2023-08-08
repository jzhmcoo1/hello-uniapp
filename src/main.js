import App from './App'
import store from './store'
import * as Pinia from 'pinia'

const pinia = Pinia.createPinia()

import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	app.use(store)
	app.use(pinia)
	app.config.globalProperties.$adpid = "1111111111"
	app.config.globalProperties.$backgroundAudioData = {
		playing: false,
		playTime: 0,
		formatedPlayTime: '00:00:00'
	}
	return {
		app,
		Pinia
	}
}
