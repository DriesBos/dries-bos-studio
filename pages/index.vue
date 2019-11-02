<template>
  <div class="view-Container">
    <TheHeader :data-toggle-profile="toggleProfile" />
    <TheAbout :content="content" :data-toggle-profile="toggleProfile" />
    <section class="view-Index">
      <ul class="list list-Filter" :data-toggle-filter="toggleFilter">
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
    </section>
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
      toggleFilter: false,
      toggleProfile: true,
      lastScrollPosition: 0, // Used for header
      previousScrollPosition: 0, // Used for direction
      scrollDirection: '',
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
    // TODO: KISS
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
    onScrollToggleHeader() {
      // https://medium.com/@Taha_Shashtari/hide-navbar-on-scroll-down-in-vue-fb85acbdddfe
      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 60) {
        return
      }
      this.toggleHeader = currentScrollPosition > this.lastScrollPosition
      this.lastScrollPosition = currentScrollPosition
    },
    onScrollToggleFilter() {
      if (window.pageYOffset > window.innerHeight * 1.01) {
        this.toggleFilter = true
      } else {
        this.toggleFilter = false
      }
    },
    onScrollToggleProfile() {
      if (window.pageYOffset < window.innerHeight * 0.25) {
        this.toggleProfile = true
      } else {
        this.toggleProfile = false
      }
    },
    onScrollDirection() {
      let currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop
      if (currentScrollPosition > this.lastScrollPosition) {
        this.scrollDirection = 'DOWN'
      } else {
        this.scrollDirection = 'UP'
      }
    },
    scrollToTop() {},
    widestElement(e) {
      const list = document.getElementsByClassName(`${e}`)
      const listWidths = []
      for (let i = 0; i < list.length; i++) {
        listWidths.push(list[i].offsetWidth)
      }
      var widest = Math.max(...listWidths) + 1
      for (var i = 0; i < list.length; i++) {
        list[i].style.width = `${widest}px`
      }
    },
    startPosition() {
      window.scroll(0, window.innerHeight)
      this.toggleFilter = false
    }
  },
  beforeMount() {
    this.startPosition()
  },
  mounted() {
    window.addEventListener('beforeunload', this.startPosition)
    window.addEventListener('scroll', () => {
      this.onScrollToggleHeader()
      this.onScrollToggleFilter()
      this.onScrollToggleProfile()
      this.onScrollDirection()
      this.scrollToTop()
    }),
      this.widestElement(`list-Year`)
    this.widestElement(`list-Title`)
    this.widestElement(`list-Category`)
  },
  destroyed() {
    window.removeEventListener('resize', this.widestElement(`list-Year`))
    window.removeEventListener('resize', this.widestElement(`list-Title`))
    window.removeEventListener('resize', this.widestElement(`list-Category`))
    window.removeEventListener('scroll', () => {
      this.onScrollToggleHeader()
      this.onScrollToggleFilter()
      this.onScrollToggleProfile()
    })
  }
}
</script>
