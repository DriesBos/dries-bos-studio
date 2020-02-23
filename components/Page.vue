<template>
  <section v-editable="blok" class="content-Page">
    <component
      :is="blok.component | dashify"
      v-for="blok in blok.body"
      :key="blok._uid"
      :blok="blok"
    ></component>
  </section>
</template>

<script>
export default {
  props: {
    blok: Object
  }
  // head() {
  //   return {
  //     title: this.blok.metadata.title,
  //     meta: [
  //       {
  //         hid: "description",
  //         name: "description",
  //         content: this.blok.metadata.description
  //       }
  //     ]
  //   }
  // }
}
</script>
