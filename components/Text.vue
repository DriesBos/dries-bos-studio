<template>
  <section class="contentListItem-Text">
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
