<template>
  <header>
    <div class="header-Logo">
      <nuxt-link class="header-Link" to="/" tag="a">
        <span v-if="$route.path !== '/about'">Dries</span>
        <span v-if="$route.path === '/'">Bos Studio</span>
        <span v-if="$route.name === 'blog-postId'">and {{ blog-postId }}</span>
      </nuxt-link>
    </div>
    <nuxt-link v-if="$route.path === '/'" class to="/about" tag="div">
      <a>Profile</a>
    </nuxt-link>
    <nuxt-link v-if="$route.path !== '/'" class to="/" tag="div">
      <a>X</a>
    </nuxt-link>
  </header>
</template>
