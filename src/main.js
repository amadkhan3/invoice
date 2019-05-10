import Vue from 'vue'
import App from './App.vue'
import * as moment from 'moment';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
Vue.use(ElementUI)

Vue.use(moment)

Vue.config.productionTip = false


new Vue({
  render: h => h(App),
}).$mount('#app')
