<template>
  <section class="contentListItem-Text">
    <div
      class="spaceForm"
      v-html="require('~/assets/images/spaceform.svg?raw')"
    />
    <ul class="contentListItem">
      <component
        :is="blok.component | dashify"
        v-for="blok in blok.column"
        :key="blok._uid"
        :blok="blok"
      ></component>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    blok: Object
  }
}
</script>
