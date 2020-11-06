<template>
  <div class="view view-Container view-Error">
    <div class="errorItem">
      <p>
        Oops! I couldn't find that page.
        <br />Return
        <nuxt-link class="cursorInteract" tag="a" to="/">home</nuxt-link
        >&nbsp;or view my
        <nuxt-link class="cursorInteract" tag="a" to="/">work</nuxt-link>.
      </p>
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap"
import onPageLoad from "@/mixins/onPageLoad"

export default {
  mixins: [onPageLoad],
  head() {
    return {
      title: "Page Not Found"
    }
  },
  mounted() {
    gsap.to(".errorItem", {
      "--var": "100%",
      duration: 0.66,
      delay: 0.33,
      ease: "ease"
    })
  }
}
</script>

<style lang="sass">
.view-Error
  display: flex
  justify-content: center
  align-items: flex-start
  --var: 0%
  text-align: center
  p
    display: block
  a
    position: relative
    &::before
      content: ''
      position: absolute
      display: inline-block
      left: 0
      top: 0
      bottom: calc(0px - (#{var(--border-width)} / 2))
      width: var(--var)
      border-bottom: var(--border-width) solid var(--color)
    &:hover
      &::before
        @media ( hover: hover )
          animation: hyperHyperLink .66s ease
          animation-iteration-count: 1
</style>
