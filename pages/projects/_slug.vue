<template>
  <div class="view view-Project">
    <component
      :is="blok.component | dashify"
      v-for="blok in story.content.body"
      :key="blok._uid"
      :blok="blok"
    ></component>
    <ImageBlock
      v-for="post in story.content.images"
      :key="post.id"
      :post="post"
    ></ImageBlock>
    <TheFooter />
  </div>
</template>

<script>
import { mapState } from "vuex"
import onPageLoad from "@/mixins/onPageLoad"
import storyblokLivePreview from "@/mixins/storyblokLivePreview"

export default {
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
  fetch({ store }) {
    store.commit("togglePrevState")
    store.commit("toggleNextState")
    store.commit("falsePrevBtn")
    store.commit("truePrevBtn")
    store.commit("falseNextBtn")
    store.commit("trueNextBtn")
  },
  head() {
    return {
      title: "Dries Bos — " + this.story.content.title
    }
  },
  computed: {
    ...mapState({
      posts: state => state.posts.list,
      prevState: state => state.navigation.prevState,
      nextState: state => state.navigation.nextState
    })
  },
  watch: {
    prevState: function() {
      this.prevStateChanged()
    },
    nextState: function() {
      this.nextStateChanged()
    }
  },
  mounted() {
    this.setPrevButton()
    this.setNextButton()
    document.addEventListener("keydown", this.backOnEscape)
    document.addEventListener("keydown", this.keyNavigation)
    document.addEventListener("visibilitychange", this.windowIsVisible)
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
    document.removeEventListener("visibilitychange", this.windowIsVisible)
    document.removeEventListener("keydown", this.backOnEscape)
    document.removeEventListener("keydown", this.keyNavigation)
  },
  methods: {
    setPrevButton() {
      if (this.story.content.prev_link.cached_url) {
        this.$store.commit("navigation/truePrevBtn")
      } else {
        this.$store.commit("navigation/falsePrevBtn")
      }
    },
    setNextButton() {
      if (this.story.content.next_link.cached_url) {
        this.$store.commit("navigation/trueNextBtn")
      } else {
        this.$store.commit("navigation/falseNextBtn")
      }
    },
    prevStateChanged() {
      if (this.story.content.prev_link.cached_url) {
        this.$router.push({
          path: `/${this.story.content.prev_link.cached_url}`
        })
        this.setPrevButton()
      }
    },
    nextStateChanged() {
      if (this.story.content.next_link.cached_url) {
        this.$router.push({
          path: `/${this.story.content.next_link.cached_url}`
        })
        this.setNextButton()
      }
    },
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
    },
    windowIsVisible() {
      if (document.visibilityState === "hidden") {
        document.title = "MISS U"
        document
          .querySelector("link[rel*='icon']")
          .setAttribute("href", "question.png")
      } else {
        document.title = "Dries Bos — Creative Web Developer"
        document
          .querySelector("link[rel*='icon']")
          .setAttribute("href", "favicon.png")
      }
    }
  }
}
</script>
