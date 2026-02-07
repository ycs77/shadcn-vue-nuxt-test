<template>
  <div class="min-h-screen bg-[#FDFBF7] font-[Merriweather]">
    <PublicNavbar />

    <!-- Hero -->
    <section class="mx-auto max-w-2xl px-6 py-16 text-center lg:py-24">
      <h1 class="text-3xl font-bold leading-tight text-[#1A1A1A] lg:text-5xl">
        Words that stay with you
      </h1>
      <p class="mx-auto mt-6 max-w-lg text-base leading-relaxed text-[#6B7280] lg:text-lg">
        A quiet corner of the internet for long-form writing, thoughtful essays, and stories that reward your attention.
      </p>
      <div class="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Button as-child class="h-11 cursor-pointer rounded-none bg-[#1A1A1A] px-8 font-[Merriweather] text-sm text-[#FDFBF7] hover:bg-[#1A1A1A]/90">
          <NuxtLink to="/login">
            Sign Up Free
          </NuxtLink>
        </Button>
        <NuxtLink to="/login" class="cursor-pointer text-sm text-[#6B7280] transition-colors hover:text-[#1A1A1A]">
          Already have an account? Sign in
        </NuxtLink>
      </div>
    </section>

    <Separator class="mx-auto max-w-2xl bg-[#1A1A1A]/10" />

    <!-- Featured Articles -->
    <section class="mx-auto max-w-2xl px-6 py-12">
      <h2 class="mb-10 text-xs font-bold uppercase tracking-[0.2em] text-[#6B7280]">
        Recent Essays
      </h2>
      <div class="flex flex-col">
        <NuxtLink
          v-for="(article, index) in articles"
          :key="article.id"
          :to="`/posts/${article.id}`"
          class="group cursor-pointer"
        >
          <div class="py-8">
            <time class="text-xs text-[#6B7280]">{{ article.date }}</time>
            <h3 class="mt-3 text-xl font-bold leading-snug text-[#1A1A1A] transition-colors group-hover:text-[#6B7280] lg:text-2xl">
              {{ article.title }}
            </h3>
            <p class="mt-3 text-sm leading-relaxed text-[#6B7280] lg:text-base">
              {{ article.excerpt }}
            </p>
            <p class="mt-3 text-xs text-[#6B7280]/60">
              By {{ article.author }} &middot; {{ article.readTime }}
            </p>
          </div>
          <Separator v-if="index < articles.length - 1" class="bg-[#1A1A1A]/10" />
        </NuxtLink>
      </div>
    </section>

    <Separator class="mx-auto max-w-2xl bg-[#1A1A1A]/10" />

    <!-- Social Proof -->
    <section class="mx-auto max-w-2xl px-6 py-16">
      <div class="flex flex-col items-center justify-center gap-12 sm:flex-row">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="text-center"
        >
          <p class="text-3xl font-bold text-[#1A1A1A]">{{ stat.value }}</p>
          <p class="mt-1 text-sm text-[#6B7280]">{{ stat.label }}</p>
        </div>
      </div>
    </section>

    <Separator class="mx-auto max-w-2xl bg-[#1A1A1A]/10" />

    <!-- About -->
    <section class="mx-auto max-w-2xl px-6 py-16">
      <p class="text-base leading-relaxed text-[#6B7280] lg:text-lg">
        Papyrus was founded on a simple belief: the best writing needs space to breathe. In a world of endless feeds and shrinking attention spans, we create a home for essays, reportage, and fiction that demands more from its readers &mdash; and gives more in return.
      </p>
      <blockquote class="mt-8 border-l-2 border-[#1A1A1A]/20 pl-6">
        <p class="text-base italic text-[#1A1A1A] lg:text-lg">
          "Reading should feel like sitting down with a good friend who has something important to say."
        </p>
        <footer class="mt-3 text-sm text-[#6B7280]">
          &mdash; Clara Whitfield, Founder
        </footer>
      </blockquote>
    </section>

    <!-- CTA -->
    <section class="border-t border-[#1A1A1A]/10 bg-[#FDFBF7] py-16">
      <div class="mx-auto max-w-md px-6 text-center">
        <h2 class="text-2xl font-bold text-[#1A1A1A]">
          Start reading
        </h2>
        <p class="mt-3 text-sm text-[#6B7280]">
          Create a free account and dive into stories that matter.
        </p>
        <div class="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button as-child class="h-11 cursor-pointer rounded-none bg-[#1A1A1A] px-8 font-[Merriweather] text-sm text-[#FDFBF7] hover:bg-[#1A1A1A]/90">
            <NuxtLink to="/login">
              Create Account
            </NuxtLink>
          </Button>
          <NuxtLink to="/login" class="cursor-pointer text-sm text-[#6B7280] transition-colors hover:text-[#1A1A1A]">
            Sign in
          </NuxtLink>
        </div>
      </div>
    </section>

    <PublicFooter />
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

useSeoMeta({
  title: 'Papyrus - Words That Stay With You',
  description: 'A quiet corner of the internet for long-form writing, thoughtful essays, and stories that reward your attention.',
})

const stats = [
  { value: '12,000+', label: 'readers' },
  { value: '500+', label: 'articles' },
  { value: '50+', label: 'writers' },
]

const articles = [
  {
    id: 1,
    title: 'The Slow Disappearance of Silence',
    excerpt: 'In a world that never stops talking, silence has become the rarest luxury. This essay traces our relationship with quiet from monastery libraries to noise-cancelling headphones, and asks: what have we lost?',
    date: 'January 15, 2026',
    author: 'Clara Whitfield',
    readTime: '12 min read',
  },
  {
    id: 2,
    title: 'Letters to No One: The Lost Art of Correspondence',
    excerpt: 'Before email, before texts, there were letters. Real letters, written with care, sealed with intention. A meditation on what the death of letter-writing says about how we value connection.',
    date: 'January 8, 2026',
    author: 'Thomas Hale',
    readTime: '9 min read',
  },
  {
    id: 3,
    title: 'The Cartography of Memory',
    excerpt: 'We navigate our pasts like travelers without maps. A neuroscientist and a poet walk us through the landscapes of recollection, forgetting, and the stories we tell ourselves to fill the gaps.',
    date: 'January 2, 2026',
    author: 'Mira Fontaine',
    readTime: '15 min read',
  },
  {
    id: 4,
    title: 'On Walking Without Purpose',
    excerpt: 'The flaneur walks not to arrive but to observe. In the tradition of Baudelaire and Benjamin, we make a case for purposeless wandering as a radical act in an efficiency-obsessed culture.',
    date: 'December 26, 2025',
    author: 'Elliot Marsh',
    readTime: '8 min read',
  },
  {
    id: 5,
    title: 'What Trees Know That We Have Forgotten',
    excerpt: 'Beneath the forest floor, a vast network of roots and fungi connects trees in a web of mutual aid. What can this "wood wide web" teach us about community, patience, and survival?',
    date: 'December 19, 2025',
    author: 'Clara Whitfield',
    readTime: '11 min read',
  },
  {
    id: 6,
    title: 'The Bookshop at the Edge of the World',
    excerpt: 'On a wind-battered Scottish island, a second-hand bookshop defies every rule of modern retail. Its owner shares what three decades of selling books to strangers has taught him about human nature.',
    date: 'December 12, 2025',
    author: 'Thomas Hale',
    readTime: '14 min read',
  },
]
</script>
