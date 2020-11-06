import { gsap } from "gsap"

export default {
  watch: {
    $route() {
      this.removeChangeCursor()
    }
  },
  mounted() {
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
    loadSections() {
      gsap.to("section", {
        opacity: 1,
        y: 0,
        ease: "power1.inOut",
        duration: 0.33,
        stagger: {
          amount: 0.66
        }
      })
    },
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
