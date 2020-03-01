<template>
  <nuxt-link
    :to="`/projects/${post.id}`"
    :key="post.id"
    :id="post.id"
    class="gridItem gridItem_Project"
    tag="li"
  >
    <p>{{ post.title }}</p>
    <img :src="post.cover_image" />
  </nuxt-link>
</template>

<script>
export default {
  name: "IndexGridItem",
  props: {
    post: Object
  },
  mounted() {
    console.log(this.post)
  }
}
</script>
