<template>
  <nuxt-link :to="'/blog/' + post.id" :key="post.id" :id="post.id" class="list-Item" tag="li">
    <div class="icons-Row">
      <div class="icon-Container" title="view project">
        <img v-if="isLight" src="~assets/images/arrow-right-dark.png" class="icon" />
        <img v-else src="~assets/images/arrow-right-light.png" class="icon" />
      </div>
    </div>
    <div class="list-Details ellipsis">
      <p class="list-Year">{{ post.year }}</p>
      <p class="list-Title">{{ post.title }}</p>
      <p class="list-Category">{{ post.category }}</p>
    </div>
    <div class="list-Cursor" :class="post.id">
      <img class="image" :src="post.thumbnail" />
    </div>
  </nuxt-link>
</template>

<script>
import { mapState } from 'vuex'
import TweenMax from 'gsap'
import JQuery from 'jquery'
let $ = JQuery

export default {
  name: 'IndexListItem',
  props: {
    post: Object
  },
  methods: {
    customListCursor() {
      var $listcursor = $(`.list-Cursor.${this.post.id}`)
      function moveCursor(e) {
        TweenLite.to($listcursor, 0, {
          left: e.pageX,
          top: e.offsetY
        })
        console.log(e, 'LIST')
      }
      // $(`#${this.post.id}`).on('mousemove', moveCursor)
      document
        .querySelector(`.list-Item#${this.post.id}`)
        .addEventListener('mousemove', moveCursor, false)
    },
    widestElement(e) {
      const list = document.getElementsByClassName(`${e}`)
      const listWidths = []
      // Push offsetWidth property to new list
      for (let i = 0; i < list.length; i++) {
        listWidths.push(list[i].offsetWidth)
      }
      // Get highest number of the new list
      var widest = Math.max(...listWidths) + 1
      // Add new width to all el with class x
      for (var i = 0; i < list.length; i++) {
        list[i].style.width = `${widest}px`
      }
    }
  },
  computed: mapState({
    isList: state => state.posts.isList,
    isLight: state => state.posts.isLight
  }),
  mounted() {
    this.customListCursor()
    this.widestElement(`list-Year`)
    this.widestElement(`list-Title`)
    this.widestElement(`list-Type`)
  }
}
</script>
