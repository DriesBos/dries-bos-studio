import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

/*eslint-disable */
Vue.filter('resize', (image, option) => {
  var imageService = '//img2.storyblok.com/'
  var path = image.replace('//a.storyblok.com', '')
  return imageService + option + path
})
/* eslint-enable */

Vue.use(VueLazyload)
