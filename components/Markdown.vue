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

renderer.link = function(href, title, text) {
  return (
    '<a target="_blank" href="' +
    href +
    '" title="' +
    title +
    '">' +
    text +
    "</a>"
  )
}

export default {
  props: {
    input: {
      type: String,
      required: true
    }
  },
  computed: {
    compiledMarkdown: function() {
      return marked(this.input, { renderer: renderer })
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
    &::before
      content: ''
      position: absolute
      left: 0
      display: inline-block
      bottom: 0
      top: 0
      width: var(--var)
      z-index: 0
      border-bottom: 1px solid var(--type-color)
    &:hover
      &::before
        @media ( hover: hover )
          animation: hyperHyperLink .66s ease
          animation-iteration-count: 1
</style>
