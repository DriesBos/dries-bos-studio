<template>
  <li :key="post.id" :id="post.id" class="listItem listItem_Project">
    <nuxt-link :to="`/projects/${post.id}`" class="listItem-DetailsWrapper" tag="div">
      <div class="listItem-Year listItem-Details ellipsis">
        <p title="project year">{{ post.year || ""}}</p>
      </div>
      <div v-if="post.title" class="listItem-Title listItem-Details ellipsis">
        <p title="project title">{{ post.title || "" }}</p>
      </div>
      <div v-if="post.category" class="listItem-Category listItem-Details ellipsis">
        <p title="project category">{{ post.category || "" }}</p>
      </div>
      <div class="listItem-Icons">
        <div class="icon-Container" title="view project">
          <div
            class="icon arrow"
            v-html="require('~/assets/images/icon-arrow.svg?include')"
            title="go to project"
          ></div>
        </div>
      </div>
    </nuxt-link>
    <div class="listItem-Thumb">
      <div class="listItem-Thumb_Container">
        <img :src="post.cover_image" />
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
    console.log(this.post)
  }
}
</script>
