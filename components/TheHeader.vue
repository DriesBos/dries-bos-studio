<template>
  <header class="list">
    <li class="listItem listItem_Header">
      <div class="listItem-DetailsWrapper">
        <div class="listItem-Logo listItem-Details">
          <nuxt-link to="/">
            Dries Bos
            <span v-if="this.$route.name === 'project-slug'"
              >— {{ $route.params.slug }}</span
            >
            <span v-else>— Web & Interaction Development</span>
          </nuxt-link>
        </div>
        <div v-if="this.$route.name === 'project-slug'" class="listItem-Icons">
          <nuxt-link to="/" class="icon-Container" title="close project">
            <div
              class="icon"
              v-html="require('~/assets/images/icon-close.svg?include')"
            ></div>
          </nuxt-link>
        </div>
      </div>
    </li>
  </header>
</template>
