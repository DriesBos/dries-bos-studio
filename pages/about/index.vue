<template>
  <div>
    <TheHeader />
    <div class="view-Container view-Profile">
      <div class="about">
        <MarkdownItem v-if="content" :input="content" />
        <div class="about-Contact">
          <a href="mailto:info@driesbos.com">
            Email
            <span>↗</span>
          </a>
          <br />
          <a href="https://github.com/DriesBos" target="_blank">
            Github
            <span>↗</span>
          </a>
          <br />
          <a href="https://www.linkedin.com/in/drbos" target="_blank">
            LinkedIn
            <span>↗</span>
          </a>
          <br />
          <a href="https://www.instagram.com/driesbosstudio/" target="_blank">
            Instagram
            <span>↗</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MarkdownItem from '~/components/MarkdownItem.vue'
import TheHeader from '~/components/TheHeader.vue'

export default {
  components: {
    MarkdownItem,
    TheHeader: TheHeader
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
  },
  computed: mapState({
    isLight: state => state.posts.isLight
  })
}
</script>
