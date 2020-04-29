<template>
  <div class="view view-Index">
    <div class="spaceForm"></div>
    <section class="contentListItem-Filter spaced-TopSide">
      <ul class="contentListItem">
        <li class="contentListItem-Column">
          <div class :class="{ active: sortByYear }" @click="sortYear">
            <p class="cursorInteract" title="sort by year">year</p>
          </div>
        </li>
        <li class="contentListItem-Column">
          <div
            class="listItem-Title listItem-Details hovered"
            :class="{ active: sortByTitle }"
            @click="sortTitle"
          >
            <p class="cursorInteract" title="sort by project">project</p>
          </div>
        </li>
        <li class="contentListItem-Column">
          <div
            class="listItem-Category listItem-Details hovered"
            :class="{ active: sortByCategory }"
            @click="sortCategory"
          >
            <p class="cursorInteract" title="sort by role">role</p>
          </div>
        </li>
        <li class="contentListItem-Column">
          <ul class="contentListItem-Icons">
            <!-- <div class="listItem-Icons" :class="{ active: toggleSearch }">
            <input type="text" v-model="search" ref="search" placeholder="filter by name" />
            <div @click="searchIconClick" class="icon-Container" title="search projects">
              <div class="icon" v-html="require('~/assets/images/icon-search.svg?include')"></div>
            </div>
            </div>-->
          </ul>
        </li>
      </ul>
    </section>
    <div is="IndexListItem" v-for="post in filteredList" :key="post.id" :post="post"></div>

    <section class="imageGrid">
      <div is="IndexGridItem" v-for="post in filteredList" :key="post.id" :post="post"></div>
    </section>
  </div>
</template>

<script>
import IndexListItem from "~/components/IndexListItem.vue"
import IndexGridItem from "~/components/IndexGridItem.vue"
import { mapState } from "vuex"
import JQuery from "jquery"
let $ = JQuery

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
    $(".hovered").on("mouseover", this.changeCursor)
    $(".hovered").on("mouseleave", this.removeChangeCursor)
    window.addEventListener("scroll", this.toggleBlock)
    window.addEventListener("input", this.searchHasValue)
    document.addEventListener("visibilitychange", this.windowIsVisible)
    window.addEventListener("beforeunload", this.startPosition)
    document.addEventListener("mouseleave", this.mouseLeftDocument)
    document.addEventListener("mouseenter", this.mouseEntersDocument)
  },
  destroyed() {
    window.removeEventListener("scroll", this.toggleBlock)
    $(".hovered").off("mouseover", this.changeCursor)
    $(".hovered").off("mouseleave", this.removeChangeCursor)
    window.removeEventListener("input", this.searchHasValue)
    document.removeEventListener("visibilitychange", this.windowIsVisible)
    window.removeEventListener("beforeunload", this.startPosition)
    document.removeEventListener("mouseleave", this.mouseLeftDocument)
    document.removeEventListener("mouseenter", this.mouseEntersDocument)
  },
  methods: {
    // CURSOR
    changeCursor() {
      let $cursor = $(".cursor")
      $cursor.addClass("interact")
    },
    removeChangeCursor() {
      let $cursor = $(".cursor")
      $cursor.removeClass("interact")
    },
    // SCROLL
    toggleBlock() {
      let scrollPosition = document.documentElement.scrollTop
      if (scrollPosition > 0) {
        $("#floatBlock").addClass("active")
      } else {
        $("#floatBlock").removeClass("active")
      }
    },
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
