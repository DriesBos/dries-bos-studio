<template>
  <div>
    <TheStars />
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
          <img :data-src="post.thumbnail" :id="post.id" />
        </li>
      </ul>
    </div>-->
  </div>
</template>

<script>
import TheStars from '~/components/TheStars.vue'
import TweenMax from 'gsap'
import JQuery from 'jquery'
import { mapState } from 'vuex'
let $ = JQuery

export default {
  components: {
    TheStars: TheStars
  },
  // computed: {
  //   ...mapState({
  //     posts: state => state.posts.list
  //   })
  // },
  methods: {
    customCursor() {
      var $cursor = $('.cursor')
      // Cursor movement
      function moveCursor(e) {
        TweenLite.to($cursor, 0.3, {
          left: e.pageX,
          top: e.pageY
        })
      }
      // Get ID from list items
      function imageCursor(e) {
        if (e.currentTarget.className === 'list-Item') {
          $cursor.addClass('image')
        }
      }
      function removeImageCursor(e) {
        if (e.currentTarget.className === 'list-Item') {
          $cursor.removeClass('image')
        }
      }
      function showID(e) {
        if (e.currentTarget.className === 'list-Item') {
          console.log($cursor[0].firstChild.childNodes)
        }
      }
      $(window).on('mousemove', moveCursor)
      $('.list-Item').on('mouseenter', imageCursor)
      $('.list-Item').on('mouseenter', showID)
      $('.list-Item').on('mouseleave', removeImageCursor)
    }
  },
  mounted() {
    // this.customCursor()
  }
}
</script>
