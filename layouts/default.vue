<template>
  <div>
    <transition name="page" mode="out-in">
      <nuxt />
    </transition>
    <!-- <div class="cursor">
      <ul>
        <li
          v-for="post in posts"
          :key="post.id"
          :id="post.id"
          v-lazy-container="{ selector: 'img' }"
        >
          <img :data-src="post.thumbnail" />
        </li>
      </ul>
    </div>-->
  </div>
</template>

<script>
import TweenMax from 'gsap'
import JQuery from 'jquery'
let $ = JQuery

export default {
  methods: {
    customCursor() {
      var $cursor = $('.cursor')
      function moveCursor(e) {
        TweenLite.to($cursor, 0.3, {
          left: e.pageX,
          top: e.pageY
        })
      }
      function activeCursor(e) {
        $cursor.addClass('active')
      }
      function removeActiveCursor(e) {
        $cursor.removeClass('active')
      }
      $(window).on('mousemove', moveCursor)
      $('.list-Details, .icon').on('mouseenter', activeCursor)
      $('.list-Details, .icon').on('mouseleave', removeActiveCursor)
    }
  },
  mounted() {
    this.customCursor()
  }
}
</script>
