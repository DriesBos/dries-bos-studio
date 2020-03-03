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
            <img
              :srcset="`${transformImage(image.filename, '1668x0')} 1668w, ${transformImage(image.filename, '1440x0')} 1440w, ${transformImage(image.filename, '1280x0')} 1280w, ${transformImage(image.filename, '960x0')} 960w, ${transformImage(image.filename, '800x0')} 800w, ${transformImage(image.filename, '690x0')} 690w`"
              sizes="100vw"
              :data-src="image.filename"
              :alt="image.name"
            />
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
// STORYBLOK ASYNC CHECKED WITH https://www.storyblok.com/tp/nuxt-js-multilanguage-website-tutorial
import storyblokLivePreview from "@/mixins/storyblokLivePreview"

export default {
  mixins: [storyblokLivePreview],
  scrollToTop: true,
  asyncData(context) {
    let endpoint = `cdn/stories/projects/${context.params.slug}`
    let version =
      context.query._storyblok || context.isDev ? "draft" : "published"

    return context.app.$storyapi
      .get(endpoint, {
        version: version,
        cv: context.store.state.cacheVersion
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
    window.scrollTo(0, 0)
  },
  methods: {
    transformImage(image, option) {
      if (!image) return ""
      if (!option) return ""

      let imageService = "//img2.storyblok.com/"
      let path = image.replace("//a.storyblok.com", "")
      return imageService + option + path
    }
  }
}
</script>
