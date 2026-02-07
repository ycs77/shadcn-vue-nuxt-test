<template>
  <div class="min-h-screen bg-[#FDFBF7] font-[Merriweather]">
    <PublicNavbar />

    <!-- Article -->
    <article v-if="post" class="mx-auto max-w-2xl px-6 py-12 lg:py-16">
      <!-- Header -->
      <header>
        <NuxtLink to="/" class="inline-flex cursor-pointer items-center gap-1 text-xs text-[#6B7280] transition-colors hover:text-[#1A1A1A]">
          <ArrowLeft class="size-3" />
          Back to essays
        </NuxtLink>
        <h1 class="mt-8 text-2xl font-bold leading-tight text-[#1A1A1A] lg:text-4xl">
          {{ post.title }}
        </h1>
        <div class="mt-4 flex items-center gap-2 text-xs text-[#6B7280]">
          <span>By {{ post.author }}</span>
          <span>&middot;</span>
          <time>{{ post.date }}</time>
          <span>&middot;</span>
          <span>{{ post.readTime }}</span>
        </div>
      </header>

      <Separator class="my-8 bg-[#1A1A1A]/10" />

      <!-- Body -->
      <div class="prose-papyrus">
        <p>{{ post.excerpt }}</p>
        <p v-for="(paragraph, index) in post.body" :key="index">
          {{ paragraph }}
        </p>
      </div>

      <Separator class="my-8 bg-[#1A1A1A]/10" />

      <!-- Author -->
      <div class="flex items-start gap-4">
        <div class="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#1A1A1A]/5 text-lg font-bold text-[#1A1A1A]/40">
          {{ post.author[0] }}
        </div>
        <div>
          <p class="text-sm font-bold text-[#1A1A1A]">{{ post.author }}</p>
          <p class="mt-1 text-xs leading-relaxed text-[#6B7280]">{{ post.authorBio }}</p>
        </div>
      </div>
    </article>

    <!-- Not Found -->
    <div v-else class="mx-auto max-w-2xl px-6 py-20 text-center">
      <h1 class="text-2xl font-bold text-[#1A1A1A]">Essay not found</h1>
      <p class="mt-3 text-sm text-[#6B7280]">The essay you're looking for doesn't exist.</p>
      <NuxtLink to="/" class="mt-6 inline-block cursor-pointer text-sm text-[#6B7280] transition-colors hover:text-[#1A1A1A]">
        Back to home
      </NuxtLink>
    </div>

    <!-- More Essays -->
    <section v-if="post && relatedPosts.length > 0" class="border-t border-[#1A1A1A]/10">
      <div class="mx-auto max-w-2xl px-6 py-12">
        <h2 class="mb-8 text-xs font-bold uppercase tracking-[0.2em] text-[#6B7280]">
          Continue Reading
        </h2>
        <div class="flex flex-col">
          <NuxtLink
            v-for="(related, index) in relatedPosts"
            :key="related.id"
            :to="`/posts/${related.id}`"
            class="group cursor-pointer"
          >
            <div class="py-6">
              <time class="text-xs text-[#6B7280]">{{ related.date }}</time>
              <h3 class="mt-2 text-lg font-bold leading-snug text-[#1A1A1A] transition-colors group-hover:text-[#6B7280]">
                {{ related.title }}
              </h3>
              <p class="mt-2 text-xs text-[#6B7280]/60">
                By {{ related.author }} &middot; {{ related.readTime }}
              </p>
            </div>
            <Separator v-if="index < relatedPosts.length - 1" class="bg-[#1A1A1A]/10" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <PublicFooter />
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
import { computed } from 'vue'
import { posts } from '~~/data/posts'
import { Separator } from '@/components/ui/separator'

const route = useRoute()

const post = computed(() => {
  const id = Number(route.params.id)
  return posts.find(p => p.id === id)
})

const relatedPosts = computed(() => {
  if (!post.value) return []
  return posts
    .filter(p => p.id !== post.value!.id)
    .slice(0, 3)
})

useSeoMeta({
  title: () => post.value ? `${post.value.title} - Papyrus` : 'Essay Not Found - Papyrus',
  description: () => post.value?.excerpt ?? '',
})
</script>

<style scoped>
.prose-papyrus p {
  margin-bottom: 1.5em;
  font-size: 1rem;
  line-height: 1.85;
  color: #1A1A1A;
}

@media (min-width: 1024px) {
  .prose-papyrus p {
    font-size: 1.0625rem;
  }
}
</style>
