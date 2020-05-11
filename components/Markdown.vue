<template>
  <div class="markdown" v-html="compiledMarkdown"></div>
</template>

<script>
import { gsap } from "gsap"
// https://vuejs.org/v2/examples/index.html
// install 'Marked' as dependency: npm install marked
const marked = require("marked")
const renderer = new marked.Renderer()

marked.setOptions({
  renderer: new marked.Renderer(),
  breaks: true
})

export default {
  props: {
    input: {
      type: String,
      required: true
    }
  },
  computed: {
    compiledMarkdown: function() {
      return marked(this.input)
    }
  },
  mounted() {
    gsap.to(".markdown", {
      "--var": "100%",
      duration: 0.66,
      delay: 0.33,
      ease: "ease"
    })
    document
      .querySelectorAll("a")
      .forEach(item => item.addEventListener("mouseover", this.changeCursor))
    document
      .querySelectorAll("a")
      .forEach(item =>
        item.addEventListener("mouseleave", this.removeChangeCursor)
      )
  },
  destroyed() {
    document
      .querySelectorAll("a")
      .forEach(item => item.removeEventListener("mouseover", this.changeCursor))
    document
      .querySelectorAll("a")
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
  }
}
</script>

<style lang="sass">
@import '~/assets/styling/variables.sass'

.markdown
  --var: 0%
  min-width: 0 // Ellipsis hack
  text-align: justify
  p
    display: block
  a
    position: relative
    // background: green
    &:before
      content: ''
      position: absolute
      left: 0
      display: inline-blick
      bottom: 0
      top: 0
      width: var(--var)
      z-index: 0
      border-bottom: 1px solid var(--type-color)
    &:hover
      // text-decoration: underline
      &:before
        @media ( hover: hover )
          animation: hyperHyperLink .66s ease
          animation-iteration-count: 1
</style>
