import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&family=Geist:wght@100..900&family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&display=swap' },
      ],
    },
  },
  css: ['~/assets/css/main.css'],
  modules: [
    '@vueuse/nuxt',
    'shadcn-nuxt',
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ],
    optimizeDeps: {
      include: [
        '@internationalized/date',
        '@lucide/vue',
        '@unovis/ts',
        '@unovis/vue',
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'class-variance-authority',
        'clsx',
        'reka-ui',
        'tailwind-merge',
        'vue-sonner',
      ],
    },
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
})
