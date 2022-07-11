<template>
  <div class="view view-Index">
    <!-- FILTER -->
    <BlockFilter />

    <!-- INDEX LIST -->
    <template v-if="viewState">
      <BlockIndexText
        v-for="post in filteredList"
        :key="post.id"
        :post="post"
      ></BlockIndexText>
    </template>

    <!-- INDEX GRID -->
    <template v-if="!viewState">
      <BlockIndexImage
        v-for="post in filteredList"
        :key="post.id"
        :post="post"
      ></BlockIndexImage>
    </template>

    <TheFooter />
  </div>
</template>

<script>
import onPageLoad from "@/mixins/onPageLoad"
import { mapState } from "vuex"
import detectIt from "detect-it"
import gsap from "gsap"

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
              a.category[0].toLowerCase() < b.category[0].toLowerCase()
                ? this.sorting
                : -this.sorting
            )
        } else {
          return this.posts
            .slice(0)
            .sort((a, b) =>
              a.category[0].toLowerCase() > b.category[0].toLowerCase()
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
  watch: {
    search: function() {
      this.searchInputChanged()
    }
  },
  mounted() {
    this.calculateWidest("contentListItem-Column.year")
    this.calculateWidest("contentListItem-Column.title")
    this.calculateWidest("contentListItem-Column.agency")
    this.calculateWidest("contentListItem-Column.category")
    window.addEventListener("input", this.searchHasValue)
    document.addEventListener("mouseleave", this.mouseLeftDocument)
    document.addEventListener("mouseenter", this.mouseEntersDocument)
    document.addEventListener("keydown", this.escapeSearch)
    window.addEventListener("resize", this.screenResize)
  },
  updated() {
    this.calculateWidest("contentListItem-Column.year")
    this.calculateWidest("contentListItem-Column.title")
    this.calculateWidest("contentListItem-Column.agency")
    this.calculateWidest("contentListItem-Column.category")
  },
  destroyed() {
    window.removeEventListener("input", this.searchHasValue)
    document.removeEventListener("mouseleave", this.mouseLeftDocument)
    document.removeEventListener("mouseenter", this.mouseEntersDocument)
    document.removeEventListener("keydown", this.escapeSearch)
    window.removeEventListener("resize", this.screenResize)
  },
  methods: {
    transformImage(image, option) {
      if (!image) return ""
      if (!option) return ""
      let imageService = "//img2.storyblok.com/"
      let pathOne = image.replace("https://a.storyblok.com", "")
      let pathTwo = pathOne.replace("//a.storyblok.com", "")
      return imageService + option + pathTwo
    },
    calculateWidest(el) {
      var maxWidth = 0
      var array = document.querySelectorAll(`.${el}`)
      array.forEach(el => {
        if (el.offsetWidth > maxWidth) {
          maxWidth = el.offsetWidth
        }
      })
      array.forEach(el => {
        el.style.width = maxWidth + "px"
      })
    },
    screenResize() {
      this.calculateWidest("contentListItem-Column.year")
      this.calculateWidest("contentListItem-Column.title")
      this.calculateWidest("contentListItem-Column.agency")
      this.calculateWidest("contentListItem-Column.category")
    },
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
        this.searchInputChanged()
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
        this.searchInputChanged()
      }
    },
    outsideSearch() {
      this.toggleSearch = false
    },
    searchInputChanged() {
      setTimeout(function() {
        gsap.to("section", {
          opacity: 1,
          y: 0,
          ease: "power1.inOut",
          duration: 0,
          stagger: {
            amount: 0
          }
        })
      }, 10)
    }
  }
}
</script>
