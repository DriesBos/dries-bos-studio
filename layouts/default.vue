<template>
  <div>
    <transition name="headerFade">
      <header>
        <h1
          class="header-StaticLogo"
          v-if="$route.name === 'index' || $route.name === 'blog-postId'"
        >Dries</h1>
      </header>
    </transition>
    <transition name="pageFade" mode="out-in">
      <nuxt/>
    </transition>
  </div>
</template>
