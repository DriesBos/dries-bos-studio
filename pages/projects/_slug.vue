<template>
  <div class="view view-Container">
    <section class="view-Project">
      <div class="projectItem">
        <div class="projectItem-Text">
          <markdown-item :input="story.content.content" />
        </div>
        <nuxt-link
          v-if="story.content.prev_link.id !== ''"
          :to="`/${story.content.prev_link.cached_url}`"
          class="projectItem-Nav projectItem-Nav_Prev"
        >
          <div class="icon arrow" v-html="require('~/assets/images/icon-arrow.svg?include')" />
        </nuxt-link>
        <nuxt-link
          v-if="story.content.next_link.id !== ''"
          :to="`/${story.content.next_link.cached_url}`"
          class="projectItem-Nav projectItem-Nav_Next"
        >
          <div class="icon arrow" v-html="require('~/assets/images/icon-arrow.svg?include')" />
        </nuxt-link>
        <ul class="projectItem-Images">
          <li v-for="(image, index) in story.content.images" :key="index">
            <img :src="image.filename" :alt="image.name" />
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import storyblokLivePreview from "@/mixins/storyblokLivePreview"

export default {
  mixins: [storyblokLivePreview],
  scrollToTop: true,
  asyncData(context) {
    let endpoint = `cdn/stories/projects/${context.params.slug}`
    return context.app.$storyapi
      .get(endpoint, {
        version: "published"
      })
      .then(res => {
        return res.data
      })
      .catch(res => {
        if (!res.response) {
          console.error(res)
          context.error({
            statusCode: 404,
            message: "Failed to receive content form api"
          })
        } else {
          console.error(res.response.data)
          context.error({
            statusCode: res.response.status,
            message: res.response.data
          })
        }
      })
  },
  data() {
    return {
      story: { content: {} }
    }
  },
  mounted() {
    // console.log("STORY", this.story, "POST", this.post)
  }
}
</script>
