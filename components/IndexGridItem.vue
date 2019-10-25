<template>
  <nuxt-link
    :to="'/blog/' + post.id"
    :key="post.id"
    :id="post.id"
    class="grid-Item"
    tag="li"
    v-lazy-container="{ selector: 'img' }"
  >
    <div class="grid-Ratio">
      <img :data-src="post.thumbnail" />
      <div class="grid-Details">
        <div class="grid-Cursor ellipsis" :class="post.id">
          <p>{{ post.title }}</p>
          <p>{{ post.category }}</p>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import { mapState } from 'vuex'
import TweenMax from 'gsap'
import JQuery from 'jquery'
let $ = JQuery

export default {
  name: 'IndexGridItem',
  props: {
    post: Object
  },
  methods: {
    customGridCursor() {
      var $gridcursor = $(`.grid-Cursor.${this.post.id}`)
      function moveCursor(e) {
        TweenLite.to($gridcursor, 0, {
          left: e.offsetX,
          top: e.offsetY
        })
        console.log(e, 'GRID')
      }
      // $(`#${this.post.id}`).on('mousemove', moveCursor)
      document
        .querySelector(`.grid-Item#${this.post.id}`)
        .addEventListener('mousemove', moveCursor, false)
    }
  },
  computed: mapState({
    isList: state => state.posts.isList,
    isLight: state => state.posts.isLight
  }),
  mounted() {
    this.customGridCursor()
  }
}
</script>