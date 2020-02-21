<template>
  <li :key="post.id" :id="post.id" class="listItem listItem_Project">
    <div class="listItem-Thumb">
      <img :src="post.cover_image" alt />
    </div>
    <nuxt-link :to="`/projects/${post.id}`" class="listItem-DetailsWrapper" tag="div">
      <div class="listItem-Number listItem-Details ellipsis">
        <p>001</p>
      </div>
      <div v-if="post.title" class="listItem-Title listItem-Details ellipsis">
        <p>{{ post.title }}</p>
      </div>
      <div v-if="post.category" class="listItem-Category listItem-Details ellipsis">
        <p>{{ post.category }}</p>
      </div>
    </nuxt-link>
    <div class="listItem-Icons">
      <div class="icon-Container" title="view project">
        <div class="icon arrow" v-html="require('~/assets/images/icon-arrow.svg?include')"></div>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: "IndexListItem",
  props: {
    post: Object
  },
  mounted() {
    // console.log(this.post)
  }
}
</script>
