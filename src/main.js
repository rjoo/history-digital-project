import '@babel/polyfill'
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueSimpleMarkdown from 'vue-simple-markdown'
import 'normalize.css'
import App from './App.vue'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDG6tWOyqdhkLIR3r9qd09xGG8a_3OObFs',
    libraries: 'drawing'
  }
})

Vue.use(VueSimpleMarkdown)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
