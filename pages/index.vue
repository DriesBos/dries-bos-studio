<template>
  <div>
    <TheHeader>
      <nuxt-link
        v-if="$route.path === '/'"
        class="header-Link header-Profile site-Icon"
        to="/about"
        tag="div"
        title="about page"
      >
        <img src="~assets/images/profile.png">
      </nuxt-link>
      <div @click="toggle()" class="header-Link header-Toggle site-Icon">
        <img key="list" v-if="isList" src="~assets/images/blocks.png">
        <img key="grid" v-else src="~assets/images/list.png">
      </div>
    </TheHeader>

    <transition-group tag="section" name="indexView" class="view-Container">
      <ul v-show="isList" class="list" key="list">
        <nuxt-link
          v-for="post in posts"
          :id="post.id"
          :key="post.id"
          :to="'/blog/' + post.id"
          tag="li"
        >
          <p>{{ post.year }}</p>
          <p>{{ post.title }}</p>
          <p>{{ post.category }}</p>
        </nuxt-link>
      </ul>

      <ul v-show="!isList" class="index" key="grid">
        <nuxt-link
          v-for="post in posts"
          :id="post.id"
          :key="post.id"
          :to="'/blog/' + post.id"
          tag="li"
        >
          <div class="index-Container">
            <img :src="post.thumbnail">
            <div class="index-Details">
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
              year: bp.content.year,
              category: bp.content.category
            }
          })
        }
      })
  }
}
</script>
