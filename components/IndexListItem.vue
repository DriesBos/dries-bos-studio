<template>
  <nuxt-link
    :to="`/projects/${post.id}`"
    :key="post.id"
    :id="post.id"
    class="contentListItem-List"
    tag="section"
  >
    <ul class="contentListItem">
      <li class="contentListItem-Column contentListItem-One">
        <p title="project year">{{ post.year || "" }}</p>
      </li>
      <li class="contentListItem-Column contentListItem-Two">
        <p title="project title">{{ post.title || "" }}</p>
      </li>
      <li class="contentListItem-Column contentListItem-Three">
        <p title="project category">{{ post.category || "" }}</p>
      </li>
      <li class="contentListItem-Column contentListItem-Four">
        <ul class="contentListItem-Icons">
          <li class="contentListItem-Icon contentListItem-Arrow">
            <div
              class="icon icon-Arrow"
              v-html="require('~/assets/images/icon-arrow.svg?include')"
              title="go see project"
            ></div>
          </li>
        </ul>
      </li>
    </ul>
    <!-- <div class="contentListItem-Thumbnail">
      <div class="contentListItem-Thumbnail_Wrapper">
        <img :src="post.cover_image" />
      </div>
    </div>-->
  </nuxt-link>
</template>

<script>
import { gsap } from "gsap"

export default {
  name: "IndexListItem",
  props: {
    post: Object
  }
}
</script>
