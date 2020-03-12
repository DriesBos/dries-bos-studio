<template>
  <div class="view view-Container view-Project">
    <section id="floatBlock" class="projectItem-Text text">
      <div class="spaceForm"></div>
      <markdown-item :input="story.content.content" />
    </section>
    <section class="projectItem-Images">
      <div class="spaceForm"></div>
      <ul>
        <li v-for="(image, index) in story.content.images" :key="index">
          <div v-lazy-container="{ selector: 'img' }">
            <img
              :srcset="
                  `${transformImage(
                    image.filename,
                    '1668x0'
                  )} 1668w, ${transformImage(
                    image.filename,
                    '1440x0'
                  )} 1440w, ${transformImage(
                    image.filename,
                    '1280x0'
                  )} 1280w, ${transformImage(
                    image.filename,
                    '960x0'
                  )} 960w, ${transformImage(
                    image.filename,
                    '800x0'
                  )} 800w, ${transformImage(image.filename, '690x0')} 690w`
                "
              sizes="100vw"
              :data-src="image.filename"
              :alt="image.name"
            />
          </div>
        </li>
      </ul>
    </section>
    <nuxt-link
      v-if="story.content.prev_link.id !== ''"
      :to="`/${story.content.prev_link.cached_url}`"
      class="projectItem-Nav projectItem-Nav_Prev"
      title="previous project"
    >
      <div class="icon arrow" v-html="require('~/assets/images/icon-arrow-long.svg?include')" />
    </nuxt-link>
    <nuxt-link
      v-if="story.content.next_link.id !== ''"
      :to="`/${story.content.next_link.cached_url}`"
      class="projectItem-Nav projectItem-Nav_Next"
      title="next project"
    >
      <div class="icon arrow" v-html="require('~/assets/images/icon-arrow-long.svg?include')" />
    </nuxt-link>
  </div>
</template>

<script>
// STORYBLOK ASYNC CHECKED WITH https://www.storyblok.com/tp/nuxt-js-multilanguage-website-tutorial
import storyblokLivePreview from "@/mixins/storyblokLivePreview"
import JQuery from "jquery"
let $ = JQuery

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
    window.addEventListener("scroll", this.toggleBlock)
  },
  destroyed() {
    window.removeEventListener("scroll", this.toggleBlock)
  },
  methods: {
    toggleBlock() {
      let scrollPosition = document.documentElement.scrollTop
      if (scrollPosition > 0) {
        $("#floatBlock").addClass("active")
      } else {
        $("#floatBlock").removeClass("active")
      }
    },
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

<style lang="sass">
@import '~/assets/styling/variables.sass'

main
  .projectItem
    &-Text
      position: relative
      p
        padding: var(--spacing-one) var(--spacing-two)
      &-Images
        ul
          display: flex
          flex-direction: column
          align-items: center
          img
            transition: opacity $transition-lazy
          li
            margin-bottom: 1px
            min-height: 0
            width: 100%
          li:last-child
            margin-bottom: 0
          @media screen and ( min-width: $breakpoint-mobile)
            li:nth-child(2)
              width: calc((100% / 3) * 2)
              align-self: flex-end
            li:nth-child(3)
              width: calc(100% / 3)
              align-self: flex-start
            li:nth-child(4)
              width: calc((100% / 3) * 2)
              align-self: flex-start
            li:nth-child(5)
              width: calc(100% / 3)
              align-self: flex-end
      &-Nav
        position: fixed
        top: 50vh
        padding: var(--spacing-two)
        transform: translateY(-50%)
        color: white
        mix-blend-mode: difference
        z-index: $z-index-nav
        .icon
          width: 2.5em
        &_Prev
          left: 0
          svg
            transform: rotate(180deg)
        &_Next
          right: 0
main.spaced.four
  .projectItem
    &-Nav
      color: black
.spaced
  .projectItem-Images
    @media screen and ( min-width: $breakpoint-mobile)
      li:nth-child(1)
        width: calc(100% - (2 * #{var(--spacing-two)})) !important
        align-self: center
      li:nth-child(2)
        width: calc((((100% - (4 * #{var(--spacing-two)})) / 3) * 2) + #{var(--spacing-two)}) !important
        margin-right: var(--spacing-two)
        align-self: flex-end
      li:nth-child(3)
        width: calc((100% - (4 * #{var(--spacing-two)})) / 3) !important
        align-self: flex-start
        margin-left: var(--spacing-two)
      li:nth-child(4)
        width: calc((((100% - (4 * #{var(--spacing-two)})) / 3) * 2) + #{var(--spacing-two)}) !important
        align-self: flex-start
        margin-left: var(--spacing-two)
      li:nth-child(5)
        width: calc((100% - (4 * #{var(--spacing-two)})) / 3) !important
        margin-right: var(--spacing-two)
</style>
