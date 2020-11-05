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
    <div class="laserBlok">
      <div class="laserBlok-Line"></div>
      <!-- <div class="laserBlok-Line"></div>
      <div class="laserBlok-Line"></div> -->
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
    $route(to, from) {
      this.laserLoad()
    }
  },
  mounted() {
    this.detectTouch()
    document.addEventListener("visibilitychange", this.windowIsVisible)
    document.addEventListener("mouseleave", this.mouseLeftDocument)
    document.addEventListener("mouseenter", this.mouseEntersDocument)
  },
  destroyed() {
    document.removeEventListener("visibilitychange", this.windowIsVisible)
    document.removeEventListener("mouseleave", this.mouseLeftDocument)
    document.removeEventListener("mouseenter", this.mouseEntersDocument)
  },
  methods: {
    laserLoad() {
      gsap.set(".laserBlok-Line", {
        width: 0,
        height: 0
      })
      gsap.to(".laserBlok-Line", {
        width: "105vw",
        height: "105vh",
        duration: 0.66,
        ease: "expo.out"
      })
    },
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
      this.laserLoad()
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
