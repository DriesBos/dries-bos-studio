<template>
  <main id="top" class="spaced">
    <LazyTheNotifications />
    <div class="cube-Container" @mouseenter="toggleFloatHeaderTrue">
      <LazyTheNavigation
        :class="{ active: floatHeader }"
        @toggle-view="viewIsToggled"
      />
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
import detectIt from "detect-it"

export default {
  data() {
    return {
      floatHeader: false
    }
  },
  watch: {
    $route() {
      this.removeChangeCursor()
    }
  },
  mounted() {
    this.customCursor()
    this.detectTouch()
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
    detectTouch() {
      if (detectIt.deviceType === "touchOnly") {
        setTimeout(function() {
          this.floatHeader = true
          gsap.to("#floatBlock", {
            yPercent: -100,
            ease: "power1.inOut",
            duration: 0.33
          })
        }, 666)
      }
    },
    toggleFloatHeaderTrue() {
      this.floatHeader = true
      this.toggleFloatHeader()
    },
    toggleFloatHeader() {
      if (this.floatHeader) {
        gsap.to("#floatBlock", {
          yPercent: -100,
          ease: "power1.inOut",
          duration: 0.33
        })
      } else {
        gsap.to("#floatBlock", {
          yPercent: 0,
          ease: "power1.inOut",
          duration: 0.33
        })
      }
    },
    viewIsToggled() {
      setTimeout(function() {
        gsap.to("section", {
          opacity: 1,
          y: 0,
          ease: "power1.inOut",
          duration: 0.33,
          stagger: {
            amount: 0.66
          }
        })
      }, 50)
    },
    customCursor() {
      let cursor = document.querySelector(".cursor")
      function moveCursor(e) {
        gsap.to(cursor, 0, {
          opacity: 1,
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
    // BROWSER APIS
    windowIsVisible() {
      if (document.visibilityState === "hidden") {
        this.floatHeader = false
        this.toggleFloatHeader()
        document.title = "MISS U"
        document
          .querySelector("link[rel*='icon']")
          .setAttribute("href", "question.png")
      } else {
        this.floatHeader = true
        this.toggleFloatHeader()
        document.title = "Dries Bos — Creative Web Developer"
        document
          .querySelector("link[rel*='icon']")
          .setAttribute("href", "favicon.png")
      }
    },
    mouseLeftDocument() {
      this.floatHeader = false
      this.toggleFloatHeader()
    },
    mouseEntersDocument() {
      this.floatHeader = true
      this.toggleFloatHeader()
    }
  }
}
</script>
