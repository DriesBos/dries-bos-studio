const axios = require('axios')
const pkg = require('./package')
require('dotenv').config()

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: '🧑‍🚀 Dries Bos — Web & Interaction Developer',
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
        content:
          'I’m Dries Bos, a Web & Interaction Developer from Amsterdam. I help brands build their vision online.'
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
        content: '🧑‍🚀 Dries Bos — Web & Interaction Developer'
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
      },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'black-translucent'
      },
      {
        name: 'apple-mobile-web-app-title',
        content: 'Dries Bos'
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

  serverMiddleware: [
    // Will register redirect-ssl npm package
    'redirect-ssl'
  ],

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#FF4105',
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
    ['@nuxtjs/dotenv', {}],
    [
      'storyblok-nuxt',
      {
        accessToken:
          process.env.NODE_ENV === 'production'
            ? `${process.env.PUBLICKEY}`
            : `${process.env.PREVIEWKEY}`,
        cacheProvider: 'memory'
      }
    ],
    ['vue-scrollto/nuxt', { duration: 300 }],
    [
      '@nuxtjs/google-analytics',
      {
        id: process.env.GA_ID || `${process.env.GA_ID}`
      }
    ]
  ],
  /*
   ** Router behaviour
   */
  router: {
    scrollBehavior: function(to, from, savedPosition) {
      return {
        x: 0,
        y: 0
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
          `https://api.storyblok.com/v1/cdn/stories?version=published&token=${
            process.env.APITOKEN
          }&starts_with=blog&cv=` + Math.floor(Date.now() / 1e3)
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
