<template>
  <section class="view-Container view-Index">
    <ul class="post-List">
      <PostPreview
        v-for="post in posts"
        :id="post.id"
        :key="post.id"
        :title="post.title"
        :excerpt="post.excerpt"
        :thumbnail="post.thumbnail"
      />
    </ul>
  </section>
</template>

<script>
import PostPreview from '~/components/PostPreview.vue'

export default {
  components: {
    PostPreview: PostPreview
  },
  asyncData(context) {
    return context.app.$storyapi
      .get('cdn/stories', {
        version: process.env.NODE_ENV === 'production' ? 'published' : 'draft',
        starts_with: 'blog/'
      })
      .then(res => {
        console.log(res)
        return {
          posts: res.data.stories.map(bp => {
            return {
              id: bp.slug,
              title: bp.content.title,
              excerpt: bp.content.excerpt,
              content: bp.content.content,
              thumbnail: bp.content.thumbnail
            }
          })
        }
      })
  }
}
</script>
