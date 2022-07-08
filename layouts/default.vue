<template>
  <main id="top" class="spaced">
    <!-- <LazyTheNotifications /> -->
    <LazyTheLanding v-if="isIndex" />
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
        <span class="typeAnimation-InternetWrap">
          <span class="typeAnimation-Word typeAnimation-Three">IN</span>
          <span class="typeAnimation-Word typeAnimation-Four">TER</span>
          <span class="typeAnimation-Word typeAnimation-Five">NET</span>
        </span>
      </div>
    </div>
    <div class="laserBlok">
      <div class="laserBlok-Line"></div>
      <div class="laserBlok-Lines"></div>
      <div class="laserBlok-Lines"></div>
      <div class="laserBlok-Lines"></div>
      <div class="laserBlok-Lines"></div>
      <div class="laserBlok-Lines"></div>
      <div class="laserBlok-Lines"></div>
      <div class="laserBlok-Lines"></div>
      <div class="laserBlok-Lines"></div>
      <div class="laserBlok-Lines"></div>
      <div class="laserBlok-Lines"></div>
    </div>
    <div class="btnContainer">
      <Button>
        <a
          href="mailto:info@driesbos.com?subject=Let's Make Internet"
          target="_blank"
          >Lets make internet</a
        ></Button
      >
      <Button>
        <p>Up</p>
      </Button>
    </div>
    <!-- <div class="buttonContainer">
      <div class="buttonContainer-Button collaborate cursorInteract">
        <a
          href="mailto:info@driesbos.com?subject=Let's Make Internet"
          target="_blank"
          >lets make internet</a
        >
      </div>
      <div
        class="buttonContainer-Button cursorInteract"
        :class="{ active: warpMode }"
        @click="warpSpeed"
      >
        <p>Hypermode</p>
      </div>
    </div> -->
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
      warpMode: false,
      timeLine: gsap.timeline({
        paused: true,
        repeat: -1,
        onComplete: this.warpOnComplete
      })
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
  mounted() {
    console.log("ROUTE", this.$route)
    this.detectTouch()
    this.warpSpeedInit()
    document.addEventListener("visibilitychange", this.windowIsVisible)
    document.addEventListener("mouseleave", this.mouseLeftDocument)
    document.addEventListener("mouseenter", this.mouseEntersDocument)
  },
  destroyed() {
    document.removeEventListener("visibilitychange", this.windowIsVisible)
    document.removeEventListener("mouseleave", this.mouseLeftDocument)
    document.removeEventListener("mouseenter", this.mouseEntersDocument)
  },
  computed: {
    isIndex() {
      return this.$route.name === "index"
    }
  },
  methods: {
    // INIT
    generalInit() {
      setTimeout(() => {
        var array = document.querySelectorAll(".contentListItem-CoverImage")
        array.forEach(el => {
          el.classList.add("initialised")
        })
      }, 3000)
    },
    // WARPSPEED
    warpSpeedInit() {
      this.timeLine
        .to(".laserBlok-Lines", {
          opacity: 1,
          duration: 0
        })
        .to(".laserBlok-Lines", {
          width: "105vw",
          height: "105vh",
          ease: "none",
          stagger: {
            amount: 4.5
          }
        })
    },
    warpSpeed() {
      this.warpMode = !this.warpMode
      if (this.warpMode) {
        this.timeLine.play()
        gsap.set(".laserBlok-Lines", {
          opacity: 1
        })
      } else {
        this.timeLine.pause()
        gsap.set(".laserBlok-Lines", {
          opacity: 0
        })
      }
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
      setTimeout(function() {
        gsap.set(".laserBlok-Line", {
          width: 0,
          height: 0,
          opacity: 0
        })
        gsap.to(".laserBlok-Line", {
          opacity: 1,
          duration: 0,
          ease: "none"
        })
        gsap.to(".laserBlok-Line", {
          width: "105vw",
          height: "105vh",
          duration: 0.66,
          ease: "expo.out"
        })
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
        document.title = "Dries Bos — Interface Developer"
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
