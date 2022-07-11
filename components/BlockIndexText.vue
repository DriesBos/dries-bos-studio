<template>
  <nuxt-link
    :id="post.id"
    :key="post.id"
    :to="`/projects/${post.id}`"
    class="block block-Text hoverUp"
    :class="[{ disabled: !post.active }, { cursorInteract: post.active }]"
    tag="section"
  >
    <div
      class="blockTop"
      v-html="require('~/assets/images/spaceform.svg?include')"
    />
    <div class="block-Text_Content">
      <div class="block-Text_Column year">
        <p title="year">{{ post.year || "" }}</p>
      </div>

      <div class="block-Text_Column title">
        <p title="project">{{ post.title || "" }}</p>
      </div>

      <div class="block-Text_Column block-Text_Icons">
        <div
          class="icon icon-Arrow"
          title="view project"
          v-html="require('~/assets/images/icon-arrow.svg?include')"
        ></div>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    post: Object
  }
}
</script>
