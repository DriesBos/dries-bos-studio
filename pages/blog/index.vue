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
	computed: mapState({
		posts: state => state.posts.list
	})
}
</script>
