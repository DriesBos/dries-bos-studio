<template>
  <section class="view-Container view-Post">
    <div class="post">
      <!-- <h1>{{ title }}</h1> -->
      <MarkdownItem v-if="content" :input="content" class="post-Content"/>
      <p v-if="category">Role: {{ category }}</p>
      <p>
        Link:
        <a v-if="hyperlink" :href="hyperlink">{{ hyperlink }}</a>
      </p>
      <img :src="thumbnail">
      <p>next</p>
    </div>
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
      .get('cdn/stories/blog/' + context.params.postId, {
        version: process.env.NODE_ENV === 'production' ? 'published' : 'draft'
      })
      .then(res => {
        return {
          // title: res.data.story.content.title,
          content: res.data.story.content.content,
          thumbnail: res.data.story.content.thumbnail,
          category: res.data.story.content.category,
          hyperlink: res.data.story.content.hyperlink
        }
      })
  }
}
</script>

<style lang="sass" scoped>
.view-Project
  margin-top: 100px
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
.project-List
  display: flex
  flex-direction: column
  width: 500px
  li
    background: lightblue
    margin-bottom: 100px
  img
    width: 100%
    height: auto
</style>
