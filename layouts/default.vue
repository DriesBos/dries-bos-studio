<template>
  <div>
    <transition name="pageFade" mode="out-in">
      <nuxt />
    </transition>
    <!-- <div class="cursor" :data-theme="isList"></div> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TweenMax from 'gsap'
import JQuery from 'jquery'
let $ = JQuery

export default {
  computed: mapState({
    isList: state => state.posts.isList
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
