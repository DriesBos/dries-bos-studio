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
    this.customCursor()
    this.laserLoad()
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
    // ON PAGE LOAD
    laserLoad() {
      gsap.set(".laserBlok-Line", {
        width: 0,
        height: 0,
        opacity: 0
      })
      if (this.initState) {
        gsap.to(".laserBlok-Line", {
          opacity: 1,
          duration: 0,
          delay: 4.5,
          ease: "none"
        })
        gsap.to(".laserBlok-Line", {
          width: "105vw",
          height: "105vh",
          duration: 0.66,
          delay: 4.5,
          ease: "expo.out"
        })
      } else {
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
      }
    },
    // INITIAL LANDING
    loadSections() {
      if (this.initState) {
        this.$store.commit("init/toggleTheInit")
        this.typeAnimation()
        gsap.to("section", {
          opacity: 1,
          y: 0,
          ease: "power1.inOut",
          duration: 0.33,
          delay: 4.5,
          stagger: {
            amount: 0.66
          }
        })
      } else {
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
    },
    // CURSOR
    customCursor() {
      let cursorOne = document.querySelector(".cursor-One")
      let cursorTwo = document.querySelector(".cursor-Two")
      let cursorThree = document.querySelector(".cursor-Three")
      function moveCursorOne(e) {
        gsap.to(cursorOne, 0, {
          opacity: 1,
          left: e.clientX,
          top: e.clientY
        })
      }
      function moveCursorTwo(e) {
        gsap.to(cursorTwo, 0, {
          opacity: 1,
          delay: 0.25,
          left: e.clientX,
          top: e.clientY
        })
      }
      function moveCursorThree(e) {
        gsap.to(cursorThree, 0, {
          opacity: 1,
          left: e.clientX,
          top: e.clientY
        })
      }
      document.addEventListener("mousemove", moveCursorOne)
      document.addEventListener("mousemove", moveCursorTwo)
      document.addEventListener("mousemove", moveCursorThree)
    },
    changeCursor() {
      document.querySelector(".cursor").classList.add("active")
    },
    removeChangeCursor() {
      document.querySelector(".cursor").classList.remove("active")
    }
  }
}
