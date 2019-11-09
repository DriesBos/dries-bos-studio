<template>
  <div class="view-Container">
    <transition name="fade"></transition>
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
              <p @click="sortYear">sort</p>
            </div>
            <div class="list-Title list-Details">
              <p>project</p>
              <p @click="sortTitle">sort</p>
            </div>
            <div class="list-Category list-Details">
              <p>type</p>
              <p @click="sortCategory">sort</p>
            </div>
            <div class="list-Search" v-bind:class="{ active: searchHasInput }">
              <input type="text" v-model="search" ref="search" placeholder="type search.." />
              <div @click="searchFocus" class="icon-Container" title="search">
                <img src="~assets/images/search-light.png" class="icon" />
              </div>
            </div>
          </div>
        </li>
        <li is="IndexListItem" v-for="post in filteredList" :key="post.id" :post="post"></li>
        <li class="list-Item list-Item_Footer">
          <div class="list-Top">
            <img src="~/assets/images/top-ground.png" />
          </div>
          <div class="list-Outer">
            <div class="list-Mail list-Details">
              <a href="mailto:info@driesbos.com">info@driesbos.com</a>
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
                title="view project"
                v-scroll-to="{
          el: '.view-Index',
          duration: 600}"
              >
                <img src="~assets/images/arrow-up-light.png" class="icon" />
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
    })
    window.addEventListener('scroll', () => {
      this.onScrollToggleFilter()
      this.onScrollToggleProfile()
    })
    window.addEventListener('input', this.searchHasValue)
    this.widestElement(`list-Year`)
    this.widestElement(`list-Title`)
  },
  destroyed() {
    window.addEventListener('beforeunload', this.startPosition)
    window.removeEventListener('resize', () => {
      this.widestElement(`list-Year`)
      this.widestElement(`list-Title`)
    })
    window.removeEventListener('scroll', () => {
      this.onScrollToggleFilter()
      this.onScrollToggleProfile()
    })
    window.removeEventListener('input', this.searchHasValue)
  }
}
</script>
