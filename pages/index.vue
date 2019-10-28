<template>
  <div>
    <TheHeader :data-header="toggleHeader" />
    <TheAbout :content="content" />
    <div class="view-Container view-Index">
      <ul class="list list-Filter">
        <li class="list-Item">
          <div class="list-Top">
            <img src="~/assets/images/top-ground.png" />
          </div>
          <div class="list-Outer">
            <div class="icons-Row">
              <div class="icon-Container" title="search">
                <img src="~assets/images/search-light.png" class="icon" />
              </div>
            </div>
            <div @click="sortYear" class="list-Year list-Details">
              <p>year</p>
              <p>sort</p>
            </div>
            <div @click="sortTitle" class="list-Title list-Details">
              <p>title</p>
              <p>sort</p>
            </div>
            <div @click="sortCategory" class="list-Category list-Details">
              <p>role</p>
              <p>sort</p>
            </div>
          </div>
        </li>
      </ul>
      <ul class="list">
        <li is="IndexListItem" v-for="post in sortedArray" :key="post.id" :post="post"></li>
      </ul>
    </div>
  </div>
</template>

<script>
import TheHeader from '~/components/TheHeader.vue'
import TheAbout from '~/components/TheAbout.vue'
import IndexListItem from '~/components/IndexListItem.vue'

import JQuery from 'jquery'
let $ = JQuery

import { mapState } from 'vuex'

export default {
  components: {
    TheHeader: TheHeader,
    TheAbout: TheAbout,
    IndexListItem: IndexListItem
  },
  data: function() {
    return {
      toggleHeader: false,
      lastScrollPosition: 0,
      sorting: -1,
      toggleSortingYear: false,
      toggleSortingTitle: false,
      toggleSortingCategory: false,
      sortByYear: true,
      sortByTitle: false,
      sortByCategory: false
    }
  },
  asyncData(context) {
    return context.app.$storyapi
      .get('cdn/stories/about', {
        version: process.env.NODE_ENV === 'production' ? 'published' : 'draft'
      })
      .then(res => {
        return {
          content: res.data.story.content.content
        }
      })
  },
  computed: {
    ...mapState({
      posts: state => state.posts.list
    }),
    sortedArray: function() {
      if (this.sortByYear) {
        if (this.toggleSortingYear) {
          return this.posts
            .slice(0)
            .sort((a, b) => (a.year < b.year ? this.sorting : -this.sorting))
        } else {
          return this.posts
            .slice(0)
            .sort((a, b) => (a.year > b.year ? this.sorting : -this.sorting))
        }
      }
      if (this.sortByTitle) {
        if (this.toggleSortingTitle) {
          return this.posts
            .slice(0)
            .sort(
              (a, b) =>
                a.title.toLowerCase() < b.title.toLowerCase()
                  ? this.sorting
                  : -this.sorting
            )
        } else {
          return this.posts
            .slice(0)
            .sort(
              (a, b) =>
                a.title.toLowerCase() > b.title.toLowerCase()
                  ? this.sorting
                  : -this.sorting
            )
        }
      }
      if (this.sortByCategory) {
        if (this.toggleSortingCategory) {
          return this.posts
            .slice(0)
            .sort(
              (a, b) =>
                a.category.toLowerCase() < b.category.toLowerCase()
                  ? this.sorting
                  : -this.sorting
            )
        } else {
          return this.posts
            .slice(0)
            .sort(
              (a, b) =>
                a.category.toLowerCase() > b.category.toLowerCase()
                  ? this.sorting
                  : -this.sorting
            )
        }
      } else {
        return this.posts
      }
    }
  },
  methods: {
    sortYear() {
      this.sortByYear = true
      this.sortByTitle = false
      this.sortByCategory = false
      this.toggleSortingYear = !this.toggleSortingYear
    },
    sortTitle() {
      this.sortByYear = false
      this.sortByTitle = true
      this.sortByCategory = false
      this.toggleSortingTitle = !this.toggleSortingTitle
    },
    sortCategory() {
      this.sortByYear = false
      this.sortByTitle = false
      this.sortByCategory = true
      this.toggleSortingCategory = !this.toggleSortingCategory
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
    }
  },
  watch: {},
  mounted() {
    window.addEventListener('scroll', this.onScroll)
    window.scroll(0, window.innerHeight)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
  }
}
</script>
