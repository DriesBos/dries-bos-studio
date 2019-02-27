<template>
  <section class="view-Project">
    <!-- <ul class="propject-List">
      <li>
        <h1>{{ title }}</h1>
        <p>{{ excerpt }}</p>
        <p>{{ cover }}</p>
      </li>
    </ul> -->
  </section>
</template>

<script>
export default {
  // props: {
  //   title: {
  //     type: String,
  //     required: true
  //   },
  //   excerpt: {
  //     type: String,
  //     required: true
  //   },
  //   cover: {
  //     type: String,
  //     required: true
  //   },
  //   id: {
  //     type: String,
  //     required: true
  //   }
  // }
}
</script>

<style lang="sass" scoped>
.view-Project
  margin-top: 100px
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
.project-List
  display: flex
  flex-direction: column
  width: 500px
  li
    background: lightblue
    margin-bottom: 100px
  img
    width: 100%
    height: auto
</style>
