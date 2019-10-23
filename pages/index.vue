<template>
  <div>
    <div class="cursor" :data-theme="isList"></div>
    <TheHeader :data-header="toggleHeader" />
    <div class="view-Container view-Index" :data-theme="isList">
      <ul class="list">
        <li is="IndexListItem" v-for="post in posts" :key="post.id" :post="post"></li>
      </ul>
    </div>
  </div>
</template>

<script>
import TheHeader from '~/components/TheHeader.vue'
import IndexListItem from '~/components/IndexListItem.vue'
import TweenMax from 'gsap'
import JQuery from 'jquery'
let $ = JQuery

import { mapState } from 'vuex'

export default {
  components: {
    TheHeader: TheHeader,
    IndexListItem: IndexListItem
  },
  data: function() {
    return {
      toggleHeader: false,
      lastScrollPosition: 0
    }
  },
  computed: mapState({
    posts: state => state.posts.list,
    isList: state => state.posts.isList
  }),
  methods: {
    customCursor() {
      var $cursor = $('.cursor')

      function moveCursor(e) {
        TweenLite.to($cursor, 0.3, {
          left: e.pageX,
          top: e.pageY
        })
      }

      function centerCursor(e) {
        TweenLite.to($cursor, 0.3, {
          left: $(window).width() / 2,
          top: $(window).height() / 2
        })
      }

      $(window).on('mousemove', moveCursor)
      $(window).on('mouseleave', centerCursor)
    },
    onScroll() {
      // https://medium.com/@Taha_Shashtari/hide-navbar-on-scroll-down-in-vue-fb85acbdddfe
      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 60) {
        return
      }
      this.toggleHeader = currentScrollPosition > this.lastScrollPosition
      this.lastScrollPosition = currentScrollPosition
    },
    widestElement(el) {
      const list = document.getElementsByClassName(`${el}`)
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
  mounted() {
    window.addEventListener('scroll', this.onScroll)
    this.customCursor()
    this.widestElement(`list-Year`)
    this.widestElement(`list-Title`)
    this.widestElement(`list-Type`)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
  }
}
</script>
