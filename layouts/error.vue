<template>
  <div class="view view-Container view-Error">
    <div class="errorItem">
      <p>
        Oops! We couldn't find that page.
        <br />Return
        <nuxt-link class="cursorInteract" tag="a" to="/">home</nuxt-link>&nbsp;or view our
        <nuxt-link class="cursorInteract" tag="a" to="/">work</nuxt-link>.
      </p>
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap"

export default {
  mounted() {
    gsap.to(".errorItem", {
      "--var": "100%",
      duration: 0.66,
      delay: 0.33,
      ease: "ease"
    })
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
    changeCursor() {
      document.querySelector(".cursor").classList.add("active")
    },
    removeChangeCursor() {
      document.querySelector(".cursor").classList.remove("active")
    }
  },
  head() {
    return {
      title: "Page Not Found"
    }
  }
}
</script>

<style lang="sass">
.view-Error
  min-height: 100vh !important
  display: flex
  justify-content: center
  align-items: center
  --var: 0%
  text-align: center
  p
    display: block
  a
    position: relative
    &::before
      content: ''
      position: absolute
      left: 0
      display: inline-block
      top: 0
      bottom: 0
      width: var(--var)
      border-bottom: 1px solid var(--type-color)
    &:hover
      &::before
        @media ( hover: hover )
          animation: hyperHyperLink .66s ease
          animation-iteration-count: 1
</style>