<template>
  <div class="view view-Index">
    <!-- FILTER -->
    <section class="contentListItem-Filter">
      <div
        class="spaceForm"
        v-html="require('~/assets/images/spaceform.svg?include')"
      />
      <ul class="contentListItem">
        <li class="contentListItem-Column year">
          <div class :class="{ active: sortByYear }" @click="sortYear">
            <p class="cursorInteract" title="sort by year">year</p>
          </div>
        </li>
        <li class="contentListItem-Column title titleSearch">
          <div
            class="listItem-Title listItem-Details"
            :class="{ active: sortByTitle }"
            @click="sortTitle"
          >
            <p class="cursorInteract" title="sort by project">project</p>
          </div>
        </li>
        <li class="contentListItem-Column agency">
          <div
            class="listItem-Agency listItem-Details"
            :class="{ active: sortByAgency }"
            @click="sortAgency"
          >
            <p class="cursorInteract" title="sort by role">agency</p>
          </div>
        </li>
        <li class="contentListItem-Column category">
          <div
            class="listItem-Category listItem-Details"
            :class="{ active: sortByCategory }"
            @click="sortCategory"
          >
            <p class="cursorInteract" title="sort by role">role</p>
          </div>
        </li>
        <!-- SEARCH -->
        <li class="contentListItem-Column icons search">
          <ul class="contentListItem-Icons">
            <li
              v-click-outside="outsideSearch"
              class="contentListItem-Input"
              :class="{ active: toggleSearch }"
            >
              <input
                id="search"
                ref="search"
                v-model="search"
                class="cursorInteract"
                type="text"
                placeholder="search project.."
                title="search project"
                size="13"
              />
            </li>
            <li
              class="contentListItem-Icon contentListItem-Search"
              title="search project"
              @click.stop="searchIconClick"
            >
              <div
                class="cursorInteract icon icon-Search"
                :class="{ active: toggleSearch }"
              >
                <div
                  v-html="require('~/assets/images/icon-search.svg?include')"
                />
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </section>
    <template v-if="viewState">
      <nuxt-link
        v-for="post in filteredList"
        :id="post.id"
        :key="post.id"
        :to="`/projects/${post.id}`"
        class="contentListItem-List cursorInteract"
        tag="section"
      >
        <ul class="contentListItem">
          <li class="contentListItem-Column year">
            <p title="project year">{{ post.year || "" }}</p>
          </li>
          <li class="contentListItem-Column title">
            <p title="project title">{{ post.title || "" }}</p>
          </li>
          <li class="contentListItem-Column agency">
            <p title="project agency">{{ post.agency || "" }}</p>
          </li>
          <li class="contentListItem-Column category">
            <p title="project category">{{ post.category || "" }}</p>
          </li>
          <li class="contentListItem-Column icons">
            <ul class="contentListItem-Icons">
              <li class="contentListItem-Icon contentListItem-Arrow">
                <div
                  class="icon icon-Arrow"
                  title="view project"
                  v-html="require('~/assets/images/icon-arrow.svg?include')"
                ></div>
              </li>
            </ul>
          </li>
        </ul>
      </nuxt-link>
    </template>
    <template v-if="!viewState">
      <IndexImageItem
        v-for="post in filteredList"
        :key="post.id"
        :post="post"
      ></IndexImageItem>
    </template>
    <TheFooter />
  </div>
</template>

<script>
import onPageLoad from "@/mixins/onPageLoad"
import { mapState } from "vuex"
import detectIt from "detect-it"

export default {
  mixins: [onPageLoad],
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
      toggleSortingAgency: false,
      toggleSearch: false,
      sortByYear: true,
      sortByTitle: false,
      sortByCategory: false,
      sortByAgency: false,
      // Search data
      search: "",
      searchHasInput: false
    }
  },
  computed: {
    ...mapState({
      posts: state => state.posts.list,
      viewState: state => state.view.viewState
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
      }
      if (this.sortByAgency) {
        if (this.toggleSortingAgency) {
          return this.posts
            .slice(0)
            .sort((a, b) =>
              a.agency.toLowerCase() < b.agency.toLowerCase()
                ? this.sorting
                : -this.sorting
            )
        } else {
          return this.posts
            .slice(0)
            .sort((a, b) =>
              a.agency.toLowerCase() > b.agency.toLowerCase()
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
    document.addEventListener("mouseleave", this.mouseLeftDocument)
    document.addEventListener("mouseenter", this.mouseEntersDocument)
    document.addEventListener("keydown", this.escapeSearch)
  },
  destroyed() {
    window.removeEventListener("input", this.searchHasValue)
    document.removeEventListener("mouseleave", this.mouseLeftDocument)
    document.removeEventListener("mouseenter", this.mouseEntersDocument)
    document.removeEventListener("keydown", this.escapeSearch)
  },
  methods: {
    // FILTER
    sortYear() {
      this.sortByYear = true
      this.sortByTitle = false
      this.sortByCategory = false
      this.sortByAgency = false
      this.toggleSortingYear = !this.toggleSortingYear
    },
    sortTitle() {
      this.sortByYear = false
      this.sortByTitle = true
      this.sortByCategory = false
      this.sortByAgency = false
      this.toggleSortingTitle = !this.toggleSortingTitle
    },
    sortCategory() {
      this.sortByYear = false
      this.sortByTitle = false
      this.sortByCategory = true
      this.sortByAgency = false
      this.toggleSortingCategory = !this.toggleSortingCategory
    },
    sortAgency() {
      this.sortByYear = false
      this.sortByTitle = false
      this.sortByCategory = false
      this.sortByAgency = true
      this.toggleSortingAgency = !this.toggleSortingAgency
    },
    // SEARCH
    searchIconClick() {
      this.toggleSearch = !this.toggleSearch
      var search = document.getElementById("search")
      if (this.toggleSearch) {
        setTimeout(function() {
          // TODO: Still doesnt work properly in IOS safari
          if (detectIt.deviceType === "touchOnly") {
            search.setAttribute("autofocus", "autofocus")
            search.focus()
          } else {
            search.focus()
          }
        }, 100)
      } else {
        this.search = ""
      }
    },
    searchHasValue() {
      this.search !== ""
        ? (this.searchHasInput = true)
        : (this.searchHasInput = false)
    },
    escapeSearch() {
      if (event.keyCode === 27 && this.toggleSearch) {
        this.toggleSearch = false
        this.search = ""
      }
    },
    outsideSearch() {
      this.toggleSearch = false
    }
  }
}
</script>
