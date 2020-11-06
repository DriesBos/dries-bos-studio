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
    <div class="cursor cursor-One">
      <div class="cursor-Small" />
    </div>
    <div class="cursor cursor-Two">
      <div class="cursor-Small" />
    </div>
    <div class="typeAnimation">
      <div class="typeAnimation-Content">
        <span class="typeAnimation-Word typeAnimation-One">LET'S</span>
        <span class="typeAnimation-Word typeAnimation-Two">MAKE</span>
        <span class="typeAnimation-Word typeAnimation-Three">IN</span>
        <span class="typeAnimation-Word typeAnimation-Four">TER</span>
        <span class="typeAnimation-Word typeAnimation-Five">NET</span>
      </div>
    </div>
    <div class="laserBlok">
      <div class="laserBlok-Line"></div>
    </div>
  </main>
</template>

<script>
import gsap from "gsap"
import detectIt from "detect-it"
import ogImage from "@/static/og-image.png"

export default {
  data() {
    return {
      floatHeader: false,
      initialLoad: true
    }
  },
  head() {
    return {
      meta: [
        {
          hid: "og:image",
          property: "og:image",
          content: this.BASE_URL + ogImage
        }
      ]
    }
  },
  watch: {
    $route(to, from) {
      this.laserLoad()
    }
  },
  mounted() {
    this.detectTouch()
    this.initLoad()
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
    initLoad() {
      console.log(this.initialLoad)
      if (this.initialLoad === true) {
        this.typeAnimation()
        var el = document.querySelector(".cube-Container")
        gsap.set(el, {
          yPercent: 100
        })
        gsap.to(el, {
          yPercent: 0,
          duration: 4.5,
          delay: 3,
          ease: "expo.out"
        })
        this.initialLoad = false
      }
    },
    typeAnimation() {
      if (this.initialLoad === true) {
        var tl = gsap.timeline({ repeat: 1 })
        tl.to(".typeAnimation-One", {
          opacity: 1,
          duration: 0.66
        })
        tl.to(".typeAnimation-One", {
          opacity: 0,
          duration: 0
        })
        tl.to(".typeAnimation-Two", {
          opacity: 1,
          duration: 0.5
        })
        tl.to(".typeAnimation-Two", {
          opacity: 0,
          duration: 0
        })
        tl.to(".typeAnimation-Three", {
          opacity: 1,
          duration: 0.33
        })
        tl.to(".typeAnimation-Three", {
          opacity: 0,
          ease: "expo.out",
          duration: 0.25
        })
        tl.to(
          ".typeAnimation-Four",
          {
            opacity: 1,
            duration: 0.25
          },
          "-=0.33"
        )
        tl.to(".typeAnimation-Four", {
          opacity: 0,
          ease: "expo.out",
          duration: 0.25
        })
        tl.to(
          ".typeAnimation-Five",
          {
            opacity: 1,
            duration: 0.66
          },
          "-=0.33"
        )
        tl.to(".typeAnimation-Five", {
          opacity: 0,
          duration: 0
        })
        tl.play()
      }
    },

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
