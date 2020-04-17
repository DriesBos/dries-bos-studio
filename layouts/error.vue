<template>
  <div class="view view-Container view-Error">
    <div class="errorItem">
      <p>
        Oops! We couldn't find that page.
        <br />Return
        <nuxt-link class="hovered" to="/">home</nuxt-link>&nbsp;or view our
        <nuxt-link class="hovered" to="/work">work</nuxt-link>.
      </p>
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap"
import JQuery from "jquery"
let $ = JQuery

export default {
  mounted() {
    gsap.to(".errorItem", {
      "--var": "100%",
      duration: 0.66,
      delay: 0.33,
      ease: "ease"
    })
    $(".hovered").on("mouseover", this.changeCursor)
    $(".hovered").on("mouseleave", this.removeChangeCursor)
  },
  destroyed() {
    $(".hovered").off("mouseover", this.changeCursor)
    $(".hovered").off("mouseleave", this.removeChangeCursor)
  },
  methods: {
    changeCursor() {
      let $cursor = $(".cursor")
      $cursor.addClass("interact")
    },
    removeChangeCursor() {
      let $cursor = $(".cursor")
      $cursor.removeClass("interact")
    }
  }
}
</script>

<style lang="sass">
.view-Error
  .errorItem
    --var: "0%"
    text-align: center
    a
      position: relative
      &:after
        content: ''
        position: absolute
        left: 0
        display: inline-blick
        bottom: 0
        width: var(--var)
        border-bottom: 1px solid var(--support-color)
      &:hover
        &:after
          @media ( hover: hover )
            animation: hyperHyperLink .66s ease
            animation-iteration-count: 1
</style>