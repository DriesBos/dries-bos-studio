<template>
  <header class="header">
    <nuxt-link class="header-Logo icon-Container ellipsis" to="/" tag="a">
      <h1>Dries Bos</h1>
    </nuxt-link>
    <!-- <div class="icons-Row">
      <div
        class="icon-Container header-Profile"
        v-scroll-to="`.view-Profile`"
        title="profile"
      >
        <img src="~assets/images/profile-dark.png" class="icon" />
      </div>
    </div>-->
    <div class="header-Profile icon-Container ellipsis" v-scroll-to="`.view-Profile`">
      <h1>profile</h1>
    </div>
  </header>
</template>

<script>
export default {
  name: 'TheHeader'
}
</script>
