<template>
  <div>
    <TheHeader/>
    <section class="view-Container view-Index">
      <div v-on:click="isList = !isList" class="toggle">
        <p>Blocks</p>
      </div>
      <ul v-if="isList" class="posts">
        <nuxt-link
          v-for="post in posts"
          :id="post.id"
          :key="post.id"
          :to="'/blog/' + post.id"
          tag="li"
        >
          <div class="posts-Container">
            <img :src="post.thumbnail">
            <p>list</p>
            <div class="posts-Details">
              <p>{{ post.title }}</p>
              <p>{{ post.category }}</p>
            </div>
          </div>
        </nuxt-link>
      </ul>
      <ul v-else class="posts">
        <nuxt-link
          v-for="post in posts"
          :id="post.id"
          :key="post.id"
          :to="'/blog/' + post.id"
          tag="li"
        >
          <div class="posts-Container">
            <img :src="post.thumbnail">
            <p>blocks</p>
            <div class="posts-Details">
              <p>{{ post.title }}</p>
              <p>{{ post.category }}</p>
            </div>
          </div>
        </nuxt-link>
      </ul>
    </section>
  </div>
</template>

<script>
import TheHeader from '~/components/TheHeader.vue'

export default {
  components: {
    TheHeader: TheHeader
  },
  data: function() {
    return {
      isList: false
    }
  },
  asyncData(context) {
    return context.app.$storyapi
      .get('cdn/stories', {
        version: process.env.NODE_ENV === 'production' ? 'published' : 'draft',
        starts_with: 'blog/'
      })
      .then(res => {
        return {
          posts: res.data.stories.map(bp => {
            return {
              id: bp.slug,
              thumbnail: bp.content.thumbnail,
              title: bp.content.title,
              category: bp.content.category
            }
          })
        }
      })
  }
}
</script>
