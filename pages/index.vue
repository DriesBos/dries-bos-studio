<template>
  <div class="view-Container">
    <transition name="fade">
      <div v-if="toggleLandingHelper" class="landing-Helper">
        <div class="icon-Container" title="scroll down">
          <img src="~assets/images/arrow-down-dark.png" class="icon" />
        </div>
      </div>
    </transition>
    <TheHeader />
    <TheAbout :content="content" :data-toggle-profile="toggleProfile" />
    <section class="view-Index">
      <ul class="list list-Filter" :data-toggle-filter="toggleFilter">
        <li class="list-Item">
          <div class="list-Top">
            <img src="~/assets/images/top-ground.png" />
          </div>
          <div class="list-Outer">
            <!-- <div class="icons-Row">
              <div class="icon-Container" title="search">
                <img src="~assets/images/search-light.png" class="icon" />
              </div>
            </div>-->
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
      <ul class="list list-Work">
        <li is="IndexListItem" v-for="post in sortedArray" :key="post.id" :post="post"></li>
      </ul>
    </section>
  </div>
</template>

<script>
import TheAbout from '~/components/TheAbout.vue'
import TheHeader from '~/components/TheHeader.vue'
import IndexListItem from '~/components/IndexListItem.vue'
import JQuery from 'jquery'
import { mapState } from 'vuex'
let $ = JQuery

export default {
  components: {
    TheAbout: TheAbout,
    TheHeader: TheHeader,
    IndexListItem: IndexListItem
  },
  data: function() {
    return {
      toggleHeader: false,
      toggleFilter: false,
      toggleProfile: false,
      toggleLandingHelper: true,
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
    // INIT
    startPosition() {
      window.scroll(0, 0)
      this.toggleFilter = false
    },
    // SCROLL BEHAVIOR
    onScrollToggleFilter() {
      if (window.pageYOffset > window.innerHeight * 0.5) {
        this.toggleFilter = true
      } else {
        this.toggleFilter = false
      }
    },
    onScrollToggleProfile() {
      let scrollPosition = document.documentElement.scrollTop
      if (scrollPosition === 0) {
        this.toggleProfile = true
      } else {
        this.toggleProfile = false
      }
    },
    onScrollToggleLandingHelper() {
      let scrollPosition = document.documentElement.scrollTop
      if (scrollPosition !== 0) {
        this.toggleLandingHelper = false
      }
    },
    // LIST ELEMENTS UNIFORM WIDTH
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
    // FILTER
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
    }
  },
  beforeMount() {
    this.startPosition()
  },
  mounted() {
    window.addEventListener('beforeunload', this.startPosition)
    window.addEventListener('resize', () => {
      this.widestElement(`list-Year`)
      this.widestElement(`list-Title`)
      this.widestElement(`list-Category`)
    })
    window.addEventListener('scroll', () => {
      this.onScrollToggleFilter()
      this.onScrollToggleProfile()
      this.onScrollToggleLandingHelper()
    })
    this.widestElement(`list-Year`)
    this.widestElement(`list-Title`)
    this.widestElement(`list-Category`)
  },
  destroyed() {
    window.addEventListener('beforeunload', this.startPosition)
    window.removeEventListener('resize', () => {
      this.widestElement(`list-Year`)
      this.widestElement(`list-Title`)
      this.widestElement(`list-Category`)
    })
    window.removeEventListener('scroll', () => {
      this.onScrollToggleFilter()
      this.onScrollToggleProfile()
      this.onScrollToggleLandingHelper()
    })
  }
}
</script>
