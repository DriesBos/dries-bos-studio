<template>
  <section class="contentListItem-ImageBlock">
    <div
      class="spaceForm"
      v-html="require('~/assets/images/spaceform.svg?raw')"
    />
    <div class="contentListItem-ImageBlock_Container">
      <div
        v-for="(image, i) in blok.images"
        :key="i"
        class="contentListItem-ImageBlock_Item"
      >
        <nuxt-img
          width="2300"
          format="webp"
          :src="image.filename"
          :alt="image.title"
        />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    blok: Object
  }
}
</script>

<style lang="sass" scoped>
.contentListItem-ImageBlock
  width: 100%
  &_Container
    width: 100%
    display: flex
  &_Item
    width: 100%
    &:nth-child(2)
      img
        border-left: var(--border)
    &:nth-child(+n+3)
      display: none
</style>
