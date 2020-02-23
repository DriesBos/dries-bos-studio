<template>
  <section v-editable="blok" class="textItem-Container">
    <div class="textItem">
      <markdown-item :input="blok.text" />
      <br />
      <a href="mailto:info@driesbos.com">info@driesbos.com</a>
    </div>
  </section>
</template>

<script>
export default {
  scrollToTop: true,
  props: {
    blok: Object
  },
  mounted() {
    window.scrollTo(0, 0)
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
