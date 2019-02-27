<template>
  <section class="view-Container">
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
    return context.app.$storyapi.get('cdn/stories/blog', {
      version: 'draft'
    }).then( res => {
      return res
    })
  }
  // data() {
  //   return {
  //     posts: [
  //       {
  //         title: 'title One',
  //         excerpt: 'excerpt',
  //         thumbnail: '~/assets/images/image1.jpg',
  //         id: 'id-1'
  //       },
  //       {
  //         title: 'title Two',
  //         excerpt: 'excerpt',
  //         thumbnail: '~/assets/images/image2.jpg',
  //         id: 'id-2'
  //       }
  //     ]
  //   }
  // }
}
</script>

<style lang="sass" scoped>
</style>
