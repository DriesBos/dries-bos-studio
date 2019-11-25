<template>
  <div class="view-Container">
    <TheAbout :content="content" :data-toggle-profile="toggleProfile" />
    <section class="view-Index">
      <ul class="list">
        <li class="list-Item list-Item_Header" :data-toggle-filter="toggleFilter">
          <div class="list-Top">
            <img src="~/assets/images/top-ground.png" />
          </div>
          <div class="list-Outer">
            <div class="list-Logo list-Year list-Details">
              <p
                v-scroll-to="{
          el: '.view-Index',
          duration: 600
        }"
                title="thats me!"
              >Dries Bos</p>
            </div>
            <div class="list-Nav list-Details">
              <p v-scroll-to="{
          el: '.view-Index',
          duration: 600
        }">Work</p>
              <p
                v-scroll-to="{
          el: '.view-Profile',
          duration: 600
        }"
              >About</p>
              <p
                v-scroll-to="{
          el: '.list-Item_Footer',
          duration: 600,
          easing: 'ease-in'

        }"
              >Contact</p>
            </div>
          </div>
        </li>
        <li class="list-Item list-Item_Filter">
          <div class="list-Top">
            <img src="~/assets/images/top-ground.png" />
          </div>
          <div class="list-Outer">
            <div class="list-Year list-Details">
              <p>date</p>
              <p @click="sortYear" title="sort by date">sort</p>
            </div>
            <div class="list-Title list-Details">
              <p>project</p>
              <p @click="sortTitle" title="sort by project">sort</p>
            </div>
            <div class="list-Category list-Details">
              <p>type</p>
              <p @click="sortCategory" title="sort by type">sort</p>
            </div>
            <div class="list-Search" v-bind:class="{ active: searchHasInput }">
              <input type="text" v-model="search" ref="search" placeholder="filter by name" />
              <div @click="searchFocus" class="icon-Container" title="search projects">
                <img src="~assets/images/search-red.png" class="icon" />
              </div>
            </div>
          </div>
        </li>
        <li is="IndexListItem" v-for="post in filteredList" :key="post.id" :post="post"></li>
        <li class="list-Item list-Item_Footer" :data-toggle-footer="toggleFooter">
          <div class="list-Top">
            <img src="~/assets/images/top-ground.png" />
          </div>
          <div class="list-Outer">
            <div class="list-Mail list-Details">
              <a href="mailto:info@driesbos.com" title="say hello!">info@driesbos.com</a>
            </div>
            <div class="list-Social list-Details">
              <a
                href="https://www.instagram.com/driesbosstudio/"
                target="_blank"
                rel="noopener noreferrer"
              >Instagram</a>
              <a
                href="https://www.linkedin.com/in/drbos/"
                target="_blank"
                rel="noopener noreferrer"
              >LinkedIn</a>
              <a href="https://github.com/DriesBos" target="_blank" rel="noopener noreferrer">Github</a>
              <a
                href="https://codepen.io/driesbos"
                target="_blank"
                rel="noopener noreferrer"
              >Codepen</a>
            </div>
            <div class="icons-Row">
              <div
                class="icon-Container"
                title="scroll to top"
                v-scroll-to="{
          el: '.view-Index',
          duration: 600}"
              >
                <img src="~assets/images/arrow-up-light.png" class="icon" />
                <img src="~assets/images/arrow-up-red.png" class="icon" />
              </div>
            </div>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import TheAbout from '~/components/TheAbout.vue'
import IndexListItem from '~/components/IndexListItem.vue'
import JQuery from 'jquery'
import { mapState } from 'vuex'
let $ = JQuery

export default {
  components: {
    TheAbout: TheAbout,
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
      search: '',
      searchHasInput: false
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
    // SEARCH
    searchFocus() {
      this.$refs.search.focus()
    },
    searchHasValue() {
      if (this.search !== '') {
        this.searchHasInput = true
      } else {
        this.searchHasInput = false
      }
    },
    // BROWSER APIS
    windowIsVisible() {
      if (document.visibilityState === 'hidden') {
        document.title = '👀 You there?'
        this.toggleFilter = false
        // let randomNumber = Math.floor(Math.random() * 3)
        // if (randomNumber === 0) {
        // }
        // if (randomNumber === 1) {
        //   document.title = '☕️ Coffee break?'
        // }
        // if (randomNumber === 2) {
        //   document.title = '💔 Baby is gone..'
        // }
      } else {
        document.title = '🧑‍🚀 Dries Bos'
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
    this.widestElement(`list-Year`)
    this.widestElement(`list-Title`)
    window.addEventListener('resize', () => {
      this.widestElement(`list-Year`)
      this.widestElement(`list-Title`)
    })
    window.addEventListener('scroll', () => {
      this.onScrollToggleFilter()
      this.onScrollToggleProfile()
      this.onScrollToggleFooter()
    })
    window.addEventListener('input', () => {
      this.widestElement(`list-Year`)
      this.widestElement(`list-Title`)
    })
    window.addEventListener('input', this.searchHasValue)
    document.addEventListener('visibilitychange', this.windowIsVisible)
    window.addEventListener('beforeunload', this.startPosition)
    document.addEventListener('mouseleave', this.mouseLeftDocument)
    document.addEventListener('mouseenter', this.mouseEntersDocument)
  },
  destroyed() {
    window.removeEventListener('resize', () => {
      this.widestElement(`list-Year`)
      this.widestElement(`list-Title`)
    })
    window.removeEventListener('scroll', () => {
      this.onScrollToggleFilter()
      this.onScrollToggleProfile()
      this.onScrollToggleFooter()
    })
    window.removeEventListener('input', () => {
      this.widestElement(`list-Year`)
      this.widestElement(`list-Title`)
    })
    window.removeEventListener('input', this.searchHasValue)
    document.removeEventListener('visibilitychange', this.windowIsVisible)
    window.removeEventListener('beforeunload', this.startPosition)
    document.removeEventListener('mouseleave', this.mouseLeftDocument)
  }
}
</script>
