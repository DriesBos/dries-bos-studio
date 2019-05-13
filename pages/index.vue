<template>
  <div>
    <TheHeader/>
    <div @click="toggle()" class="header-Toggle header-Icons">
      <transition-group tag="ul" name="indexView">
        <img key="list" v-if="isList" src="~assets/images/list.png">
        <img key="grid" v-else src="~assets/images/blocks.png">
      </transition-group>
    </div>
    <transition-group tag="section" name="indexView" class="view-Container view-Index">
      <ul v-show="isList" class="list" key="list">
        <nuxt-link
          v-for="post in posts"
          :id="post.id"
          :key="post.id"
          :to="'/blog/' + post.id"
          tag="li"
        >
          <p>{{ post.title }}</p>
          <p>{{ post.category }}</p>
        </nuxt-link>
      </ul>
      <ul v-show="!isList" class="posts" key="grid">
        <nuxt-link
          v-for="post in posts"
          :id="post.id"
          :key="post.id"
          :to="'/blog/' + post.id"
          tag="li"
        >
          <div class="posts-Container">
            <img :src="post.thumbnail">
            <div class="posts-Details">
              <p>{{ post.title }}</p>
              <p>{{ post.category }}</p>
            </div>
          </div>
        </nuxt-link>
      </ul>
    </transition-group>
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
  methods: {
    toggle: function() {
      this.isList = !this.isList
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
