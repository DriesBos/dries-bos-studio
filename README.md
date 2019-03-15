# nuxt-storyblok-boilerplate

```bash
# Boilerplate using VueJS, NuxtJS, Storyblok CMS, Axion
```

## Stack

```bash
# Nuxt as JavaScript Framework
# Storyblok as CMS
# Storyblok as database
```

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

## Added Deps

```bash
# install sass pre-processors
$ npm install --save-dev node-sass sass-loader

# install NuxtJS Module
$ npm install --save storyblok-nuxt
$ npm install @nuxt/webpack
```

## Heroku App Deployment (optional)

```bash
# Add Heroku to git
$ heroku git:remote -a app-name
$ git remote -v
$ git push heroku master
$ git push heroku branch-name:master

# Set Heroku Config
$ heroku config:set NPM_CONFIG_PRODUCTION=false
$ config:set HOST=0.0.0.0
$ heroku config:set NODE_ENV=production
```

## Miscellaneous

```bash
# Add favicon in /static
# Add VueX to /store
```
