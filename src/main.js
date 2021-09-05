import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './config/store'

import './config/bootstrap'
import './config/axios'
import '../icons'
import './config/msg'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
