<template>
  <section id="floatBlock" class="block block-Text block-Header">
    <div
      class="blockTop"
      v-html="require('~/assets/images/spaceform.svg?include')"
    />

    <div class="block-Text_Content">
      <div class="block-Text_Column block-Header_Logo">
        <nuxt-link class="cursorInteract" to="/">
          <span title="that's me!">Dries Bos</span>
          <!-- prettier-ignore -->
          <span v-show="this.$route.name === 'index' || this.$route.name === 'about'"
            class="logo-Subtitle"
            title="that's me!"
            >— Interface Developer</span
          >
          <span
            v-show="this.$route.name === 'projects-slug'"
            class="logo-Slug"
            title="Dries and.."
            >& {{ slug }}</span
          >
        </nuxt-link>
      </div>

      <div class="block-Text_Column block-Text_Icons">
        <!-- INDEX -->
        <div
          v-show="this.$route.name === 'index'"
          class="block-Text_Icon block-Text_View"
          @click="toggleTheView"
        >
          <div
            v-show="viewState"
            class="cursorInteract icon icon-View"
            title="image view"
          >
            <div v-html="require('~/assets/images/icon-img.svg?include')"></div>
          </div>
          <div
            v-show="!viewState"
            class="cursorInteract icon icon-View"
            title="text view"
          >
            <div v-html="require('~/assets/images/icon-txt.svg?include')"></div>
          </div>
        </div>
        <!-- WORDS -->
        <div
          v-show="this.$route.name === 'index'"
          class="block-Text_Icon block-Text_Words"
          title="Words page"
        >
          <nuxt-link
            to="/words"
            class="cursorInteract icon icon-Words"
            title="words"
            tag="div"
          >
            <div
              v-html="require('~/assets/images/icon-chat.svg?include')"
            ></div>
          </nuxt-link>
        </div>
        <!-- ABOUT -->
        <div
          v-show="this.$route.name === 'index'"
          class="block-Text_Icon block-Text_About"
          title="about page"
        >
          <nuxt-link
            to="/about"
            class="cursorInteract icon icon-About"
            title="about"
            tag="div"
          >
            <div
              v-html="require('~/assets/images/icon-about.svg?include')"
            ></div>
          </nuxt-link>
        </div>
        <!-- MAIL -->
        <div
          v-show="this.$route.name === 'about'"
          class="block-Text_Icon block-Text_View mobileContent"
          title="mail me!"
        >
          <a
            href="mailto:info@driesbos.com"
            class="cursorInteract icon icon-Mail"
            target="_blank"
          >
            <div v-html="require('~/assets/images/icon-mail.svg?include')" />
          </a>
        </div>
        <!-- PHONE -->
        <div
          v-show="this.$route.name === 'about'"
          class="block-Text_Icon block-Text_View mobileContent"
          title="call me!"
          target="_blank"
        >
          <a href="tel:0031636101262" class="cursorInteract icon icon-Phone">
            <div v-html="require('~/assets/images/icon-phone.svg?include')" />
          </a>
        </div>
        <!-- PREV -->
        <!-- <li
            v-show="this.$route.name === 'projects-slug'"
            class="block-Text_Icon block-Text_View"
            title="previous project"
          >
            <div class="cursorInteract icon icon-Arrow icon-Arrow_Prev">
              <div
                v-html="require('~/assets/images/icon-arrow-long.svg?include')"
              ></div>
            </div>
          </li> -->
        <!-- NEXT -->
        <!-- <li
            v-show="this.$route.name === 'projects-slug'"
            class="block-Text_Icon block-Text_View"
            title="next project"
          >
            <div class="cursorInteract icon icon-Arrow icon-Arrow_Next">
              <div
                v-html="require('~/assets/images/icon-arrow-long.svg?include')"
              ></div>
            </div>
          </li> -->
        <!-- CLOSE -->
        <div
          v-show="this.$route.name !== 'index'"
          class="block-Text_Icon block-Text_Close"
          title="close page"
        >
          <nuxt-link
            to="/"
            class="cursorInteract icon icon-Close"
            title="close"
            tag="div"
          >
            <div
              v-html="require('~/assets/images/icon-close.svg?include')"
            ></div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex"

export default {
  data() {
    return {
      slug: null,
      rangeValue: "100"
    }
  },
  fetch({ store }) {
    store.commit("toggleTheView")
  },
  computed: {
    ...mapState({
      viewState: state => state.view.viewState
    })
  },
  watch: {
    $route(to, from) {
      this.processedSlug()
    }
  },
  mounted() {
    this.processedSlug()
  },
  methods: {
    processedSlug() {
      if (this.$route.name === "projects-slug" && this.$route.params.slug) {
        let val = this.$route.params.slug
        let str = val.replace(/-/g, " ").toUpperCase()
        this.slug = str
          .trim()
          .toLowerCase()
          .replace(/\w\S*/g, w => w.replace(/^\w/, c => c.toUpperCase()))
      }
    },
    toggleTheView() {
      this.$store.commit("view/toggleTheView")
      this.$emit("toggle-view")
    }
  }
}
</script>
