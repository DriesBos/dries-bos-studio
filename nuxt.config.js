const axios = require('axios')
const pkg = require('./package')
const publicKey = process.env.PUBLICKEY
const previewKey = process.env.PREVIEWKEY
const apiToken = process.env.APITOKEN
// import { publicKey, previewKey, apiToken } from './config'

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: '🧑‍🚀 Dries Bos',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Creative Frontend Development'
      },
      {
        name: 'msapplication-TileColor',
        content: '#000000'
      },
      {
        name: 'theme-color',
        content: '#ffffff'
      },
      {
        property: 'og:image',
        content:
          'http://a.storyblok.com/f/54243/2160x2160/eb2e6a8c33/og-image.png'
      },
      {
        property: 'og:title',
        content: '🧑‍🚀 Dries Bos'
      },
      {
        property: 'og:description',
        content: 'Software Development + Interface Design'
      },
      {
        name: 'mobile-web-app-capable',
        content: 'yes'
      },
      {
        name: 'apple-mobile-web-app-capable',
        content: 'yes'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-icon-180x180.png'
      },
      {
        rel: 'manifest',
        href: '/manifest.json'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#333', // Similar to font color
    height: '2px',
    throttle: '200'
  },

  /*
   ** Global CSS
   */
  css: [
    '~/assets/styling/reset.css',
    '~/assets/styling/form-reset.css',
    '~/assets/styling/variables.sass',
    '~/assets/styling/fonts.css',
    '~/assets/styling/typography.sass',
    '~/assets/styling/transitions.sass',
    '~/assets/styling/main.sass'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~plugins/filters.js'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    [
      'storyblok-nuxt',
      {
        accessToken:
          process.env.NODE_ENV === 'production' // Generate new token
            ? `${publicKey}`
            : `${previewKey}`,
        cacheProvider: 'memory'
      }
    ],
    ['vue-scrollto/nuxt', { duration: 300 }]
  ],
  /*
   ** Router behaviour
   */
  router: {
    scrollBehavior: function(to, from, savedPosition) {
      return {
        x: 0,
        y: 500
      }
    }
  },
  /*
   ** Generating routes
   */
  generate: {
    routes: function() {
      return axios
        .get(
          `https://api.storyblok.com/v1/cdn/stories?version=published&token=${apiToken}&starts_with=blog&cv=` +
            Math.floor(Date.now() / 1e3)
        )
        .then(res => {
          const blogPosts = res.data.stories.map(bp => bp.full_slug)
          return ['/', '/blog', '/about', ...blogPosts]
        })
    }
  },
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient && 1 === 2) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
