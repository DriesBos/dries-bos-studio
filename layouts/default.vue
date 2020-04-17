<template>
  <main :class="[currentTheme, { spaced: spaceState }, { about: isAboutPage }]">
    <the-notifications />
    <transition name="page" mode="out-in">
      <nuxt />
    </transition>
    <!-- Two headers. One without mix-blend-mode -->
    <the-navigation @toggleTheme="changeTheme" class="header-Normal" />
    <the-navigation @toggleTheme="changeTheme" class="header-Pseudo" />
    <the-close-navigation
      v-if="this.$route.name === 'projects-slug'"
      class="close-Navigation_Blend"
    />
    <the-close-navigation v-if="this.$route.name === 'about'" class="close-Navigation_Normal" />
  </main>
</template>

<script>
import TheCloseNavigation from "~/components/TheCloseNavigation.vue"
import TheNavigation from "~/components/TheNavigation.vue"
import TheNotifications from "~/components/TheNotifications.vue"
import { mapState } from "vuex"
import JQuery from "jquery"
let $ = JQuery

export default {
  components: {
    "the-close-navigation": TheCloseNavigation,
    "the-navigation": TheNavigation,
    "the-notifications": TheNotifications
  },
  data() {
    return {
      themeNumber: 0,
      currentTheme: "one",
      isAboutPage: false
    }
  },
  computed: {
    ...mapState({
      spaceState: state => state.space.spaceState
    })
  },
  mounted() {
    this.checkDarkMode()
    this.checkAboutPage()
    document.addEventListener("visibilitychange", this.windowIsVisible)
    document.addEventListener("mouseleave", this.mouseLeftDocument)
    document.addEventListener("mouseenter", this.mouseEntersDocument)
  },
  destroyed() {
    document.removeEventListener("visibilitychange", this.windowIsVisible)
    document.removeEventListener("mouseleave", this.mouseLeftDocument)
    document.removeEventListener("mouseenter", this.mouseEntersDocument)
  },
  watch: {
    $route() {
      if (this.$route.name === "about" && this.spaceState === false) {
        this.isAboutPage = true
        $("body").addClass("about")
      } else {
        this.isAboutPage = false
        $("body").removeClass("about")
      }
    }
  },
  methods: {
    checkAboutPage() {
      if (this.$route.name === "about" && this.spaceState === false) {
        this.isAboutPage = true
        $("body").addClass("about")
      } else {
        this.isAboutPage = false
        $("body").removeClass("about")
      }
    },
    changeTheme() {
      if (this.themeNumber < 2) {
        this.themeNumber++
      } else {
        this.themeNumber = 0
      }
      if (this.themeNumber === 1) {
        this.currentTheme = "two"
        $("body").removeClass("one")
        $("body").addClass("two")
        $("body").removeClass("three")
        $("body").removeClass("four")
      } else if (this.themeNumber === 2) {
        this.currentTheme = "three"
        $("body").removeClass("one")
        $("body").removeClass("two")
        $("body").addClass("three")
        $("body").removeClass("four")
      } else {
        this.currentTheme = "One"
        $("body").addClass("one")
        $("body").removeClass("two")
        $("body").removeClass("three")
        $("body").removeClass("four")
      }
    },
    checkDarkMode() {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        this.themeNumber = 2
        this.currentTheme = "three"
        $("body").removeClass("one")
        $("body").removeClass("two")
        $("body").addClass("three")
        $("body").removeClass("four")
        $("#messages").addClass("activeOne")
        setTimeout(function() {
          $("#messages").removeClass("activeOne")
        }, 2000)
      }
    },
    // BROWSER APIS
    windowIsVisible() {
      if (document.visibilityState === "hidden") {
        document.title = "👀 You there?"
      } else {
        document.title = "🧑‍🚀 Dries Bos — Web & Interaction Developer"
      }
    },
    mouseLeftDocument() {
      if (this.spaceState === true) {
        $("#floatBlock").removeClass("active")
      }
    },
    mouseEntersDocument() {
      if (this.spaceState === true) {
        $("#floatBlock").addClass("active")
      }
    }
  }
}
</script>
