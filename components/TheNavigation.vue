<template>
  <section id="floatBlock" class="contentListItem-Header">
    <div
      class="spaceForm"
      v-html="require('~/assets/images/spaceform.svg?raw')"
    />
    <ul class="contentListItem">
      <!-- TITLE -->
      <li class="contentListItem-Column logo">
        <nuxt-link class="cursorInteract" to="/">
          <span title="that's me!">Dries Bos</span>
          <!-- prettier-ignore -->
          <span v-show="this.$route.name === 'index' || this.$route.name === 'about'"
            class="logo-Subtitle"
            title="that's me!"
            >— Creative Web Developer</span
          >
          <span
            v-show="this.$route.name === 'projects-slug'"
            class="logo-Slug"
            title="Dries and.."
            >& {{ slug }}</span
          >
        </nuxt-link>
      </li>
      <!-- ICONS -->
      <li class="contentListItem-Column icons">
        <ul class="contentListItem-Icons">
          <!-- INDEX -->
          <li
            v-show="this.$route.name === 'index'"
            class="contentListItem-Icon contentListItem-View"
            @click="toggleTheView"
          >
            <div
              v-show="viewState"
              class="cursorInteract icon icon-View"
              title="image view"
            >
              <div v-html="require('~/assets/images/icon-img.svg?raw')"></div>
            </div>
            <div
              v-show="!viewState"
              class="cursorInteract icon icon-View"
              title="text view"
            >
              <div v-html="require('~/assets/images/icon-txt.svg?raw')"></div>
            </div>
          </li>
          <!-- ABOUT -->
          <li
            v-show="this.$route.name === 'index'"
            class="contentListItem-Icon contentListItem-About"
            title="about page"
          >
            <nuxt-link
              to="/about"
              class="cursorInteract icon icon-About"
              title="about"
              tag="div"
            >
              <div v-html="require('~/assets/images/icon-about.svg?raw')"></div>
            </nuxt-link>
          </li>
          <!-- MAIL -->
          <li
            v-show="this.$route.name === 'about'"
            class="contentListItem-Icon contentListItem-View mobileContent"
            title="mail me!"
          >
            <a
              href="mailto:info@driesbos.com"
              class="cursorInteract icon icon-Mail"
              target="_blank"
            >
              <div v-html="require('~/assets/images/icon-mail.svg?raw')" />
            </a>
          </li>
          <!-- PHONE -->
          <li
            v-show="this.$route.name === 'about'"
            class="contentListItem-Icon contentListItem-View mobileContent"
            title="call me!"
            target="_blank"
          >
            <a href="tel:0031636101262" class="cursorInteract icon icon-Phone">
              <div v-html="require('~/assets/images/icon-phone.svg?raw')" />
            </a>
          </li>
          <!-- PREV -->
          <li
            v-show="this.$route.name === 'projects-slug'"
            class="contentListItem-Icon contentListItem-View"
            :class="[{ disabled: !prevBtn }, { cursorInteract: prevBtn }]"
            title="previous project"
            @click="prevIsClicked"
          >
            <div class="icon icon-Arrow icon-Arrow_Prev">
              <div
                v-html="require('~/assets/images/icon-arrow-long.svg?raw')"
              ></div>
            </div>
          </li>
          <!-- NEXT -->
          <li
            v-show="this.$route.name === 'projects-slug'"
            class="contentListItem-Icon contentListItem-View"
            :class="[{ disabled: !nextBtn }, { cursorInteract: nextBtn }]"
            title="next project"
            @click="nextIsClicked"
          >
            <div class="icon icon-Arrow icon-Arrow_Next">
              <div
                v-html="require('~/assets/images/icon-arrow-long.svg?raw')"
              ></div>
            </div>
          </li>
          <!-- CLOSE -->
          <li
            v-show="this.$route.name !== 'index'"
            class="contentListItem-Icon contentListItem-Close"
            title="close page"
          >
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
      </li>
    </ul>
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
    store.commit("togglePrevState")
    store.commit("toggleNextState")
  },
  computed: {
    ...mapState({
      viewState: state => state.view.viewState,
      prevState: state => state.navigation.prevState,
      nextState: state => state.navigation.nextState,
      prevBtn: state => state.navigation.prevBtn,
      nextBtn: state => state.navigation.nextBtn
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
    },
    prevIsClicked() {
      this.$store.commit("navigation/togglePrevState")
    },
    nextIsClicked() {
      this.$store.commit("navigation/toggleNextState")
    }
  }
}
</script>
