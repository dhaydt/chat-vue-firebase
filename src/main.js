import Vue from "vue";
import firebase from "./fb";
import App from "./App.vue";
import router from "./router";
// import store from "./store";
import ViewUI from "view-design";
import VueMaterial from 'vue-material'
import vuetify from './plugins/vuetify';
import UploadImage from 'vue-upload-image';
import * as VueGoogleMaps from 'vue2-google-maps';
import './plugins/bootstrap-vue'
import "view-design/dist/styles/iview.css";
import 'vue-material/dist/theme/default.css'
import 'vue-material/dist/vue-material.min.css'

// register globally
Vue.use(ViewUI);
Vue.use(VueMaterial)
Vue.config.productionTip = false;
Vue.component('upload-image', UploadImage)

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB0OtBE3F-enboxjZk05xXqgDkaSxTxc8Y',
    libraries: 'places',
  }
});

new Vue({
  router,
  firebase,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
