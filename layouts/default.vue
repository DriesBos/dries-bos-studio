<template>
  <div>
    <transition name="logoFade">
      <header class="header">
        <div class="header-Logo header-Link">
          <h1 v-if="$route.name === 'index' || $route.name === 'blog-postId'">Dries</h1>
        </div>
      </header>
    </transition>
    <transition name="pageFade" mode="out-in">
      <nuxt/>
    </transition>
  </div>
</template>
