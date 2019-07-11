<template>
  <div class="markdown" v-html="compiledMarkdown"></div>
</template>

<script>
// https://vuejs.org/v2/examples/index.html
// install 'Marked' as dependency: npm install marked
const marked = require('marked')
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
</style>
