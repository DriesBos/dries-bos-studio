<template>
  <header class="header">
    <nuxt-link class="header-Logo icon-Container ellipsis" to="/" tag="a">
      <h1>Dries Bos</h1>
    </nuxt-link>
    <div class="icons-Row">
      <div
        class="icon-Container header-Profile"
        v-scroll-to="`.view-Profile`"
        title="about me"
        :data-toggle-profile="profile"
      >
        <img src="~assets/images/profile-dark.png" class="icon" />
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'TheHeader',
  props: {
    profile: Boolean
  }
}
</script>
