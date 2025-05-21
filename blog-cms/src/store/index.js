import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import notification from './modules/notification'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		app,
		settings,
		notification
	},
	getters
})
