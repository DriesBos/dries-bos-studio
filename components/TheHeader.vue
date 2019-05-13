<template>
  <header>
    <nuxt-link class="header-Logo header-Link" to="/" tag="div">
      <p v-if="$route.path === '/'">Dries Bos Studio</p>
      <p v-if="headerTitle">Dries and {{ headerTitle }}</p>
    </nuxt-link>
    <div v-if="$route.path === '/'" class="header-Icons">
      <nuxt-link class="header-Link" to="/about" tag="div">
        <!-- <svg width="auto" height="auto">
          <path
            fill="currentColor"
            fill-rule="nonzero"
            d="M10 1.67a8.34 8.34 0 1 0 0 28 8.34 8.34 0 0 0 0-28zm0 2.5a2.5 2.5 0 1 1 0 4.99 2.5 2.5 0 0 1 0-5zM10 16a6 6 0 0 1-5-2.68c.03-1.66 3.33-2.57 5-2.57 1.66 0 4.97.9 5 2.57A6 6 0 0 1 10 16z"
          ></path>
        </svg>-->
      </nuxt-link>
      <div class="header-Link">
        <!-- <svg width="auto" height="auto">
          <path
            fill="currentColor"
            fill-rule="nonzero"
            d="M10 1.67a8.34 8.34 0 1 0 0 28 8.34 8.34 0 0 0 0-28zm0 2.5a2.5 2.5 0 1 1 0 4.99 2.5 2.5 0 0 1 0-5zM10 16a6 6 0 0 1-5-2.68c.03-1.66 3.33-2.57 5-2.57 1.66 0 4.97.9 5 2.57A6 6 0 0 1 10 16z"
          ></path>
        </svg>-->
      </div>
    </div>
    <div v-if="$route.path !== '/'" class="header-Icons">
      <nuxt-link class="header-Link" to="/" tag="div">
        <!-- <svg width="auto" height="auto">
        <path
          fill="currentColor"
          fill-rule="evenodd"
          d="M10.05 8.29l6.23-6.23 1.76 1.77-6.22 6.22 6.22 6.23-1.76 1.76-6.23-6.22-6.22 6.22-1.77-1.76 6.23-6.23-6.23-6.22 1.77-1.77 6.22 6.23z"
        ></path>
        </svg>-->
      </nuxt-link>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    headerTitle: {
      type: String,
      required: false
    }
  }
}
</script>
