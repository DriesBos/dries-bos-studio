<template>
  <div class="view view-Container">
    <section class="view-Index">
      <ul class="list">
        <li class="list-Item list-Item_Filter">
          <div class="list-Title list-Details" @click="sortTitle">
            <p title="sort by project">project</p>
          </div>
          <div class="list-Category list-Details" @click="sortCategory">
            <p title="sort by role">role</p>
          </div>
          <div class="list-Icons" v-bind:class="{ active: searchHasInput }">
            <input type="text" v-model="search" ref="search" placeholder="filter by name" />
            <div @click="searchFocus" class="icon-Container" title="search projects">
              <img src="~assets/images/search-red.png" class="icon" />
            </div>
          </div>
        </li>
        <li is="IndexListItem" v-for="post in filteredList" :key="post.id" :post="post"></li>
      </ul>
    </section>
  </div>
</template>

<script>
import IndexListItem from "~/components/IndexListItem.vue"
import JQuery from "jquery"
import { mapState } from "vuex"
let $ = JQuery

export default {
  components: {
    IndexListItem: IndexListItem
  },
  data: function() {
    return {
      // Toggle data
      toggleFilter: false,
      toggleProfile: true,
      toggleFooter: false,
      // Sorting data
      sorting: -1,
      toggleSortingYear: false,
      toggleSortingTitle: false,
      toggleSortingCategory: false,
      sortByYear: true,
      sortByTitle: false,
      sortByCategory: false,
      // Search data
      search: "",
      searchHasInput: false
    }
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
            .sort((a, b) =>
              a.title.toLowerCase() < b.title.toLowerCase()
                ? this.sorting
                : -this.sorting
            )
        } else {
          return this.posts
            .slice(0)
            .sort((a, b) =>
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
            .sort((a, b) =>
              a.category.toLowerCase() < b.category.toLowerCase()
                ? this.sorting
                : -this.sorting
            )
        } else {
          return this.posts
            .slice(0)
            .sort((a, b) =>
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
      return this.sortedArray.filter(post => {
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
    onScrollToggleFooter() {
      var pageHeight = document.documentElement.offsetHeight
      var windowHeight = window.innerHeight
      var scrollPosition =
        window.scrollY ||
        window.pageYOffset ||
        document.body.scrollTop +
          ((document.documentElement && document.documentElement.scrollTop) ||
            0)
      if (pageHeight <= windowHeight + scrollPosition) {
        this.toggleFooter = true
      } else {
        this.toggleFooter = false
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
    // SEARCH
    searchFocus() {
      this.$refs.search.focus()
    },
    searchHasValue() {
      if (this.search !== "") {
        this.searchHasInput = true
      } else {
        this.searchHasInput = false
      }
    },
    // BROWSER APIS
    windowIsVisible() {
      if (document.visibilityState === "hidden") {
        document.title = "👀 You there?"
        this.toggleFilter = false
      } else {
        document.title = "🧑‍🚀 Dries Bos — Web & Interaction Developer"
        let scrollPosition = document.documentElement.scrollTop
        if (scrollPosition > window.innerHeight * 0.5) {
          this.toggleFilter = true
        }
      }
    },
    mouseLeftDocument() {
      this.toggleFilter = false
      let scrollPosition = document.documentElement.scrollTop
      if (scrollPosition === 0 && this.toggleProfile === true) {
        this.toggleProfile = false
      }
    },
    mouseEntersDocument() {
      let scrollPosition = document.documentElement.scrollTop
      if (scrollPosition > window.innerHeight * 0.5) {
        this.toggleFilter = true
      }
      if (scrollPosition === 0) {
        this.toggleProfile = true
      }
    }
  },
  beforeMount() {
    this.startPosition()
  },
  mounted() {
    window.addEventListener("scroll", () => {
      this.onScrollToggleFilter()
      this.onScrollToggleProfile()
      this.onScrollToggleFooter()
    })
    window.addEventListener("input", this.searchHasValue)
    document.addEventListener("visibilitychange", this.windowIsVisible)
    window.addEventListener("beforeunload", this.startPosition)
    document.addEventListener("mouseleave", this.mouseLeftDocument)
    document.addEventListener("mouseenter", this.mouseEntersDocument)
  },
  destroyed() {
    window.removeEventListener("scroll", () => {
      this.onScrollToggleFilter()
      this.onScrollToggleProfile()
      this.onScrollToggleFooter()
    })
    window.removeEventListener("input", this.searchHasValue)
    document.removeEventListener("visibilitychange", this.windowIsVisible)
    window.removeEventListener("beforeunload", this.startPosition)
    document.removeEventListener("mouseleave", this.mouseLeftDocument)
  }
}
</script>
