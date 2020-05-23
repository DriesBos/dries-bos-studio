<template>
  <main id="top" :class="{ spaced: spaceState }">
    <!-- <the-title v-if="this.$route.name === 'index' || spaceState === true" /> -->
    <the-notifications />
    <the-navigation :class="pageType" />
    <transition name="page" mode="out-in">
      <nuxt />
    </transition>
    <!-- <the-footer
      v-show="this.$route.name === 'index' || this.$route.name === 'about' || this.$route.params.slug"
    />-->
    <div class="cursor">
      <div class="cursor-Small cursor-Instance" />
    </div>
  </main>
</template>

<script>
import TheFooter from "~/components/TheFooter.vue"
import TheNavigation from "~/components/TheNavigation.vue"
import TheNotifications from "~/components/TheNotifications.vue"
import TheTitle from "~/components/TheTitle.vue"
import { mapState } from "vuex"
import gsap from "gsap"

export default {
  components: {
    "the-footer": TheFooter,
    "the-navigation": TheNavigation,
    "the-notifications": TheNotifications,
    "the-title": TheTitle
  },
  data() {
    return {
      pageType: "index"
    }
  },
  computed: {
    ...mapState({
      spaceState: state => state.space.spaceState
    })
  },
  mounted() {
    this.checkDarkMode()
    this.checkPageType()
    this.customCursor()
    document
      .querySelectorAll(".cursorInteract")
      .forEach(item => item.addEventListener("mouseover", this.changeCursor))
    document
      .querySelectorAll(".cursorInteract")
      .forEach(item =>
        item.addEventListener("mouseleave", this.removeChangeCursor)
      )
    document.addEventListener("visibilitychange", this.windowIsVisible)
    document.addEventListener("mouseleave", this.mouseLeftDocument)
    document.addEventListener("mouseenter", this.mouseEntersDocument)
  },
  updated() {
    this.removeChangeCursor()
    document
      .querySelectorAll(".cursorInteract")
      .forEach(item => item.addEventListener("mouseover", this.changeCursor))
    document
      .querySelectorAll(".cursorInteract")
      .forEach(item =>
        item.addEventListener("mouseleave", this.removeChangeCursor)
      )
  },
  destroyed() {
    this.removeChangeCursor()
    document
      .querySelectorAll(".cursorInteract")
      .forEach(item => item.removeEventListener("mouseover", this.changeCursor))
    document
      .querySelectorAll(".cursorInteract")
      .forEach(item =>
        item.removeEventListener("mouseleave", this.removeChangeCursor)
      )
    document.removeEventListener("visibilitychange", this.windowIsVisible)
    document.removeEventListener("mouseleave", this.mouseLeftDocument)
    document.removeEventListener("mouseenter", this.mouseEntersDocument)
  },
  watch: {
    $route() {
      this.checkPageType()
    }
  },
  methods: {
    checkDarkMode() {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        document.querySelector("#messages").classList.add("activeOne")
        setTimeout(function() {
          document.querySelector("#messages").classList.remove("activeOne")
        }, 5000)
      }
    },
    customCursor() {
      let cursor = document.querySelector(".cursor")
      function moveCursor(e) {
        gsap.to(cursor, 0, {
          left: e.clientX,
          top: e.clientY
        })
      }
      document.addEventListener("mousemove", moveCursor)
    },
    changeCursor() {
      document.querySelector(".cursor").classList.add("active")
    },
    removeChangeCursor() {
      document.querySelector(".cursor").classList.remove("active")
    },
    checkPageType() {
      if (this.$route.name === "about") {
        this.pageType = "about"
      } else if (
        this.$route.name === "projects-slug" &&
        this.$route.params.slug
      ) {
        this.pageType = "projects"
      } else if (this.$route.name === "index") {
        this.pageType = "index"
      } else {
        this.pageType = "error"
      }
    },
    // BROWSER APIS
    windowIsVisible() {
      if (document.visibilityState === "hidden") {
        document.title = "MISS U"
        document
          .querySelector("link[rel*='icon']")
          .setAttribute("href", "question.png")
      } else {
        document.title = "Dries Bos — Web & Interaction Developer"
        document
          .querySelector("link[rel*='icon']")
          .setAttribute("href", "favicon.png")
      }
    },
    mouseLeftDocument() {
      if (this.spaceState === true) {
        console.log("left!")
        document.querySelector("#floatBlock").classList.add("low")
      }
    },
    mouseEntersDocument() {
      if (this.spaceState === true) {
        console.log("back!")
        document.querySelector("#floatBlock").classList.remove("low")
      }
    }
  }
}
</script>
