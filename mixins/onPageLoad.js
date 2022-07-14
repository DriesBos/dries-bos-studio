import { gsap } from "gsap"
import { mapState } from "vuex"

export default {
  fetch({ store }) {
    store.commit("toggleTheInit")
  },
  computed: {
    ...mapState({
      initState: state => state.init.initState
    })
  },
  watch: {
    $route() {
      this.removeChangeCursor()
    }
  },
  mounted() {
    // this.checkDevEnv() // Turn animation of when developing
    // this.scrollToTop()
    this.customCursor()
    this.loadSections()
    document
      .querySelectorAll(".cursorInteract")
      .forEach(item => item.addEventListener("mouseover", this.changeCursor))
    document
      .querySelectorAll(".cursorInteract")
      .forEach(item =>
        item.addEventListener("mouseleave", this.removeChangeCursor)
      )
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
  },
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0 })
    },
    // IF DEVELOPMENT ENV
    checkDevEnv() {
      if (process.env.NODE_ENV === "development") {
        this.$store.commit("init/falseTheInit")
      }
    },
    // ON PAGE LOAD
    loadSections() {
      gsap.set(".laserBlok-Line", {
        width: 0,
        height: 0,
        opacity: 0
      })
      if (this.initState) {
        this.$store.commit("init/toggleTheInit")
        // TYPE ANIMATION
        this.typeAnimation()
        // LASER ANIMATION
        gsap.to(".buttonContainer-Button", {
          opacity: 1,
          y: 0,
          delay: 3,
          ease: "power1.inOut",
          duration: 0.33,
          stagger: {
            amount: 0.66
          }
        })
        gsap.to(".laserBlok-Line", {
          opacity: 1,
          duration: 0,
          delay: 2.5,
          ease: "none"
        })
        gsap.to(".laserBlok-Line", {
          width: "105vw",
          height: "105vh",
          duration: 0.66,
          delay: 2.5,
          ease: "expo.out"
        })
        // SECTIONS LOAD ANIMATION
        gsap.to("section", {
          opacity: 1,
          y: 0,
          ease: "power1.inOut",
          duration: 0.33,
          delay: 2.5,
          stagger: {
            amount: 0.66
          }
        })
      } else {
        // LASER ANIMATION
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
        // SECTIONS LOAD ANIMATION
        gsap.to("section", {
          opacity: 1,
          y: 0,
          ease: "power1.inOut",
          duration: 0.33,
          stagger: {
            amount: 0.66
          }
        })
      }
    },
    typeAnimation() {
      var tl = gsap.timeline({
        repeat: 0,
        onStart: this.animationStarted,
        onComplete: this.animationEnded
      })
      tl.to(".typeAnimation-One", {
        opacity: 1,
        duration: 0.66,
        delay: 0.25
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
    },
    animationStarted() {
      document.documentElement.style.overflow = "hidden" // Prevent scrolling
      document.body.style.pointerEvents = "none" // Reinstate cursor interaction
    },
    animationEnded() {
      document.documentElement.style.overflow = "auto" // Reinstate scrolling
      document.body.style.pointerEvents = "auto" // Reinstate cursor interaction
    },
    // CURSOR
    customCursor() {
      let cursorOne = document.querySelector(".cursor-One")
      let cursorTwo = document.querySelector(".cursor-Two")
      function moveCursorOne(e) {
        gsap.to(cursorOne, 0.165, {
          opacity: 1,
          left: e.clientX,
          top: e.clientY,
          ease: "ease"
        })
      }
      function moveCursorTwo(e) {
        gsap.to(cursorTwo, 0.165, {
          opacity: 1,
          left: e.clientX,
          top: e.clientY,
          ease: "ease",
          delay: 0.165
        })
      }
      document.addEventListener("mousemove", moveCursorOne)
      document.addEventListener("mousemove", moveCursorTwo)
    },
    changeCursor() {
      document.querySelector(".cursor").classList.add("active")
    },
    removeChangeCursor() {
      document.querySelector(".cursor").classList.remove("active")
    }
  }
}
