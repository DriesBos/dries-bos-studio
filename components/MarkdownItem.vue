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
  name: "MarkdownItem",
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
  }
}
</script>

<style lang="sass">
@import '~/assets/styling/variables.sass'

.markdown
  --var: 0%
  min-width: 0 // Ellipsis hack
  p
    margin-bottom: var(--spacing-type-vertical)
    display: block
  p:last-child
    margin-bottom: 0
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
