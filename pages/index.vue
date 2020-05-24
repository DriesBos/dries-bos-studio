<template>
  <div class="view view-Index">
    <div class="spaceForm" v-html="require('~/assets/images/spaceform.svg?include')" />
    <!-- FILTER -->
    <section class="contentListItem-Filter spaced-TopSide">
      <ul class="contentListItem">
        <li class="contentListItem-Column year">
          <div class :class="{ active: sortByYear }" @click="sortYear">
            <p class="cursorInteract" title="sort by year">year</p>
          </div>
        </li>
        <li class="contentListItem-Column category">
          <div
            class="listItem-Category listItem-Details cursorInteract"
            :class="{ active: sortByCategory }"
            @click="sortCategory"
          >
            <p class="cursorInteract" title="sort by role">role</p>
          </div>
        </li>
        <li class="contentListItem-Column agency">
          <div
            class="listItem-Category listItem-Details cursorInteract"
            :class="{ active: sortByCategory }"
            @click="sortCategory"
          >
            <p class="cursorInteract" title="sort by role">agency</p>
          </div>
        </li>
        <li class="contentListItem-Column title">
          <div
            class="listItem-Title listItem-Details cursorInteract"
            :class="{ active: sortByTitle }"
            @click="sortTitle"
          >
            <p class="cursorInteract" title="sort by project">project</p>
          </div>
        </li>
        <li class="contentListItem-Column icons">
          <ul class="contentListItem-Icons">
            <li class="cursorInteract contentListItem-Input" :class="{ active: toggleSearch }">
              <input
                id="search"
                type="text"
                v-model="search"
                ref="search"
                placeholder="search project.."
                title="search project"
              />
            </li>
            <li
              @click="searchIconClick"
              class="cursorInteract contentListItem-Icon contentListItem-Search"
              title="search project"
            >
              <div class="cursorInteract icon icon-Search" :class="{ active: toggleSearch }">
                <div v-html="require('~/assets/images/icon-search.svg?include')" />
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </section>
    <div
      v-if="viewState"
      is="IndexTextItem"
      v-for="post in filteredList"
      :key="post.id"
      :post="post"
    ></div>
    <div v-else is="IndexImageItem" v-for="post in filteredList" :key="post.id" :post="post"></div>
  </div>
</template>

<script>
import IndexTextItem from "~/components/IndexTextItem.vue"
import IndexImageItem from "~/components/IndexImageItem.vue"
import { mapState } from "vuex"

export default {
  scrollToTop: true,
  components: {
    IndexTextItem: IndexTextItem,
    IndexImageItem: IndexImageItem
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
  mounted() {
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
    document.removeEventListener("mouseenter", this.mouseEntersDocument)
  },
  methods: {
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
      document.getElementById("search").focus()
      this.toggleSearch = !this.toggleSearch
    },
    searchHasValue() {
      this.search !== ""
        ? (this.searchHasInput = true)
        : (this.searchHasInput = false)
    }
  }
}
</script>
