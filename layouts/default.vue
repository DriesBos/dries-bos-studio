<template>
  <div>
    <transition name="pageFade" mode="out-in">
      <nuxt :data-theme="isLight" class="view-Theme" />
    </transition>
    <!-- <div class="cursor" :data-theme="isLight"></div> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TweenMax from 'gsap'
import JQuery from 'jquery'
let $ = JQuery

export default {
  computed: mapState({
    isLight: state => state.posts.isLight
  }),
  methods: {
    // customCursor() {
    //   var $cursor = $('.cursor')
    //   function moveCursor(e) {
    //     TweenLite.to($cursor, 0.3, {
    //       left: e.pageX,
    //       top: e.pageY
    //     })
    //   }
    //   $(window).on('mousemove', moveCursor)
    // }
  },
  mounted() {
    // this.customCursor()
  }
}
</script>
