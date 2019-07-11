<template>
  <div>
    <TheHeader />
    <transition-group tag="section" name="indexView" class="view-Container">
      <ul v-show="isList" class="list" key="list">
        <li v-for="post in posts" :key="post.id">
          <nuxt-link :id="post.id" :key="post.id" :to="'/blog/' + post.id" tag="a" class="ellipsis">
            <p class="list-Year">{{ post.year }}</p>
            <p class="list-Title">{{ post.title }}</p>
            <p class="list-Category">{{ post.category }}</p>
          </nuxt-link>
        </li>
      </ul>
      <ul v-show="!isList" class="index" key="grid">
        <li v-for="post in posts" :key="post.id">
          <nuxt-link :id="post.id" :key="post.id" :to="'/blog/' + post.id" tag="a">
            <div class="index-Container" v-lazy-container="{ selector: 'img' }">
              <img :data-src="post.thumbnail" />
              <div class="index-Details ellipsis">
                <p>{{ post.title }}</p>
                <p>{{ post.category }}</p>
              </div>
            </div>
          </nuxt-link>
        </li>
      </ul>
    </transition-group>
  </div>
</template>


<script>
import { mapState } from 'vuex'
export default {
  computed: mapState({
    posts: state => state.posts.list,
    isList: state => state.posts.isList
  })
}
</script>

<script>
import TheHeader from '~/components/TheHeader.vue'
import { mapState } from 'vuex'

export default {
  components: {
    TheHeader: TheHeader
  },
  computed: mapState({
    posts: state => state.posts.list,
    isList: state => state.posts.isList
  })
}
</script>
