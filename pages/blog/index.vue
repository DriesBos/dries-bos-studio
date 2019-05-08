<template>
  <section class="view-Container view-Blog">
    <ul class="post-List">
      <nuxt-link
        v-for="post in posts"
        :id="post.id"
        :key="post.id"
        :to="'/blog/' + post.id"
        tag="li"
      >
        <img :src="post.thumbnail">
      </nuxt-link>
    </ul>
  </section>
</template>

<script>
export default {
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
              thumbnail: bp.content.thumbnail
            }
          })
        }
      })
  }
}
</script>
