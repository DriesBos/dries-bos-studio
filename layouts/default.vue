<template>
  <main id="top" class="spaced">
    <LazyTheNotifications />
    <div class="cube-Container">
      <LazyTheNavigation :class="pageType" />
      <transition name="page" mode="out-in">
        <nuxt />
      </transition>
    </div>
    <div class="cursor">
      <div class="cursor-Small" />
    </div>
  </main>
</template>

<script>
import gsap from "gsap"

export default {
  data() {
    return {
      pageType: "index"
    }
  },
  watch: {
    $route() {
      this.init()
      this.checkPageType()
      this.removeChangeCursor()
    }
  },
  mounted() {
    this.init()
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
  methods: {
    init() {
      setTimeout(function() {
        document.querySelector("#floatBlock").classList.remove("low")
      }, 1000)
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
      document.querySelector("#floatBlock").classList.add("low")
    },
    mouseEntersDocument() {
      document.querySelector("#floatBlock").classList.remove("low")
    }
  }
}
</script>
