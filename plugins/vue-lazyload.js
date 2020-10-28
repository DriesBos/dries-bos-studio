import Vue from "vue"
import VueLazyload from "vue-lazyload"

// vue-lazyload options
// https://www.npmjs.com/package/vue-lazyload
Vue.use(VueLazyload, {
  preLoad: 1.5
})
