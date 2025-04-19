# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash

npm install vuetify@next

# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

## there is a probleme with vuetify and tailwinds

```bash
npm install vuetify@next

// plugins/vuetify.ts
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
  })

  nuxtApp.vueApp.use(vuetify)
})

# nuxt.config.ts
export default defineNuxtConfig({
  css: ['vuetify/styles'],
  build: {
    transpile: ['vuetify'],
  },
})


 Install Tailwind CSS 

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p



tailwind.config.js

module.exports = {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './nuxt.config.ts'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


assets/css/tailwind.css

@tailwind base;
@tailwind components;
@tailwind utilities;


nuxt.config.ts
export default defineNuxtConfig({
  css: [
    'vuetify/styles',
    '@/assets/css/tailwind.css'
  ],
  build: {
    transpile: ['vuetify'],
  },
})


```

# to reinitialize tailwind

```
rm -rf node_modules package-lock.json && npm cache clean --force && npm install && ls node_modules/.bin/tailwindcss && npx tailwindcss init -p
```
 