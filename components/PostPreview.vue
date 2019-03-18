<template>
  <nuxt-link :to="'/blog/' + id" tag="li">
    <img :src="thumbnail">
    <h1>{{ title }}</h1>
    <MarkdownItem v-if="excerpt" :input="excerpt" class="post-Content"/>
  </nuxt-link>
</template>

<script>
import MarkdownItem from '~/components/MarkdownItem.vue'

export default {
  components: {
    MarkdownItem
  },
  props: {
    title: {
      type: String,
      required: true
    },
    excerpt: {
      type: String,
      required: true
    },
    thumbnail: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  }
}
</script>
