const axios = require('axios')
const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: 'Dries Bos Studio',
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
        content: 'web design + development'
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
        content: 'Dries Bos Studio'
      },
      {
        property: 'og:description',
        content: 'web design + development'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png'
      },
      {
        rel: 'icon',
        type: 'image/image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png'
      },
      {
        rel: 'manifest',
        href: '/site.webmanifest'
      },
      {
        rel: 'mask-icon',
        href: '/safari-pinned-tab.svg'
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
   ** Global CSS
   */
  css: [
    '~/assets/styling/reset.css',
    '~/assets/styling/variables.sass',
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
            ? 'jqAz0BlSNQQGVE8GhfrrFwtt' // Public
            : 'QMGXgQtF6vZkJUrEKUBIlQtt', // Preview
        cacheProvider: 'memory'
      }
    ]
  ],
  /*
   ** Generating routes
   */
  generate: {
    routes: function() {
      return axios
        .get(
          'https://api.storyblok.com/v1/cdn/stories?version=published&token=QMGXgQtF6vZkJUrEKUBIlQtt&starts_with=blog&cv=' +
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
