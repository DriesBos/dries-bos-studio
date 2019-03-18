<template>
  <section class="view-Container view-Profile">
    <ul class="post-List">
      <li>
        <img :src="thumbnail">
        <h1>{{ title }}</h1>
        <MarkdownItem v-if="content" :input="content" class="post-Content"/>
      </li>
    </ul>
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
          thumbnail: res.data.story.content.thumbnail,
          title: res.data.story.content.title,
          content: res.data.story.content.content
        }
      })
  }
}
</script>
