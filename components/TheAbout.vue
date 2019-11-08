<template>
  <section class="view-Profile">
    <div class="about">
      <MarkdownItem v-if="content" :input="content" />
    </div>
    <div class="helper">
      <p>scroll down</p>
    </div>
  </section>
</template>

<script>
import MarkdownItem from '~/components/MarkdownItem.vue'

export default {
  name: 'TheAbout',
  components: {
    MarkdownItem
  },
  props: {
    content: String
  }
}
</script>