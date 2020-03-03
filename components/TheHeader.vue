<template>
  <header class="header">
    <ul>
      <nuxt-link to="/" class="header-Logo" tag="li">
        <span v-if="this.$route.name === 'index' || this.$route.name === 'projects-slug'">Dries</span>
        <span v-if="this.$route.name === 'index'">Bos — Web & Interaction Development</span>
        <span v-if="this.$route.name === 'projects-slug'">
          and
          <span class="header-Logo_Capitalize">{{ slug }}</span>
        </span>
      </nuxt-link>
      <li
        v-if="this.$route.name === 'projects-slug' || this.$route.name === 'all'"
        class="header-Close"
      >
        <nuxt-link to="/" title="close project">
          <div class="icon close" v-html="require('~/assets/images/icon-close.svg?include')"></div>
        </nuxt-link>
      </li>
      <li v-if="this.$route.name === 'index'" @click="toggleTheView">
        <div class="header-Toggle">
          <div class="header-Toggle_Item" :class="{ active: viewState }">
            <p>list</p>
          </div>
          <div class="header-Toggle_Item" :class="{ active: !viewState }">
            <p>grid</p>
          </div>
        </div>
      </li>
      <nuxt-link v-if="this.$route.name === 'index'" to="/profile" class="header-Profile" tag="li">
        <p>profile</p>
      </nuxt-link>
      <li v-if="this.$route.name === 'index'" @click="toggleTheme">
        <div class="header-Theme" title="change theme"></div>
      </li>
    </ul>
  </header>
</template>

<script>
import { mapState } from "vuex"

export default {
  data() {
    return {
      slug: null
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
  methods: {
    toggleTheme() {
      this.$emit("toggleTheme")
    },
    processedSlug() {
      if (this.$route.name === "projects-slug") {
        let str = this.$route.params.slug
        this.slug = str.replace(/-/g, " ")
      }
    },
    // ...mapMutations("view", ["set", "toggleTheView"]),
    toggleTheView() {
      this.$store.commit("view/toggleTheView")
    }
  },
  mounted() {
    this.processedSlug()
  }
}
</script>
