<template>
  <div class="content">
    <section class="content-Page">
      <div class="dynamic-Text">
        <p>
          Oops! We couldn't find that page. Return
          <nuxt-link class="hovered" to="/">home</nuxt-link>/ View
          <nuxt-link class="hovered" to="/work">work</nuxt-link>.
        </p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Error – Hello X Comrade",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Oops! We couldn't find that page."
        }
      ]
    }
  }
}
</script>
