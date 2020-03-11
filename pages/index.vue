<template>
  <div class="view view-Container">
    <section class="view-Index">
      <transition name="view" mode="out-in">
        <ul v-if="viewState" class="list" key="list">
          <li class="listItem listItem_Filter">
            <div class="listItem-DetailsWrapper">
              <div
                class="listItem-Year listItem-Details"
                :class="{ active: sortByYear }"
                @click="sortYear"
              >
                <p title="sort by year">year</p>
              </div>
              <div
                class="listItem-Title listItem-Details"
                :class="{ active: sortByTitle }"
                @click="sortTitle"
              >
                <p title="sort by project">project</p>
              </div>
              <div
                class="listItem-Category listItem-Details"
                :class="{ active: sortByCategory }"
                @click="sortCategory"
              >
                <p title="sort by role">role</p>
              </div>
            </div>
            <div class="listItem-Icons" :class="{ active: toggleSearch }">
              <input type="text" v-model="search" ref="search" placeholder="filter by name" />
              <div @click="searchIconClick" class="icon-Container" title="search projects">
                <div class="icon" v-html="require('~/assets/images/icon-search.svg?include')"></div>
              </div>
            </div>
          </li>
          <li is="IndexListItem" v-for="post in filteredList" :key="post.id" :post="post"></li>
        </ul>
        <ul v-else class="grid" key="grid">
          <li is="IndexGridItem" v-for="post in filteredList" :key="post.id" :post="post"></li>
        </ul>
      </transition>
    </section>
  </div>
</template>

<script>
import IndexListItem from "~/components/IndexListItem.vue"
import IndexGridItem from "~/components/IndexGridItem.vue"
import { mapState } from "vuex"

export default {
  scrollToTop: true,
  components: {
    IndexListItem: IndexListItem,
    IndexGridItem: IndexGridItem
  },
  props: {
    view: Boolean
  },
  data: function() {
    return {
      // Sorting data
      sorting: -1,
      toggleSortingYear: false,
      toggleSortingTitle: false,
      toggleSortingCategory: false,
      toggleSearch: false,
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
      posts: state => state.posts.list,
      viewState: state => state.view.viewState,
      spaceState: state => state.space.spaceState
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
  beforeMount() {
    this.startPosition()
  },
  mounted() {
    window.scrollTo(0, 0)
    window.addEventListener("input", this.searchHasValue)
    document.addEventListener("visibilitychange", this.windowIsVisible)
    window.addEventListener("beforeunload", this.startPosition)
    document.addEventListener("mouseleave", this.mouseLeftDocument)
    document.addEventListener("mouseenter", this.mouseEntersDocument)
  },
  destroyed() {
    window.removeEventListener("input", this.searchHasValue)
    document.removeEventListener("visibilitychange", this.windowIsVisible)
    window.removeEventListener("beforeunload", this.startPosition)
    document.removeEventListener("mouseleave", this.mouseLeftDocument)
  },
  methods: {
    // INIT
    startPosition() {
      window.scroll(0, 0)
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
    searchIconClick() {
      this.$refs.search.focus()
      this.toggleSearch = !this.toggleSearch
    },
    searchHasValue() {
      if (this.search !== "") {
        this.searchHasInput = true
      } else {
        this.searchHasInput = false
      }
    }
  }
}
</script>
