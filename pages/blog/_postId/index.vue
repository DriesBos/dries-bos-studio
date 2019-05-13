<template>
  <div>
    <TheHeader :headerTitle="title" />
    <section class="view-Container view-Post">
      <div class="post">
        <MarkdownItem v-if="content" :input="content" class="post-Content" />
        <p>
          <span v-if="category">Role: {{ role }}</span>
          <br>
          <span v-if="hyperlink" :href="hyperlink">Link: {{ hyperlink }}</span>
        </p>
        <div class="post-Image">
          <img v-if="image_0" :src="image_0">
          <img v-if="image_1" :src="image_1">
          <img v-if="image_2" :src="image_2">
          <img v-if="image_3" :src="image_3">
          <img v-if="image_4" :src="image_4">
          <img v-if="image_5" :src="image_5">
        </div>
        <p>next</p>
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
    TheHeader: TheHeader
  },
  asyncData(context) {
    return context.app.$storyapi
      .get('cdn/stories/blog/' + context.params.postId, {
        version: process.env.NODE_ENV === 'production' ? 'published' : 'draft'
      })
      .then(res => {
        return {
          title: res.data.story.content.title,
          content: res.data.story.content.content,
          thumbnail: res.data.story.content.thumbnail,
          role: res.data.story.content.role,
          category: res.data.story.content.category,
          hyperlink: res.data.story.content.hyperlink,
          image_0: res.data.story.content.image_0,
          image_1: res.data.story.content.image_1,
          image_2: res.data.story.content.image_2,
          image_3: res.data.story.content.image_3,
          image_4: res.data.story.content.image_4,
          image_5: res.data.story.content.image_5
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
