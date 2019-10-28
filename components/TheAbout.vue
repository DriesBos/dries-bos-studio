<template>
  <section class="view-Profile">
    <div class="about">
      <MarkdownItem v-if="content" :input="content" />
      <div class="about-Contact">
        <a href="mailto:info@driesbos.com">
          Email
          <span>↗</span>
        </a>
        <br />
        <a href="https://github.com/DriesBos" target="_blank">
          Github
          <span>↗</span>
        </a>
        <br />
        <a href="https://www.linkedin.com/in/drbos" target="_blank">
          LinkedIn
          <span>↗</span>
        </a>
        <br />
        <a href="https://www.instagram.com/driesbosstudio/" target="_blank">
          Instagram
          <span>↗</span>
        </a>
        <br />
        <a href="https://codepen.io/driesbos" target="_blank">
          Codepen
          <span>↗</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import MarkdownItem from '~/components/MarkdownItem.vue'

export default {
  name: 'TheAbout',
  components: {
    MarkdownItem
  },
  props: {
    content: String
  }
}
</script>