<template>
  <div class="view view-Project">
    <component
      :is="blok.component | dashify"
      v-for="blok in story.content.body"
      :key="blok._uid"
      :blok="blok"
    ></component>
    <div class="contentListItem-Nav">
      <nuxt-link
        :to="`/${story.content.prev_link.cached_url}`"
        class="contentListItem-Nav_Prev cursorInteract"
        title="previous project"
        tag="div"
      >
        <div
          v-if="story.content.prev_link.id !== ''"
          class="icon icon-Arrow icon-Arrow_Prev"
          v-html="require('~/assets/images/icon-arrow-long.svg?include')"
        />
      </nuxt-link>
      <nuxt-link
        :to="`/${story.content.next_link.cached_url}`"
        class="contentListItem-Nav_Next cursorInteract"
        title="next project"
        tag="div"
      >
        <div
          v-if="story.content.next_link.id !== ''"
          class="icon icon-Arrow icon-Arrow_Next"
          v-html="require('~/assets/images/icon-arrow-long.svg?include')"
        />
      </nuxt-link>
    </div>
    <GridItem
      v-for="post in story.content.images"
      :key="post.id"
      :post="post"
    ></GridItem>
    <TheFooter />
  </div>
</template>

<script>
import { mapState } from "vuex"
import onPageLoad from "@/mixins/onPageLoad"
import storyblokLivePreview from "@/mixins/storyblokLivePreview"
import GridItem from "~/components/GridItem.vue"

export default {
  components: {
    GridItem: GridItem
  },
  mixins: [storyblokLivePreview, onPageLoad],
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
  ...mapState({
    posts: state => state.posts.list,
    viewState: state => state.view.viewState
  }),
  mounted() {
    document.addEventListener("keydown", this.backOnEscape)
    document.addEventListener("keydown", this.keyNavigation)
    document
      .querySelectorAll(".cursorInteract")
      .forEach(item => item.addEventListener("mouseover", this.changeCursor))
    document
      .querySelectorAll(".cursorInteract")
      .forEach(item =>
        item.addEventListener("mouseleave", this.removeChangeCursor)
      )
  },
  destroyed() {
    this.removeChangeCursor()
    document
      .querySelectorAll(".cursorInteract")
      .forEach(item => item.removeEventListener("mouseover", this.changeCursor))
    document
      .querySelectorAll(".cursorInteract")
      .forEach(item =>
        item.removeEventListener("mouseleave", this.removeChangeCursor)
      )
    document.removeEventListener("keydown", this.backOnEscape)
    document.removeEventListener("keydown", this.keyNavigation)
  },
  methods: {
    changeCursor() {
      document.querySelector(".cursor").classList.add("active")
    },
    removeChangeCursor() {
      document.querySelector(".cursor").classList.remove("active")
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
    }
  },
  head() {
    return {
      title: "Dries Bos — " + this.story.content.title
    }
  }
}
</script>
