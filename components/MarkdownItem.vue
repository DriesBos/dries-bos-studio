<template>
  <div class="markdown" v-html="compiledMarkdown"></div>
</template>

<script>
// https://vuejs.org/v2/examples/index.html
// install 'Marked' as dependency: npm install marked
const marked = require('marked')
const renderer = new marked.Renderer()
// renderer.link = (href, title, text) =>
//   `<a target="_blank" href="${href}" title="${title}">${text}</a>`
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
      return marked(this.input, { sanitize: true })
    }
  }
}
</script>

<style lang="sass">
@import '~/assets/styling/variables.sass'

.markdown
  min-width: 0 // Ellipsis hack
  p
    margin-bottom: $lineheight-base
    display: block
  p:last-child
    margin-bottom: 0
  a
    text-decoration: underline
</style>
