const pkg = require("./package")
const axios = require("axios")

module.exports = {
  target: "static",
  /*
   ** Headers of the page
   */
  head: {
    title: "Dries Bos — Creative Web Developer",
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
      },
      { property: "og:image", content: "/image.png" }
    ],
    link: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon.png"
      }
    ]
  },

  // Runtime config
  // Exposed to frontend
  publicRuntimeConfig: {
    nodeEnv: process.env.NODE_ENV,
    gaId: process.env.GA_ID
  },
  // Secret
  privateRuntimeConfig: {
    previewKey: process.env.PREVIEWKEY,
    publicKey: process.env.PUBLICKEY
  },

  /*
   ** Customize the progress-bar color
   */
  loading: false,

  // Auto import components
  components: true,
  /*
   ** Global CSS
   */
  css: [
    "~/assets/styles/reset.css",
    "~/assets/styles/form-reset.css",
    "~/assets/styles/typography.sass",
    "~/assets/styles/fonts.css",
    "~/assets/styles/transitions.sass",
    "~/assets/styles/body.sass"
  ],

  // Settings for "@nuxtjs/style-resources"
  styleResources: {
    sass: "./assets/styles/vars/*.sass"
  },

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~/plugins/components",
    "~/plugins/filters",
    "~/plugins/vue-lazyload",
    "~/plugins/vue-click-outside",
    "~/plugins/vue-scrollto"
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/axios",
    "vue-scrollto/nuxt",
    [
      "storyblok-nuxt",
      {
        accessToken:
          process.env.NODE_ENV === "production"
            ? process.env.PUBLICKEY
            : process.env.PREVIEWKEY,
        cacheProvider: "memory"
      }
    ]
  ],

  // Generate routes
  generate: {
    routes: function(callback) {
      const token = process.env.PUBLICKEY
      const version = "published"
      let cache_version = 0

      let toIgnore = ["home", "en/settings"]

      // other routes that are not in Storyblok with their slug.
      let routes = ["/"] // adds / directly

      // Load space and receive latest cache version key to improve performance
      axios
        .get(`https://api.storyblok.com/v1/cdn/spaces/me?token=${token}`)
        .then(space_res => {
          // timestamp of latest publish
          cache_version = space_res.data.space.version

          // Call for all Links using the Links API: https://www.storyblok.com/docs/Delivery-Api/Links
          axios
            .get(
              `https://api.storyblok.com/v1/cdn/links?token=${token}&version=${version}&cv=${cache_version}&per_page=100`
            )
            .then(res => {
              Object.keys(res.data.links).forEach(key => {
                if (!toIgnore.includes(res.data.links[key].slug)) {
                  routes.push("/" + res.data.links[key].slug)
                }
              })

              callback(null, routes)
            })
        })
    },
    // Fallback to prevent Netlify from directing to its own error pages
    fallback: true
  },

  // Modules only run on build
  buildModules: [
    "@nuxtjs/pwa",
    "@nuxtjs/style-resources",
    "@aceforth/nuxt-optimized-images",
    "@nuxtjs/dotenv",
    [
      "@nuxtjs/google-analytics",
      {
        id: process.env.GA_ID
      }
    ]
  ],

  // Settings for "@aceforth/nuxt-optimized-images"
  optimizedImages: {
    optimizeImages: true
  },

  // Settings for PWA
  pwa: {
    icon: false
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
    },
    // Transpile GSAP for server side rendering
    transpile: ["gsap"]
  }
}
