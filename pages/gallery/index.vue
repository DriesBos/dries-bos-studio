<template>
  <div>
    <ul class="gallery-Header">
      <li class="contentListItem-Icon contentListItem-Close" title="close page">
        <nuxt-link
          to="/"
          class="cursorInteract icon icon-Close"
          title="close"
          tag="div"
        >
          <div v-html="require('~/assets/images/icon-close.svg?raw')"></div>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import onPageLoad from "@/mixins/onPageLoad"
import storyblokLivePreview from "@/mixins/storyblokLivePreview"

export default {
  mixins: [storyblokLivePreview, onPageLoad],
  asyncData(context) {
    // prettier-ignore
    let version = context.query._storyblok || context.isDev ? 'draft' : 'published'
    return context.app.$storyapi
      .get("cdn/stories/about", {
        version: version
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
    document.addEventListener("keydown", this.backOnEscape)
  },
  destroyed() {
    document.removeEventListener("keydown", this.backOnEscape)
  },
  methods: {
    backOnEscape(event) {
      if (event.keyCode === 27) {
        this.$router.push({ name: "index" })
      } else if (event.keyCode === 39) {
        if (this.story.content.next_link.cached_url) {
          this.$router.push({
            path: `/${this.story.content.next_link.cached_url}`
          })
        }
      } else if (event.keyCode === 37) {
        if (this.story.content.prev_link.cached_url) {
          this.$router.push({
            path: `/${this.story.content.prev_link.cached_url}`
          })
        }
      }
    }
  },
  head() {
    return {
      title: "Dries Bos — Gallery"
    }
  }
}
</script>

<style lang="sass">
.gallery
  &-Header
    position: fixed
    top: var(--spacing-one)
    right: var(--spacing-one)
</style>
