const pkg = require("./package")
const axios = require("axios")
require("dotenv").config()

module.exports = {
  mode: "universal",

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      {
        charset: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover"
      },
      {
        hid: "description",
        name: "description",
        content: pkg.description
      },
      {
        name: "mobile-web-app-capable",
        content: "yes"
      },
      {
        name: "apple-mobile-web-app-capable",
        content: "yes"
      },
      {
        name: "apple-mobile-web-app-status-bar-style",
        content: "black-translucent"
      }
    ],
    link: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png"
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-icon-180x180.png"
      },
      {
        rel: "manifest",
        href: "/manifest.json"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: false,

  /*
   ** Global CSS
   */
  css: [
    "~/assets/styling/reset.css",
    "~/assets/styling/form-reset.css",
    "~/assets/styling/variables.sass",
    "~/assets/styling/fonts.css",
    "~/assets/styling/typography.sass",
    "~/assets/styling/transitions.sass",
    "~/assets/styling/main.sass"
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["~/plugins/components", "~/plugins/filters"],
  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/pwa",
    "@nuxtjs/axios",
    [
      "@bazzite/nuxt-optimized-images",
      { optimizedImages: { optimizeImages: true, optimizeImagesInDev: true } }
    ],
    [
      "storyblok-nuxt",
      {
        accessToken:
          process.env.NODE_ENV === "production"
            ? process.env.PUBLICKEY
            : process.env.PREVIEWKEY,
        cacheProvider: "memory"
      }
    ],
    ["vue-scrollto/nuxt", { duration: 300 }]
  ],

  generate: {
    routes: function() {
      return axios
        .get(
          `https://api.storyblok.com/v1/cdn/stories?version=published&token=${process.env.APITOKEN}&starts_with=projects&cv=` +
            Math.floor(Date.now() / 1e3)
        )
        .then(res => {
          const blogPosts = res.data.stories.map(bp => bp.full_slug)
          return ["/", "/projects", "/about", ...blogPosts]
        })
    }
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
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        })
      }
    }
  },
  buildModules: [
    ["@nuxt/typescript-build"],
    [
      "@nuxtjs/google-analytics",
      {
        id: "UA-151943071-1"
      }
    ]
  ]
}
