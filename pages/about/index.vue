<template>
  <section class="view-Container view-Profile">
    <h1>{{ title }}</h1>
    <MarkdownItem v-if="content" :input="content" class="post-Content"/>
  </section>
</template>

<script>
import MarkdownItem from '~/components/MarkdownItem.vue'

export default {
  components: {
    MarkdownItem
  },
  asyncData(context) {
    return context.app.$storyapi
      .get('cdn/stories/about', {
        version: process.env.NODE_ENV === 'production' ? 'published' : 'draft'
      })
      .then(res => {
        return {
          title: res.data.story.content.title,
          content: res.data.story.content.content
        }
      })
  }
}
</script>
