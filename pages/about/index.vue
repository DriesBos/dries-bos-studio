<template>
  <div>
    <TheHeader />
    <section class="view-Container view-Profile">
      <div class="about">
        <MarkdownItem v-if="content" :input="content" />
        <div class="about-Contact">
          <a href="mailto:info@driesbos.com">Email ↗</a>
          <br>
          <a href="https://github.com/DriesBos" target="_blank">Github ↗</a>
          <br>
          <a href="https://www.instagram.com/driesbosstudio/" target="_blank">Instagram ↗</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import TheHeader from '~/components/TheHeader.vue'
import MarkdownItem from '~/components/MarkdownItem.vue'

export default {
  components: {
    MarkdownItem,
    TheHeader
  },
  asyncData(context) {
    return context.app.$storyapi
      .get('cdn/stories/about', {
        version: process.env.NODE_ENV === 'production' ? 'published' : 'draft'
      })
      .then(res => {
        return {
          content: res.data.story.content.content
        }
      })
  }
}
</script>
