<template>
  <div class="view view-Gallery">
    <div
      class="spaceForm"
      v-html="require('~/assets/images/spaceform.svg?raw')"
    />
    <section
      id="gallery"
      class="contentListItem-Gallery"
      style="transform: translate(0px, 0px); opacity: 1;"
    >
      <div class="spaceForm">
        <svg viewBox="0 0 1400 218">
          <path
            d="M140 0L1260 0 1400 218 0 218z"
            transform="translate(-250.000000, -250.000000) translate(250.000000, 250.000000)"
            fill="none"
            fill-rule="evenodd"
            stroke="currentColor"
          ></path>
        </svg>
      </div>
      <ul class="contentListItem">
        <li class="contentListItem-Column gallery">
          <p>Scroll and look afar</p>
        </li>
      </ul>
    </section>
    <TheFooter />
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
