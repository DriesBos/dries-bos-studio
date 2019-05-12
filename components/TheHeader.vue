<template>
  <header>
    <nuxt-link class="header-Logo header-Link" to="/" tag="div">
      <span v-if="$route.path !== '/about'">
        Dries
        <span v-if="$route.path === '/'">Bos Studio</span>
        <span v-if="$route.name == 'blog-postId'">
          and
          <span class="capitalize">{{ $route.params.postId }}</span>
        </span>
      </span>
    </nuxt-link>
    <nuxt-link v-if="$route.path === '/'" class="header-Link" to="/about" tag="div">
      <span>Profile</span>
    </nuxt-link>
    <nuxt-link v-if="$route.path !== '/'" class="header-Link" to="/" tag="div">
      <span>X</span>
    </nuxt-link>
  </header>
</template>
