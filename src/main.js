// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import BootstrapVue from 'bootstrap-vue'
import moment from 'moment'

// import bootstrap librairy
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import columnSortable from 'vue-column-sortable'

Vue.use(columnSortable);
Vue.use(BootstrapVue);

Vue.config.productionTip = false
/* eslint-disable no-new */
// customer filter formatDate
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY hh:mm')
  }
});

Vue.filter('readMore', function (text, length, suffix) {
    return text.substring(0, length) + suffix;
});


import json from './json/MOCK_DATA.json'

 new Vue({
  el: "#app",
  components: { App },
  template: '<App/>'
});






