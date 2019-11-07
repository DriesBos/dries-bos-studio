<template>
  <div class="view-Container">
    <transition name="fade">
      <div
        v-if="toggleLandingHelper"
        class="landing-Helper"
        v-scroll-to="{
          el: '.view-Index',
          offset: -250,
          duration: 1000,
        }"
      >
        <div class="landing-Icon" title="scroll down">
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
            <div @click="sortYear" class="list-Year list-Details">
              <p>date</p>
              <p>sort</p>
            </div>
            <div @click="sortTitle" class="list-Title list-Details">
              <p>project</p>
              <p>sort</p>
            </div>
            <div @click="sortCategory" class="list-Category list-Details">
              <p>type</p>
              <p>sort</p>
            </div>
            <div @click="searchFocus" class="list-Search">
              <input type="text" v-model="search" ref="search" placeholder=" search" />
              <div class="icon-Container" title="search">
                <img src="~assets/images/search-light.png" class="icon" />
              </div>
            </div>
          </div>
        </li>
      </ul>
      <ul class="list list-Work">
        <!-- <li is="IndexListItem" v-for="post in sortedArray" :key="post.id" :post="post"></li> -->
        <li is="IndexListItem" v-for="post in filteredList" :key="post.id" :post="post"></li>
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
      // Toggle data
      toggleHeader: false,
      toggleFilter: false,
      toggleProfile: false,
      toggleLandingHelper: true,
      // Sorting data
      sorting: -1,
      toggleSortingYear: false,
      toggleSortingTitle: false,
      toggleSortingCategory: false,
      sortByYear: true,
      sortByTitle: false,
      sortByCategory: false,
      // Search data
      search: ''
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
    },
    filteredList() {
      return this.posts.filter(post => {
        return post.title.toLowerCase().includes(this.search.toLowerCase())
      })
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
    },
    searchFocus() {
      this.$refs.search.focus()
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
