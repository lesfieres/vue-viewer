import { GoodreadsService } from 'api-services'
import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

const goodreadsService = new GoodreadsService(
  'lYwnIVdlFF07o68qJG6RA',
  'ytkNhWG6DL4MtRbTi3Tx1nMngoikRKYZXC6yQlaiu5g',
)
goodreadsService.search('game', 1, 3).then(books => {
  console.log('BOOOKS', books)
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
