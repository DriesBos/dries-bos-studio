<template>
  <main :class="[currentTheme, { spaced: spaceState }]">
    <the-notifications />
    <transition name="page" mode="out-in">
      <nuxt />
    </transition>
    <the-footer />
    <the-navigation @toggleTheme="changeTheme" />
    <the-title />
    <div class="cursor" />
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
      themeNumber: 0,
      currentTheme: "one"
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
      this.removeChangeCursor()
    }
  },
  methods: {
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
