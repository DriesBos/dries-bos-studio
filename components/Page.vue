<template>
  <div v-editable="blok" class="view view-Page">
    <h1>TEST</h1>
    <component
      :is="blok.component | dashify"
      v-for="blok in blok.body"
      :key="blok._uid"
      :blok="blok"
    ></component>
  </div>
</template>

<script>
export default {
  props: {
    blok: Object
  }
}
</script>
