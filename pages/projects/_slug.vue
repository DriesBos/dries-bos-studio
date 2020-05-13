<template>
  <div class="view view-Project">
    <div class="spaceForm" v-html="require('~/assets/images/spaceform.svg?include')" />
    <component
      :is="blok.component | dashify"
      v-for="blok in story.content.body"
      :key="blok._uid"
      :blok="blok"
    ></component>

    <section class="imageGrid">
      <div class="contentListItem-Nav">
        <nuxt-link
          :to="`/${story.content.prev_link.cached_url}`"
          class="contentListItem-Nav_Prev"
          title="previous project"
          tag="div"
        >
          <div
            v-if="story.content.prev_link.id !== ''"
            class="cursorInteract icon-Arrow"
            v-html="require('~/assets/images/icon-arrow-long.svg?include')"
          />
        </nuxt-link>
        <nuxt-link
          :to="`/${story.content.next_link.cached_url}`"
          class="contentListItem-Nav_Next"
          title="next project"
          tag="div"
        >
          <div
            v-if="story.content.next_link.id !== ''"
            class="cursorInteract icon-Arrow"
            v-html="require('~/assets/images/icon-arrow-long.svg?include')"
          />
        </nuxt-link>
      </div>
      <div is="IndexGridItem" v-for="post in  story.content.images" :key="post.id" :post="post"></div>
    </section>
  </div>
</template>

<script>
import storyblokLivePreview from "@/mixins/storyblokLivePreview"
import IndexGridItem from "~/components/IndexGridItem.vue"

export default {
  scrollToTop: true,
  mixins: [storyblokLivePreview],
  components: {
    IndexGridItem: IndexGridItem
  },
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
    document.addEventListener("keydown", this.backOnEscape)
    document.addEventListener("keydown", this.keyNavigation)
    window.addEventListener("scroll", this.headerToMixBlendMode)
  },
  destroyed() {
    document.removeEventListener("keydown", this.backOnEscape)
    document.removeEventListener("keydown", this.keyNavigation)
    window.removeEventListener("scroll", this.headerToMixBlendMode)
  },
  watch: {
    $route() {
      removeMixBlendMode()
    }
  },
  methods: {
    transformImage(image, option) {
      if (!image) return ""
      if (!option) return ""

      let imageService = "//img2.storyblok.com/"
      let path = image.replace("//a.storyblok.com", "")
      return imageService + option + path
    },
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
    },
    headerToMixBlendMode() {
      var header = document.querySelector(".contentListItem-Header")
      var images = document.querySelector(".imageGrid")
      var headerPos = header.getBoundingClientRect()
      var imagesPos = images.getBoundingClientRect()
      if (headerPos.height / 2 >= imagesPos.top) {
        header.classList.add("mixblend")
      } else {
        header.classList.remove("mixblend")
      }
    },
    removeMixBlendMode() {
      var header = document.querySelector(".contentListItem-Header")
      header.classList.remove("mixblend")
    }
  },
  head() {
    return {
      title: "Dries Bos — " + this.story.content.title
    }
  }
}
</script>
