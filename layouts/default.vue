<template>
  <main id="top" :class="[{ dark: currentTheme }, { spaced: spaceState }]">
    <the-title />
    <the-notifications />
    <the-navigation @toggleTheme="changeTheme" />
    <transition name="page" mode="out-in">
      <nuxt />
    </transition>
    <the-footer />
    <div class="cursor">
      <div class="cursor-Small cursor-Instance" />
      <div class="cursor-Large cursor-Instance" />
    </div>
  </main>
</template>

<script>
import TheFooter from "~/components/TheFooter.vue"
import TheNavigation from "~/components/TheNavigation.vue"
import TheNotifications from "~/components/TheNotifications.vue"
import TheTitle from "~/components/TheTitle.vue"
import { mapState } from "vuex"
import JQuery from "jquery"
import gsap from "gsap"
let $ = JQuery

export default {
  components: {
    "the-footer": TheFooter,
    "the-navigation": TheNavigation,
    "the-notifications": TheNotifications,
    "the-title": TheTitle
  },
  data() {
    return {
      currentTheme: false
    }
  },
  computed: {
    ...mapState({
      spaceState: state => state.space.spaceState
    })
  },
  mounted() {
    this.checkDarkMode()
    this.customCursor()
    window.addEventListener("scroll", this.toggleBlock)
    document.addEventListener("visibilitychange", this.windowIsVisible)
    document.addEventListener("mouseleave", this.mouseLeftDocument)
    document.addEventListener("mouseenter", this.mouseEntersDocument)
  },
  destroyed() {
    window.removeEventListener("scroll", this.toggleBlock)
    document.removeEventListener("visibilitychange", this.windowIsVisible)
    document.removeEventListener("mouseleave", this.mouseLeftDocument)
    document.removeEventListener("mouseenter", this.mouseEntersDocument)
  },
  watch: {
    $route() {
      this.removeChangeCursor()
    }
  },
  methods: {
    checkDarkMode() {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        this.currentTheme = true
        $("#messages").addClass("activeOne")
        setTimeout(function() {
          $("#messages").removeClass("activeOne")
        }, 2000)
      }
    },
    toggleBlock() {
      let scrollPosition = document.documentElement.scrollTop
      if (scrollPosition > 0) {
        $("#floatBlock").addClass("active")
      } else {
        $("#floatBlock").removeClass("active")
      }
    },
    changeTheme() {
      this.currentTheme = !this.currentTheme
    },
    customCursor() {
      let $cursor = $(".cursor")
      function moveCursor(e) {
        gsap.to($cursor, 0, {
          left: e.clientX,
          top: e.clientY
        })
      }
      $(window).on("mousemove", moveCursor)
    },
    removeChangeCursor() {
      let $cursor = $(".cursor")
      $cursor.removeClass("interact")
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
