import { gsap } from "gsap"
import { mapState } from "vuex"

export default {
  fetch({ store }) {
    store.commit("init/toggleTheInit")
  },
  computed: {
    ...mapState({
      initState: state => state.init.initState
    })
  },
  watch: {
    $route() {
      this.removeChangeCursorOne()
      this.removeChangeCursorTwo()
    }
  },
  mounted() {
    this.customCursorOne()
    this.loadSections()
    document
      .querySelectorAll(".cursorInteract")
      .forEach(item => item.addEventListener("mouseover", this.changeCursorOne))
    document
      .querySelectorAll(".cursorInteract")
      .forEach(item =>
        item.addEventListener("mouseleave", this.removeChangeCursorOne)
      )
    this.customCursorTwo()
    document
      .querySelectorAll(".hoverUp")
      .forEach(item => item.addEventListener("mouseover", this.changeCursorTwo))
    document
      .querySelectorAll(".hoverUp")
      .forEach(item =>
        item.addEventListener("mouseleave", this.removeChangeCursorTwo)
      )
  },
  updated() {
    this.removeChangeCursorOne()
    document
      .querySelectorAll(".cursorInteract")
      .forEach(item => item.addEventListener("mouseover", this.changeCursorOne))
    document
      .querySelectorAll(".cursorInteract")
      .forEach(item =>
        item.addEventListener("mouseleave", this.removeChangeCursorOne)
      )
    this.removeChangeCursorTwo()
    document
      .querySelectorAll(".hoverUp")
      .forEach(item => item.addEventListener("mouseover", this.changeCursorTwo))
    document
      .querySelectorAll(".hoverUp")
      .forEach(item =>
        item.addEventListener("mouseleave", this.removeChangeCursorTwo)
      )
  },
  destroyed() {
    this.removeChangeCursorOne()
    document
      .querySelectorAll(".cursorInteract")
      .forEach(item =>
        item.removeEventListener("mouseover", this.changeCursorOne)
      )
    document
      .querySelectorAll(".cursorInteract")
      .forEach(item =>
        item.removeEventListener("mouseleave", this.removeChangeCursorOne)
      )
    this.removeChangeCursorTwo()
    document
      .querySelectorAll(".hoverUp")
      .forEach(item =>
        item.removeEventListener("mouseover", this.changeCursorTwo)
      )
    document
      .querySelectorAll(".hoverUp")
      .forEach(item =>
        item.removeEventListener("mouseleave", this.removeChangeCursorTwo)
      )
  },
  methods: {
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
        // this.typeAnimation()
        // LASER ANIMATION
        // gsap.to(".buttonContainer-Button", {
        //   opacity: 1,
        //   y: 0,
        //   delay: 3,
        //   ease: "power1.inOut",
        //   duration: 0.33,
        //   stagger: {
        //     amount: 0.66
        //   }
        // })
        gsap.to(".laserBlok-Line", {
          opacity: 1,
          duration: 0,
          // delay: 2.5,
          ease: "none"
        })
        gsap.to(".laserBlok-Line", {
          width: "105vw",
          height: "105vh",
          duration: 0.66,
          // delay: 2.5,
          ease: "expo.out"
        })
        // SECTIONS LOAD ANIMATION
        gsap.to("section", {
          opacity: 1,
          y: 0,
          ease: "power1.inOut",
          duration: 0.33,
          // delay: 2.5,
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
    // typeAnimation() {
    //   var tl = gsap.timeline({
    //     repeat: 0,
    //     onStart: this.addDisabled,
    //     onComplete: this.removeDisabled
    //   })
    //   tl.to(".typeAnimation-One", {
    //     opacity: 1,
    //     duration: 0.66,
    //     delay: 0.25
    //   })
    //   tl.to(".typeAnimation-One", {
    //     opacity: 0,
    //     duration: 0
    //   })
    //   tl.to(".typeAnimation-Two", {
    //     opacity: 1,
    //     duration: 0.5
    //   })
    //   tl.to(".typeAnimation-Two", {
    //     opacity: 0,
    //     duration: 0
    //   })
    //   tl.to(".typeAnimation-Three", {
    //     opacity: 1,
    //     duration: 0.33
    //   })
    //   tl.to(".typeAnimation-Three", {
    //     opacity: 0,
    //     ease: "expo.out",
    //     duration: 0.25
    //   })
    //   tl.to(
    //     ".typeAnimation-Four",
    //     {
    //       opacity: 1,
    //       duration: 0.25
    //     },
    //     "-=0.33"
    //   )
    //   tl.to(".typeAnimation-Four", {
    //     opacity: 0,
    //     ease: "expo.out",
    //     duration: 0.25
    //   })
    //   tl.to(
    //     ".typeAnimation-Five",
    //     {
    //       opacity: 1,
    //       duration: 0.66
    //     },
    //     "-=0.33"
    //   )
    //   tl.to(".typeAnimation-Five", {
    //     opacity: 0,
    //     duration: 0
    //   })
    //   tl.play()
    // },
    addDisabled() {
      // var array = document.querySelectorAll(".contentListItem-CoverImage")
      // array.forEach(el => {
      //   el.classList.add("disabled")
      // })
      var nav = document.querySelector(".contentListItem-Nav")
      nav.classList.add("disabled")
    },
    removeDisabled() {
      // var array = document.querySelectorAll(".contentListItem-CoverImage")
      // array.forEach(el => {
      //   el.classList.remove("disabled")
      // })
      var nav = document.querySelector(".contentListItem-Nav")
      nav.classList.remove("disabled")
    },
    // CURSOR
    customCursorOne() {
      let cursorOne = document.querySelector(".cursor-One")
      function moveCursorOne(e) {
        gsap.to(cursorOne, 0, {
          opacity: 1,
          left: e.clientX,
          top: e.clientY,
          ease: "ease"
        })
      }
      document.addEventListener("mousemove", moveCursorOne)
    },
    customCursorTwo() {
      let cursorTwo = document.querySelector(".cursor-Two")
      function moveCursorTwo(e) {
        gsap.to(cursorTwo, 0.33, {
          left: e.clientX,
          top: e.clientY,
          ease: "ease",
          delay: 0.1
        })
      }
      document.addEventListener("mousemove", moveCursorTwo)
    },
    changeCursorOne() {
      document.querySelector(".cursor-One").classList.add("active")
    },
    removeChangeCursorOne() {
      document.querySelector(".cursor-One").classList.remove("active")
    },
    changeCursorTwo() {
      document.querySelector(".cursor-Two").classList.add("active")
    },
    removeChangeCursorTwo() {
      document.querySelector(".cursor-Two").classList.remove("active")
    }
  }
}
