import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import theme from './theme'

Vue.use(Vuex)

export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters,
	modules: {
		theme
	}
})
